package com.optimusprime.exception;

public class ProtocolDocumentBlobException extends RuntimeException {

	private static final long serialVersionUID = 8387129745643102635L;

	public ProtocolDocumentBlobException(String fileName, long protocolId) {
		super("Error while creating BLOB from file with name " + fileName + " for protocol with id " + protocolId);
	}

}
