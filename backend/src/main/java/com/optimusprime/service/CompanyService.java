package com.optimusprime.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.optimusprime.dto.CompanyDTO;
import com.optimusprime.dto.IdValueDTO;
import com.optimusprime.model.Company;
import com.optimusprime.repository.CompanyRepository;

@Service
public class CompanyService {

	@Autowired
	private CompanyRepository companyRepository;

	public List<IdValueDTO> getAllCompanies() {
		return this.companyRepository.getAllCompanies().stream()
				.map(company -> new IdValueDTO(company.getId(), company.getLabel())).collect(Collectors.toList());
	}

	public Page<CompanyDTO> getAllCompanies(int pageNumber, int pageSize, String search) {
		Pageable pageable = PageRequest.ofSize(pageSize);
		return this.companyRepository.findAll(pageable).map(CompanyDTO::new);
	}

	public void addCompany(CompanyDTO companyDTO) {
		Company company = new Company(companyDTO);
		companyRepository.save(company);
	}

	public void updateCompany(CompanyDTO companyDTO) {
		Company company = companyRepository.findById(companyDTO.getId()).orElseThrow(() -> new RuntimeException());
		company.updateCompanyWith(companyDTO);
		companyRepository.save(company);
	}

}
