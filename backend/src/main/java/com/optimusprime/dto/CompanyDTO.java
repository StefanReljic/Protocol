package com.optimusprime.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import com.optimusprime.dto.interfaces.IdValueDTO;
import com.optimusprime.model.Company;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CompanyDTO implements Serializable, IdValueDTO {

	private static final long serialVersionUID = 1958609564531981601L;

	private long id;

	@NotBlank(message = "Company name cannot be empty")
	private String name;

	@NotBlank(message = "Company code cannot be empty")
	private String code;

	public CompanyDTO(Company company) {
		super();
		this.id = company.getId();
		this.name = company.getName();
		this.code = company.getCode();
	}

	@Override
	public String getLabel() {
		return code + " - " + name;
	}

}
