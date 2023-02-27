package com.optimusprime.dto.user;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.optimusprime.dto.deserializer.UserActiveDeserializer;
import com.optimusprime.model.UserActiveEnum;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@AllArgsConstructor
public class AddUserDTO implements Serializable {

	private static final long serialVersionUID = -6444847084057535755L;

	@NotBlank(message = "Username cannot be empty")
	private String username;

	@NotBlank(message = "First name cannot be empty")
	private String firstName;

	@NotBlank(message = "Last name cannot be empty")
	private String lastName;

	@NotBlank(message = "Email cannot be empty")
	private String email;

	@NotBlank(message = "Password cannot be empty")
	private String password;

	@NotBlank(message = "Password repeat cannot be empty")
	private String passwordRepeat;

	@NotNull(message = "Is user active cannot be empty")
	@JsonDeserialize(using = UserActiveDeserializer.class)
	private UserActiveEnum isActive;

}
