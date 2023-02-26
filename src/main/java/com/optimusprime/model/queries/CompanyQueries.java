package com.optimusprime.model.queries;

public class CompanyQueries {

	public static final String ENTITY_NAME = "Company";
	private static final String PREFIX = ENTITY_NAME + ".";

	private CompanyQueries() {

	}

	public static final class Fetch {

		public static final String FETCH = PREFIX + "Fetch";

		public static final class AllAsCompanyDTO {

			public static final String NAME = PREFIX + "Fetch.AllAsCompanyDTOs";
			public static final String QUERY = "select new com.optimusprime.dto.CompanyDTO(id, name, code) from Company";
		}

	}

}
