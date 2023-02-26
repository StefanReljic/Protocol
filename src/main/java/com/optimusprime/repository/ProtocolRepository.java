package com.optimusprime.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.optimusprime.dto.ProtocolDTO;
import com.optimusprime.model.Protocol;
import com.optimusprime.model.queries.ProtocolQueries;

@Repository
public interface ProtocolRepository extends JpaRepository<Protocol, Long> {

	@Query(name = ProtocolQueries.Fetch.AllAsProtocolDTO.NAME)
	public List<ProtocolDTO> getAllProtocols();

	@Query(name = ProtocolQueries.Fetch.AllWithoutParentAsProtocolDTO.NAME)
	public List<ProtocolDTO> getAllProtocolsWithoutParent();

	@Query(name = ProtocolQueries.Fetch.AllWithoutParentForProtocolAsProtocolDTO.NAME)
	public List<ProtocolDTO> getAllProtocolsWithoutParentFor(@Param(value = "protocolId") long protocolId);

	@Query(name = ProtocolQueries.Fetch.AllSubprotocolsAsProtocolDTO.NAME)
	public List<ProtocolDTO> getAllSubprotocols(@Param(value = "protocolId") long protocolId);

}
