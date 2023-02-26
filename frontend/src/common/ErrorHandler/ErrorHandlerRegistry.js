class ErrorHandlerRegistry {
  #handlers;
  #parent;

  constructor(parent, input) {
    if (typeof parent !== 'undefined') this.parent = parent;
    if (typeof input !== 'undefined') this.registerMany(input);
    this.#parent = null;
    this.#handlers = new Map();
  }

  // allow to register an handler
  register(key, handler) {
    this.handlers.set(key, handler);
    return this;
  }

  // unregister a handler
  unregister(key) {
    this.handlers.delete(key);
    return this;
  }

  // search a valid handler by key
  find(seek) {
    const handler = this.handlers.get(seek);
    if (handler) return handler;
    return this.parent?.find(seek);
  }

  // pass an object and register all keys/value pairs as handler.
  registerMany(input) {
    for (const [key, value] of Object.entries(input)) {
      this.register(key, value);
    }
    return this;
  }

  // handle error seeking for key
  handleError(this, seek, error) {
    if (Array.isArray(seek)) {
      return seek.some((key) => {
        if (key !== undefined) return this.handleError(String(key), error);
      });
    }
    const handler = this.find(String(seek));
    if (!handler) {
      return false;
    } else if (typeof handler === 'string') {
      return this.handleErrorObject(error, { message: handler });
    } else if (typeof handler === 'function') {
      const result = handler(error);
      if (isErrorHandlerObject(result)) return this.handleErrorObject(error, result);
      return !!result;
    } else if (isErrorHandlerObject(handler)) {
      return this.handleErrorObject(error, handler);
    }
    return false;
  }

  // if the error is an ErrorHandlerObject, handle here
  handleErrorObject(error, options) {
    options?.before?.(error, options);
    showToastError(options.message ?? 'Unknown Error!!', options, 'error');
    return true;
  }

  // this is the function that will be registered in interceptor.
  resposeErrorHandler(this, error, direct) {
    if (error === null) throw new Error('Unrecoverrable error!! Error is null!');
    if (axios.isAxiosError(error)) {
      const response = error?.response;
      const config = error?.config;
      const data = response?.data;
      if (!direct && config?.raw) throw error;
      const seekers = [data?.code, error.code, error?.name, String(data?.status), String(response?.status)];
      const result = this.handleError(seekers, error);
      if (!result) {
        if (data?.code && data?.description) {
          return this.handleErrorObject(error, {
            message: data?.description,
          });
        }
      }
    } else if (error instanceof Error) {
      return this.handleError(error.name, error);
    }
    //if nothings works, throw away
    throw error;
  }
}
// create ours globalHandlers object
const globalHandlers = new ErrorHandlerRegistry();
