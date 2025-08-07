package com.sunbeam.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sunbeam.entities.Gender;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UserRequestDTO extends BaseDTO{

		@NotBlank
	    @Size(max = 255)
	    private String fullName;

	    @NotBlank
	    @Email
	    @Size(max = 255)
	    private String email;

	    @NotBlank
	    @Pattern(regexp = "^\\d{10,15}$")
	    private String phone;

	    @NotBlank
	    private String address;

	    @NotBlank
	    @Pattern(regexp = "^\\d{12}$")
	    private String aadharNumber;

	    @NotBlank
	    @Size(min = 8)
	    private String password;

	    @NotNull(message = "Gender is required")
	    private Gender gender;


	    
	    @JsonProperty("created_on")
	    private LocalDate createdOn;

}
