package com.sunbeam.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sunbeam.exception.ApiException;
import com.sunbeam.exception.AuthenticationException;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.AuthRequestDTO;
import com.sunbeam.dto.UserRequestDTO;
import com.sunbeam.dto.UserResponseDTO;
import com.sunbeam.entities.User;

import jakarta.transaction.Transactional;

import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService{
	private final UserDao userDao;
	private ModelMapper mapper;
	@Override
	public UserResponseDTO SignUp(UserRequestDTO dto) {
		if(userDao.existsByEmail(dto.getEmail()))
			throw new ApiException("Duplicate Email Detected - User exists already !!!");
		User entity = mapper.map(dto, User.class);
		User savedUser = userDao.save(entity);

	    // Map saved entity to response DTO
	    UserResponseDTO responseDto = mapper.map(savedUser, UserResponseDTO.class);

	    // ✅ Manually set createdOn from created_at in BaseEntity
	    responseDto.setCreatedOn(savedUser.getCreatedAt());

	    return responseDto;
	}
	@Override
	public UserResponseDTO authenticate(AuthRequestDTO dto) {
		User entity = userDao.findByEmailAndPassword(dto.getEmail(),dto.getPassword()).orElseThrow(()->new AuthenticationException("Invalid login !!!!"));
			
		return mapper.map(entity, UserResponseDTO.class);
	}

}
