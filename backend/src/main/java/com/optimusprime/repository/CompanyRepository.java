package com.optimusprime.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.optimusprime.dto.CompanyDTO;
import com.optimusprime.model.Company;
import com.optimusprime.model.queries.CompanyQueries;

@Repository
public interface CompanyRepository extends PagingAndSortingRepository<Company, Long> {

	@Query(name = CompanyQueries.Fetch.AllAsCompanyDTO.NAME)
	public List<CompanyDTO> getAllCompanies();

}
