package com.optimusprime.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.optimusprime.dto.ProtocolStatusDTO;
import com.optimusprime.service.ProtocolStatusService;

@RestController
@RequestMapping("/protocol-statuses")
public class ProtocolStatusController {

	@Autowired
	private ProtocolStatusService protocolStatusService;

	@GetMapping
	public List<ProtocolStatusDTO> getAllProtocolStatuses() {
		return protocolStatusService.getAllProtocolStatuses();
	}

	@PostMapping
	public String addProtocolStatus(@RequestBody @Valid ProtocolStatusDTO protocolStatusDTO) {
		this.protocolStatusService.addProtocolStatus(protocolStatusDTO);
		return "Protocol status added successfully";
	}

	@PutMapping
	public String updateProtocolStatus(@RequestBody @Valid ProtocolStatusDTO protocolStatusDTO) {
		this.protocolStatusService.updateProtocolStatus(protocolStatusDTO);
		return "Protocol status updated successfully";
	}

}
