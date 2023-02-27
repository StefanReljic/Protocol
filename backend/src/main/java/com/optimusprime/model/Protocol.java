package com.optimusprime.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.optimusprime.dto.ProtocolDTO;
import com.optimusprime.model.queries.ProtocolQueries;

import lombok.Getter;

@Entity
@Table(name = "PROTOCOL")
@Getter
@NamedQuery(name = ProtocolQueries.Fetch.AllAsProtocolDTO.NAME, query = ProtocolQueries.Fetch.AllAsProtocolDTO.QUERY)
@NamedQuery(name = ProtocolQueries.Fetch.AllWithoutParentAsProtocolDTO.NAME, query = ProtocolQueries.Fetch.AllWithoutParentAsProtocolDTO.QUERY)
@NamedQuery(name = ProtocolQueries.Fetch.AllWithoutParentForProtocolAsProtocolDTO.NAME, query = ProtocolQueries.Fetch.AllWithoutParentForProtocolAsProtocolDTO.QUERY)
@NamedQuery(name = ProtocolQueries.Fetch.AllSubprotocolsAsProtocolDTO.NAME, query = ProtocolQueries.Fetch.AllSubprotocolsAsProtocolDTO.QUERY)
public class Protocol {

	@Id
	@Column(nullable = false, updatable = false, unique = true)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "protocol_number", nullable = false)
	private String protocolNumber;

	@Column(name = "number_of_subprotocols")
	private int numberOfSubprotocols;

	@Column(nullable = false)
	private String subject;

	@Column(name = "submission_date", nullable = false)
	private LocalDate submissionDate;

	@Column(name = "row_creation_date", nullable = false)
	private LocalDateTime protocolCreationDate;

	private int year;

	@Column(name = "is_archived")
	private byte isArchived;

	@ManyToOne
	@JoinColumn(name = "sender_id")
	private Company sender;

	@OneToOne
	@JoinColumn(name = "parent_protocol_id", nullable = true)
	private Protocol parentProtocol;

	@OneToMany
	@JoinColumn(name = "parent_protocol_id")
	private List<Protocol> subprotocols;

	@OneToOne
	@JoinColumn(name = "protocol_creation_user_id", nullable = true)
	private User createdBy;

	public Protocol() {
		super();
	}

	public Protocol(long id) {
		super();
		this.id = id;
	}

	public Protocol(ProtocolDTO protocolDTO, Company sender) {
		super();
		updateProtocolWith(protocolDTO);
		this.sender = sender;
	}

	public void updateProtocolWith(ProtocolDTO protocolDTO) {
		this.protocolNumber = protocolDTO.getProtocolNumber();
		this.numberOfSubprotocols = protocolDTO.getNumberOfSubprotocols();
		this.subject = protocolDTO.getSubject();
		this.submissionDate = protocolDTO.getSubmissionDate();
		this.protocolCreationDate = LocalDateTime.now();
		this.year = protocolDTO.getYear();
	}

	public void addSubprotocols(List<Protocol> subprotocols) {
		if (this.subprotocols == null) {
			this.subprotocols = new ArrayList<>();
		}
		this.subprotocols.addAll(subprotocols);
		this.numberOfSubprotocols = this.subprotocols.size();
	}

	public void archive() {
		this.isArchived = 1;
		if (this.numberOfSubprotocols != 0) {
			this.subprotocols.forEach(protocol -> protocol.archive());
		}
	}

}
