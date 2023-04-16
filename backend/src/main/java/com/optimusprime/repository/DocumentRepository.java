package com.optimusprime.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.optimusprime.dto.DocumentDTO;
import com.optimusprime.model.Document;
import com.optimusprime.model.queries.DocumentQueries;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

	@Query(name = DocumentQueries.Fetch.AllDocumentDTOsForProtocol.NAME)
	public List<DocumentDTO> getAllDocumentsForProtocol(
			@Param(value = DocumentQueries.Fetch.AllDocumentDTOsForProtocol.Parameters.PROTOCOL_ID) long protocolId);

	@Query(name = DocumentQueries.Fetch.DocumentBlobById.NAME)
	public byte[] getDocumentBlobById(
			@Param(value = DocumentQueries.Fetch.DocumentBlobById.Parameters.DOCUMENT_ID) long documentId);

}