package com.optimusprime.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.optimusprime.dto.AddDocumentDTO;
import com.optimusprime.model.queries.DocumentQueries;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "DOCUMENT")
@Getter
@NoArgsConstructor
@NamedQuery(name = DocumentQueries.Fetch.AllDocumentDTOsForProtocol.NAME, query = DocumentQueries.Fetch.AllDocumentDTOsForProtocol.QUERY)
@NamedQuery(name = DocumentQueries.Fetch.DocumentBlobById.NAME, query = DocumentQueries.Fetch.DocumentBlobById.QUERY)
public class Document {

	@Id
	@Column(nullable = false, updatable = false, unique = true)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "document_name", nullable = false)
	private String name;

	@Lob
	private byte[] document;

	private long protocolId;

	public Document(String name, byte[] document, long protocolId) {
		this.name = name;
		this.document = document;
		this.protocolId = protocolId;
	}

	public Document(AddDocumentDTO documentDTO, byte[] document) {
		this.name = documentDTO.getDocumentName();
		this.document = document;
		this.protocolId = documentDTO.getProtocolId();
	}

}
