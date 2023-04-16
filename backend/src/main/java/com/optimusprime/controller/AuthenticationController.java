package com.optimusprime.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.optimusprime.configuration.security.JwtTokenUtil;
import com.optimusprime.dto.LoginRequestDTO;

@RestController
@RequestMapping("/api/authentication")
public class AuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserDetailsService userDetailsService;

	@PostMapping("/create-token")
	public String authenticate(@Valid @RequestBody LoginRequestDTO loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
		return jwtTokenUtil.generateToken(userDetails);
	}

	@PostMapping("/validate-token")
	public ResponseEntity<?> validateToken() {
		return ResponseEntity.ok().build();
	}

	@PostMapping("/invalidate-token")
	public ResponseEntity<?> invalidateToken(@RequestBody String token) {
		jwtTokenUtil.invalidateToken(token);
		return ResponseEntity.ok().build();
	}

}