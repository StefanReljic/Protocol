package com.optimusprime.model.queries;

public class ProtocolQueries {

	public static final String ENTITY_NAME = "Protocol";
	private static final String PREFIX = ENTITY_NAME + ".";

	private ProtocolQueries() {

	}

	public static final class Fetch {

		public static final String FETCH = PREFIX + "Fetch";

		public static final class AllAsProtocolDTO {

			public static final String NAME = PREFIX + "Fetch.AllAsProtocolDTOs";
			public static final String QUERY = "select new com.optimusprime.dto.ProtocolDTO(id, protocolNumber, numberOfSubprotocols,"
					+ "sender.id, sender.name, subject, submissionDate, protocolCreationDate, year) from Protocol "
					+ "where parentProtocol is null";
		}

		public static final class AllWithoutParentAsProtocolDTO {

			public static final String NAME = PREFIX + "Fetch.AllWithoutParentAsProtocolDTO";
			public static final String QUERY = "select new com.optimusprime.dto.ProtocolDTO(id, protocolNumber, numberOfSubprotocols,"
					+ "sender.id, sender.name, subject, submissionDate, protocolCreationDate, year) from Protocol "
					+ "where parentProtocol is null";
		}

		public static final class AllWithoutParentForProtocolAsProtocolDTO {

			public static final String NAME = PREFIX + "Fetch.AllWithoutParentForProtocolAsProtocolDTO";
			public static final String QUERY = "select new com.optimusprime.dto.ProtocolDTO(id, protocolNumber, numberOfSubprotocols,"
					+ "sender.id, sender.name, subject, submissionDate, protocolCreationDate, year) from Protocol "
					+ "where parentProtocol is null and id != :protocolId";
		}

		public static final class AllSubprotocolsAsProtocolDTO {

			public static final String NAME = PREFIX + "Fetch.AllSubprotocolsAsProtocolDTO";
			public static final String QUERY = "select new com.optimusprime.dto.ProtocolDTO(id, protocolNumber, numberOfSubprotocols,"
					+ "sender.id, sender.name, subject, submissionDate, protocolCreationDate, year) from Protocol "
					+ "where parentProtocol is not null and parentProtocol.id = :protocolId";
		}

	}

}
