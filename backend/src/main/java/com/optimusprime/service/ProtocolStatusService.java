package com.optimusprime.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.optimusprime.dto.ProtocolStatusDTO;
import com.optimusprime.model.ProtocolStatus;
import com.optimusprime.repository.ProtocolStatusRepository;

@Service
public class ProtocolStatusService {

	@Autowired
	private ProtocolStatusRepository protocolStatusRepository;

	public List<ProtocolStatusDTO> getAllProtocolStatuses() {
		return this.protocolStatusRepository.getAllProtocolStatuses();
	}

	public void addProtocolStatus(ProtocolStatusDTO protocolStatusDTO) {
		ProtocolStatus protocolStatus = new ProtocolStatus(protocolStatusDTO);
		protocolStatusRepository.save(protocolStatus);
	}

	public void updateProtocolStatus(ProtocolStatusDTO protocolStatusDTO) {
		ProtocolStatus protocolStatus = protocolStatusRepository.findById(protocolStatusDTO.getId())
				.orElseThrow(() -> new RuntimeException());
		protocolStatus.updateCompanyWith(protocolStatusDTO);
		protocolStatusRepository.save(protocolStatus);
	}

}
