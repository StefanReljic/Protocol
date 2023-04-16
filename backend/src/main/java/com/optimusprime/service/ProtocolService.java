package com.optimusprime.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.optimusprime.dto.ProtocolDTO;
import com.optimusprime.model.Company;
import com.optimusprime.model.Protocol;
import com.optimusprime.repository.CompanyRepository;
import com.optimusprime.repository.ProtocolRepository;

@Service
public class ProtocolService {

	@Autowired
	private ProtocolRepository protocolRepository;
	@Autowired
	private CompanyRepository companyRepository;

	public List<ProtocolDTO> getAllProtocols() {
		return this.protocolRepository.getAllProtocols();
	}

	public List<ProtocolDTO> getAllProtocolsWithoutParent(Long protocolId) {
		if (protocolId != null) {
			return this.protocolRepository.getAllProtocolsWithoutParentFor(protocolId);
		}
		return this.protocolRepository.getAllProtocolsWithoutParent();
	}

	public void addProtocol(ProtocolDTO protocolDTO) {
		Company company = companyRepository.findById(protocolDTO.getSenderId()).orElseThrow(
				() -> new RuntimeException("Company with id " + protocolDTO.getSender() + " doesn't exist"));
		Protocol protocol = new Protocol(protocolDTO, company);
		protocolRepository.save(protocol);
	}

	public void updateProtocol(ProtocolDTO protocolDTO) {
		Protocol protocol = protocolRepository.findById(protocolDTO.getId()).orElseThrow(() -> new RuntimeException());
		protocol.updateProtocolWith(protocolDTO);
		protocolRepository.save(protocol);
	}

	public List<ProtocolDTO> getAllSubprotocols(Long protocolId) {
		return this.protocolRepository.getAllSubprotocols(protocolId);
	}

	public void addAllSubprotocols(long protocolId, List<Long> subprotocolIds) {
		Protocol protocol = this.protocolRepository.findById(protocolId).orElseThrow();
		List<Protocol> subprotocols = subprotocolIds.stream().map(Protocol::new).collect(Collectors.toList());
		protocol.addSubprotocols(subprotocols);
		this.protocolRepository.save(protocol);
	}

	public void archiveProtocol(long protocolId) {
		Protocol protocol = protocolRepository.findById(protocolId).orElseThrow(() -> new RuntimeException());
		protocol.archive();
		protocolRepository.save(protocol);
	}

}
