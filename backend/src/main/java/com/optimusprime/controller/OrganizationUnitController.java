package com.optimusprime.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.optimusprime.dto.OrganizationUnitDTO;
import com.optimusprime.service.OrganizationUnitService;

@RestController
@RequestMapping("/organization-units")
public class OrganizationUnitController {

	@Autowired
	private OrganizationUnitService organizationUnitService;

	@GetMapping
	public Page<OrganizationUnitDTO> getAllOrganizationUnits(@RequestParam int pageNumber, @RequestParam int pageSize,
			@RequestParam String globalFilter) {
		return organizationUnitService.getAllOrganizationUnits(pageNumber, pageSize, globalFilter);
	}

	@PostMapping
	public String addOrganizationUnit(@RequestBody @Valid OrganizationUnitDTO organizationUnitDTO) {
		this.organizationUnitService.addOrganizationUnit(organizationUnitDTO);
		return "Organization unit added successfully";
	}

	@PutMapping
	public String updateOrganizationUnit(@RequestBody @Valid OrganizationUnitDTO organizationUnitDTO) {
		this.organizationUnitService.updateOrganizationUnit(organizationUnitDTO);
		return "Organization unit updated successfully";
	}

}
