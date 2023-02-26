package com.optimusprime.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ProtocolStatusDTO implements Serializable {

	private static final long serialVersionUID = 1958609564531981601L;

	private Long id;
	
	@NotBlank(message = "Status code cannot be empty")
	private String code;
	
	@NotBlank(message = "Status name cannot be empty")
	private String name;
	
}
