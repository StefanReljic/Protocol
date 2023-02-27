package com.optimusprime.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.optimusprime.dto.ProtocolDTO;
import com.optimusprime.service.ProtocolService;

@RestController
@RequestMapping("/protocols")
public class ProtocolController {

	@Autowired
	private ProtocolService protocolService;

	@GetMapping
	public List<ProtocolDTO> getAllProtocols() {
		return protocolService.getAllProtocols();
	}

	@GetMapping(value = { "/available-subprotocols/", "/available-subprotocols/{protocolId}" })
	public List<ProtocolDTO> getAllProtocolsWithoutParent(@PathVariable(required = false) Long protocolId) {
		return protocolService.getAllProtocolsWithoutParent(protocolId);
	}

	@GetMapping(value = { "/{protocolId}/subprotocols" })
	public List<ProtocolDTO> getAllSubprotocols(@PathVariable Long protocolId) {
		return protocolService.getAllSubprotocols(protocolId);
	}

	@PostMapping(value = { "/{protocolId}/subprotocols" })
	public String addAllSubprotocols(@PathVariable long protocolId, @RequestBody List<Long> subprotocolIds) {
		this.protocolService.addAllSubprotocols(protocolId, subprotocolIds);
		return "Subprotocols added successfully";
	}

	@PostMapping
	public String addProtocol(@RequestBody @Valid ProtocolDTO protocolDTO) {
		this.protocolService.addProtocol(protocolDTO);
		return "Protocol added successfully";
	}

	@PutMapping
	public String updateProtocol(@RequestBody @Valid ProtocolDTO protocolDTO) {
		this.protocolService.updateProtocol(protocolDTO);
		return "Protocol updated successfully";
	}

	@PostMapping("/{protocolId}/archive")
	public String archiveCompany(@PathVariable(value = "protocolId") final Long protocolId) {
		System.out.println(protocolId);
		this.protocolService.archiveProtocol(protocolId);
		return "Protocol archived successfully";
	}

}
