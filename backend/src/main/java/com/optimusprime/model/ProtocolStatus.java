package com.optimusprime.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.optimusprime.dto.ProtocolStatusDTO;
import com.optimusprime.model.queries.ProtocolStatusQueries;

import lombok.Getter;

@Entity
@Table(name = "PROTOCOL_STATUS")
@NamedQuery(name = ProtocolStatusQueries.Fetch.AllAsProtocolStatusDTO.NAME, query = ProtocolStatusQueries.Fetch.AllAsProtocolStatusDTO.QUERY)
@Getter
public class ProtocolStatus {

	@Id
	@Column(updatable = false, unique = true)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String code;

	@Column(nullable = false)
	private String name;

	public ProtocolStatus(ProtocolStatusDTO protocolStatusDTO) {
		this.name = protocolStatusDTO.getName();
		this.code = protocolStatusDTO.getCode();
	}

	public void updateCompanyWith(ProtocolStatusDTO protocolStatusDTO) {
		this.name = protocolStatusDTO.getName();
	}

}
