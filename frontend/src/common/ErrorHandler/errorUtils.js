export function extractValidationErrors(error) {
  const errorObject = {};
  error.response.data.apierror.subErrors.forEach(({ field, message }) => (errorObject[field] = message));
  return errorObject;
}
