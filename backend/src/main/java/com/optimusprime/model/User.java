package com.optimusprime.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.optimusprime.model.queries.UserQueries;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Entity
@Table(name = "USER")
@NamedQuery(name = UserQueries.Fetch.AllAsUserDTO.NAME, query = UserQueries.Fetch.AllAsUserDTO.QUERY)
@Getter
@Builder
@AllArgsConstructor
public class User {

	@Id
	@Column(nullable = false, updatable = false, unique = true)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(nullable = false, updatable = false, unique = true)
	private String username;
	@Column
	private String password;
	@Column(name = "first_name", nullable = false)
	private String firstName;
	@Column(name = "last_name", nullable = false)
	private String lastName;
	@Column(nullable = false)
	private String email;
	@Column(name = "is_active")
	@Enumerated(EnumType.STRING)
	private UserActiveEnum isActive;

	public User() {
		super();
	}

	public void deactivateUser() {
		this.isActive = UserActiveEnum.NO;
	}

}
