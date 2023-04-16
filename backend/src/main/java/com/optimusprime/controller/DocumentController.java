package com.optimusprime.controller;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.optimusprime.dto.AddDocumentDTO;
import com.optimusprime.dto.DocumentDTO;
import com.optimusprime.service.DocumentService;

@RestController
@RequestMapping("/{protocolId}/documents")
public class DocumentController {

	@Autowired
	private DocumentService documentService;

	@GetMapping
	public List<DocumentDTO> getDocuments(@PathVariable @NotNull Long protocolId) {
		return this.documentService.getDocuments(protocolId);
	}

	@GetMapping(path = "/{documentId}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	public byte[] getDocument(@PathVariable @NotBlank Long documentId) {
		return this.documentService.getDocument(documentId);
	}

	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public String addDocument(@ModelAttribute AddDocumentDTO documentDTO) {
		this.documentService.addDocument(documentDTO);
		return "Document added successfully";
	}

}
