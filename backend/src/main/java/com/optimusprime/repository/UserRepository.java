package com.optimusprime.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.optimusprime.dto.user.UserDTO;
import com.optimusprime.model.User;
import com.optimusprime.model.queries.UserQueries;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

	@Query(name = UserQueries.Fetch.AllAsUserDTO.NAME)
	public List<UserDTO> getAllUsers();

	public User findByUsername(String username);

}
