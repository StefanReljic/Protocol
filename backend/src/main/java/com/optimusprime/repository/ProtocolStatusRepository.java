package com.optimusprime.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.optimusprime.dto.ProtocolStatusDTO;
import com.optimusprime.model.ProtocolStatus;
import com.optimusprime.model.queries.ProtocolStatusQueries;

@Repository
public interface ProtocolStatusRepository extends JpaRepository<ProtocolStatus, Long> {

	@Query(name = ProtocolStatusQueries.Fetch.AllAsProtocolStatusDTO.NAME)
	public List<ProtocolStatusDTO> getAllProtocolStatuses();

}
