package com.optimusprime.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.optimusprime.dto.user.AddUserDTO;
import com.optimusprime.dto.user.UserDTO;
import com.optimusprime.model.User;
import com.optimusprime.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public Page<UserDTO> getAllUsers(int pageNumber, int pageSize, String globalFilter) {
		Pageable pageable = PageRequest.of(pageNumber, pageSize);
		return this.userRepository.findAll(pageable).map(UserDTO::new);
	}

	public void addUser(AddUserDTO userDTO) {
		User user = new User(userDTO);
		userRepository.save(user);
	}

	public void updateUser(UserDTO userDTO) {
		User user = userRepository.findByUsername(userDTO.getUsername());
		userRepository.save(user);
	}

	public void deactivateUser(String username) {
		User user = userRepository.findByUsername(username);
		user.deactivateUser();
		userRepository.save(user);
	}

}
