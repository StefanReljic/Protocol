package com.optimusprime.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.optimusprime.dto.CompanyDTO;
import com.optimusprime.model.queries.CompanyQueries;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "COMPANY")
@NamedQuery(name = CompanyQueries.Fetch.AllAsCompanyDTO.NAME, query = CompanyQueries.Fetch.AllAsCompanyDTO.QUERY)
@Getter
@NoArgsConstructor
public class Company {

	@Id
	@Column(nullable = false, updatable = false, unique = true)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false, unique = true)
	private String code;

	public Company(CompanyDTO companyDTO) {
		this.name = companyDTO.getName();
		this.code = companyDTO.getCode();
	}

	public void updateCompanyWith(CompanyDTO companyDTO) {
		this.name = companyDTO.getName();
		this.code = companyDTO.getCode();
	}

}
