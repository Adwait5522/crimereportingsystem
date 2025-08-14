package com.sunbeam.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDTO {
		private Long userId;
	 	private String fullName;
	    private String email;
	    private String phone;
	    private String address;
	    private String aadharNumber; 
	    private String gender;
	    @JsonProperty("created_on")
	    private LocalDateTime createdOn;
}
