package com.optimusprime.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.optimusprime.dto.AddDocumentDTO;
import com.optimusprime.dto.DocumentDTO;
import com.optimusprime.model.Document;
import com.optimusprime.repository.DocumentRepository;

@Service
public class DocumentService {

	@Autowired
	private DocumentRepository documentRepository;

	public List<DocumentDTO> getDocuments(long protocolId) {
		return documentRepository.getAllDocumentsForProtocol(protocolId);
	}

	public void addDocument(AddDocumentDTO documentDTO) {
		System.err.println(documentDTO.getDocument());
		try {
			Document document = new Document(documentDTO, documentDTO.getDocument().getBytes());
			documentRepository.save(document);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public byte[] getDocument(Long documentId) {
		return documentRepository.getDocumentBlobById(documentId);
	}

}
