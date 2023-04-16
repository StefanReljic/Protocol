package com.optimusprime.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.optimusprime.dto.user.AddUserDTO;
import com.optimusprime.dto.user.UserDTO;
import com.optimusprime.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping
	public Page<UserDTO> getAllUsers(@RequestParam int pageNumber, @RequestParam int pageSize,
			@RequestParam String globalFilter) {
		return userService.getAllUsers(pageNumber, pageSize, globalFilter);
	}

	@PostMapping
	public String addUser(@RequestBody @Valid AddUserDTO addUserDTO) {
		this.userService.addUser(addUserDTO);
		return "User added successfully";
	}

	@PutMapping
	public String updateUser(@RequestBody @Valid UserDTO userDTO) {
		this.userService.updateUser(userDTO);
		return "User updated successfully";
	}

	@PutMapping("/{username}/deactivate")
	public String deactivateUser(@PathVariable String username) {
		this.userService.deactivateUser(username);
		return "User deactivated successfully";
	}

}
