package com.optimusprime.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.optimusprime.dto.OrganizationUnitDTO;

import lombok.Getter;

@Entity
@Table(name = "ORGANIZATION_UNIT")
@Getter
public class OrganizationUnit {

	@Id
	@Column(nullable = false, updatable = false, unique = true)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(nullable = false, unique = true)
	private String code;
	@Column(nullable = false)
	private String name;

	public OrganizationUnit() {
		super();
	}

	public OrganizationUnit(OrganizationUnitDTO organizationUnitDTO) {
		this.code = organizationUnitDTO.getCode();
		this.name = organizationUnitDTO.getName();
	}

	public void updateOrganizationUnitWith(OrganizationUnitDTO organizationUnitDTO) {
		this.code = organizationUnitDTO.getCode();
		this.name = organizationUnitDTO.getName();
	}
}
