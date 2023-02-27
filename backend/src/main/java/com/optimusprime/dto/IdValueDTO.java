package com.optimusprime.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class IdValueDTO implements Serializable {

	private static final long serialVersionUID = 452360080386094386L;

	private long id;
	private String label;

}
