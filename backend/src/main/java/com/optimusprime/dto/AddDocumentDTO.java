package com.optimusprime.dto;

import java.io.Serializable;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AddDocumentDTO implements Serializable {

	private static final long serialVersionUID = 5506998325925717819L;

	private long protocolId;

	private MultipartFile document;

	private String documentName;

}
