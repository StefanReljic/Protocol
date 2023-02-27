//package com.optimusprime.configuration;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//public class WebSecurityConfiguration {
//
//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
//		httpSecurity
//				.authorizeHttpRequests(
//						requests -> requests.antMatchers("/", "/home").permitAll().anyRequest().authenticated())
//				.formLogin(form -> form.loginPage("/login").permitAll()).logout(logout -> logout.permitAll());
//
//		return httpSecurity.build();
//	}
//
//}
