package com.sunbeam.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="User_login")
@Getter
@Setter
@NoArgsConstructor
public class User{
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long userId;
	
	@NotBlank(message = "Full name is required")
	@Size(max=255,message="Full Name must be atmost 255 charachters")
	@Column(name="fullName",length=255,nullable=false)
	private String fullName;
	
	@NotBlank(message="Email is required")
	@Email(message="Email must be Valid")
	@Size(max=255,message="Email must be atmost 255 charachters")
	@Column(name="email",length=255,unique=true, nullable=false)
	private String email;
	
	@NotBlank(message="Phone is required")
	@Pattern(regexp="^\\d{10,15}$", message="Phone must be digits only , between 0 and 9")
	@Column(name="phone",length=15,unique=true,nullable=false)
	private String phone;
	
	@NotBlank(message="Address is required")
	@Column(name="address",nullable=false,columnDefinition = "TEXT")
	private String address;
	
	@Pattern(regexp = "^\\d{12}$", message="Aadhar Number must be exactly 12 digits")
	@Column(name="aadhar_number",length=12)
	private String aadharNumber;
	
	@NotBlank(message = "Password is required")
	@Size(min=6,message="Password should be atleast 6 charachters")
	@Column(name="password",length = 255,nullable=false)
	private String password;
	
	
	@NotNull(message="Gender is required")
	@Enumerated(EnumType.STRING)
	@Column(name="gender",length=10,nullable=false)
	private Gender gender;


	public User(
			@NotBlank(message = "Full name is required") @Size(max = 255, message = "Full Name must be atmost 255 charachters") String fullName,
			@NotBlank(message = "Email is required") @Email(message = "Email must be Valid") @Size(max = 255, message = "Email must be atmost 255 charachters") String email,
			@NotBlank(message = "Phone is required") @Pattern(regexp = "^\\d{10,15}$", message = "Phone must be digits only , between 0 and 9") String phone,
			@NotBlank(message = "Address is required") String address,
			@Pattern(regexp = "^\\d{12}$", message = "Aadhar Number must be exactly 12 digits") String aadhar_number,
			@NotBlank(message = "Password is required") @Size(min = 6, message = "Password should be atleast 6 charachters") String password,
			@NotBlank(message = "Gender is required") Gender gender) {
		super();
		this.fullName = fullName;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.aadharNumber = aadhar_number;
		this.password = password;
		this.gender = gender;
	}
	
	 @Column(name = "created_on", updatable = false)
	    private LocalDateTime createdOn;
	
	
}