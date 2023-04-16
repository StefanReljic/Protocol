package com.optimusprime.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DocumentDTO implements Serializable {

	private static final long serialVersionUID = -5923987817865473362L;

	private long id;
	private String name;
	private long protocolId;

}
