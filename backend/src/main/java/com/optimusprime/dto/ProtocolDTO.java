package com.optimusprime.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ProtocolDTO implements Serializable {

	private static final long serialVersionUID = 1958609564531981601L;

	private Long id;

	@NotBlank(message = "Protocol number cannot be empty")
	private String protocolNumber;

	private int numberOfSubprotocols;

	@NotNull(message = "Sender id cannot be empty")
	private Long senderId;

	private String sender;

	@NotBlank(message = "Subject cannot be empty")
	private String subject;

	@NotNull(message = "Submission date cannot be empty")
	private LocalDate submissionDate;

	private LocalDateTime rowCreationDate;

	@NotNull(message = "Year cannot be empty")
	private Integer year;

}
