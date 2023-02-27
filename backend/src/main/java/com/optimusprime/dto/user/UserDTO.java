package com.optimusprime.dto.user;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import com.optimusprime.model.User;
import com.optimusprime.model.UserActiveEnum;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserDTO implements Serializable {

	private static final long serialVersionUID = -1114728516822293449L;

	@NotBlank(message = "Username cannot be empty")
	private String username;

	@NotBlank(message = "First name cannot be empty")
	private String firstName;

	@NotBlank(message = "Last name cannot be empty")
	private String lastName;

	@NotBlank(message = "Email cannot be empty")
	private String email;

	private UserActiveEnum isActive;

	public UserDTO(User user) {
		super();
		this.username = user.getUsername();
		this.firstName = user.getFirstName();
		this.lastName = user.getLastName();
		this.email = user.getEmail();
		this.isActive = user.getIsActive();
	}

}
