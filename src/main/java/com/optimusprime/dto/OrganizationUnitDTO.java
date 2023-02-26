package com.optimusprime.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import com.optimusprime.model.OrganizationUnit;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class OrganizationUnitDTO implements Serializable {

	private static final long serialVersionUID = -1114728516822293449L;

	private Long id;

	@NotBlank(message = "Organization unit code cannot be empty")
	private String code;

	@NotBlank(message = "Organization unit name cannot be empty")
	private String name;

	public OrganizationUnitDTO(OrganizationUnit organizationUnit) {
		super();
		this.id = organizationUnit.getId();
		this.code = organizationUnit.getCode();
		this.name = organizationUnit.getName();
	}
}
