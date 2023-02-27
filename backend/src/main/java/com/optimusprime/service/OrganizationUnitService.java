package com.optimusprime.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.optimusprime.dto.OrganizationUnitDTO;
import com.optimusprime.model.OrganizationUnit;
import com.optimusprime.repository.OrganizationUnitRepository;

@Service
public class OrganizationUnitService {

	@Autowired
	private OrganizationUnitRepository organizationUnitRepository;

	public Page<OrganizationUnitDTO> getAllOrganizationUnits(int pageNumber, int pageSize, String globalFilter) {
		Pageable pageable = PageRequest.of(pageNumber, pageSize);
		return this.organizationUnitRepository.findAll(pageable).map(OrganizationUnitDTO::new);
	}

	public void addOrganizationUnit(OrganizationUnitDTO organizationUnitDTO) {
		OrganizationUnit organizationUnit = new OrganizationUnit(organizationUnitDTO);
		organizationUnitRepository.save(organizationUnit);
	}

	public void updateOrganizationUnit(OrganizationUnitDTO organizationUnitDTO) {
		OrganizationUnit organizationUnit = organizationUnitRepository.findById(organizationUnitDTO.getId())
				.orElseThrow(() -> new RuntimeException());
		organizationUnit.updateOrganizationUnitWith(organizationUnitDTO);
		organizationUnitRepository.save(organizationUnit);
	}

}
