package com.optimusprime.controller;

import java.util.List;

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

import com.optimusprime.dto.CompanyDTO;
import com.optimusprime.dto.IdValueDTO;
import com.optimusprime.service.CompanyService;

@RestController
@RequestMapping("/companies")
public class CompanyController {

	@Autowired
	private CompanyService companyService;

	@GetMapping
	public Page<CompanyDTO> getAllCompanies(@RequestParam int pageNumber, @RequestParam int pageSize,
			@RequestParam String globalFilter) {
		return companyService.getAllCompanies(pageNumber, pageSize, globalFilter);
	}

	@GetMapping("/lov")
	public List<IdValueDTO> getAllCompanies() {
		return companyService.getAllCompanies();
	}

	@PostMapping
	public String addCompany(@RequestBody @Valid final CompanyDTO companyDTO) {
		this.companyService.addCompany(companyDTO);
		return "Company added successfully";
	}

	@PutMapping
	public String updateCompany(@RequestBody @Valid final CompanyDTO companyDTO) {
		this.companyService.updateCompany(companyDTO);
		return "Company updated successfully";
	}

}
