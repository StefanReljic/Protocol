package com.optimusprime.model.queries;

public class ProtocolStatusQueries {

	public static final String ENTITY_NAME = "ProtocolStatus";
	private static final String PREFIX = ENTITY_NAME + ".";

	private ProtocolStatusQueries() {

	}

	public static final class Fetch {

		public static final String FETCH = PREFIX + "Fetch";

		public static final class AllAsProtocolStatusDTO {

			public static final String NAME = PREFIX + "Fetch.AllAsProtocolStatusDTOs";
			public static final String QUERY = "select new com.optimusprime.dto.ProtocolStatusDTO(id, code, name) from ProtocolStatus";
		}

	}

}
