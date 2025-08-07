package com.sunbeam.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.AuthRequestDTO;
import com.sunbeam.dto.UserRequestDTO;
import com.sunbeam.service.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;


@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {

	private final UserService userService;

    
	@PostMapping("/signup")
	public ResponseEntity<?> userSignUp(@RequestBody @Valid UserRequestDTO dto)
	{
		System.out.println("In user SignUp "+dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.SignUp(dto));
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> userSignIn(@RequestBody AuthRequestDTO dto)
	{
		return ResponseEntity.ok(userService.authenticate(dto));
	}
	
}
