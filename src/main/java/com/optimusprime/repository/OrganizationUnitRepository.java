package com.optimusprime.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.optimusprime.model.OrganizationUnit;

@Repository
public interface OrganizationUnitRepository extends JpaRepository<OrganizationUnit, Long> {

}
