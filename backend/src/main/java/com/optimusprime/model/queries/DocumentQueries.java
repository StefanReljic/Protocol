package com.optimusprime.model.queries;

public class DocumentQueries {

	public static final String ENTITY_NAME = "Document";
	private static final String PREFIX = ENTITY_NAME + ".";

	private DocumentQueries() {

	}

	public static final class Fetch {

		public static final String FETCH = PREFIX + "Fetch";

		public static final class AllDocumentDTOsForProtocol {

			public static final String NAME = PREFIX + "Fetch.AllDocumentDTOsForProtocol";
			public static final String QUERY = "select new com.optimusprime.dto.DocumentDTO(id, name, protocolId) from "
					+ ENTITY_NAME + " where protocolId = :" + Parameters.PROTOCOL_ID;

			public static final class Parameters {

				private Parameters() {
					super();
				}

				public static final String PROTOCOL_ID = "protocolId";
			}
		}

		public static final class DocumentBlobById {

			public static final String NAME = PREFIX + "Fetch.DocumentBlobById";
			public static final String QUERY = "select d.document from " + ENTITY_NAME + " d where d.document.id = :"
					+ Parameters.DOCUMENT_ID;

			public static final class Parameters {

				private Parameters() {
					super();
				}

				public static final String DOCUMENT_ID = "documentId";
			}
		}
	}

}
