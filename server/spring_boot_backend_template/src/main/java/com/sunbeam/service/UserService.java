package com.sunbeam.service;

import com.sunbeam.dto.AuthRequestDTO;
import com.sunbeam.dto.UserRequestDTO;
import com.sunbeam.dto.UserResponseDTO;

import jakarta.validation.Valid;

public interface UserService {

	UserResponseDTO SignUp(@Valid UserRequestDTO dto);

	UserResponseDTO authenticate(AuthRequestDTO dto);

}
