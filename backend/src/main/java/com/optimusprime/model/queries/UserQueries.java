package com.optimusprime.model.queries;

public class UserQueries {

	public static final String ENTITY_NAME = "User";
	private static final String PREFIX = ENTITY_NAME + ".";

	private UserQueries() {

	}

	public static final class Fetch {

		public static final String FETCH = PREFIX + "Fetch";

		public static final class AllAsUserDTO {

			public static final String NAME = PREFIX + "Fetch.AllAsUserDTOs";
			public static final String QUERY = "select new com.optimusprime.dto.user.UserDTO(username, firstName, lastName, email, isActive) from User";
		}

	}

}
