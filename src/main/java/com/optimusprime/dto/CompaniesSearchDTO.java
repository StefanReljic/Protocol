package com.optimusprime.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class CompaniesSearchDTO implements Serializable {

	private static final long serialVersionUID = -4895286017304794556L;

	private String search;
	private int totalPages;
	private int pageNumber;

}
