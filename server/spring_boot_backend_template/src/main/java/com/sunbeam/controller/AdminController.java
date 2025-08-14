package com.sunbeam.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.AdminLoginReqDTO;
import com.sunbeam.dto.ApiResponseDTO;
import com.sunbeam.dto.OfficerUpdateDTO;
import com.sunbeam.dto.PoliceStationUpdateDTO;
import com.sunbeam.entities.Officer;
import com.sunbeam.service.AdminService;
import com.sunbeam.service.OfficerService;
import com.sunbeam.service.PoliceStationService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
@Validated
public class AdminController {
	private final AdminService adminService;
	private final PoliceStationService policeStationService;
	private final OfficerService officerService;
	@PostMapping("/signin")
	public ResponseEntity<?> adminSignIn(@RequestBody AdminLoginReqDTO logindto ){
		System.out.println("In sign in DTO"+logindto);
		
		try {
			return ResponseEntity.ok(adminService.authenticate(logindto));
		} catch (RuntimeException e) {
			// TODO: handle exception
			System.out.println("In catch block");
				
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponseDTO("Invalid input"));
		}
	}
	@PutMapping("/update-policestation/{id}")
	public ResponseEntity<?> updatePoliceStation(@PathVariable Long id,
            @RequestBody PoliceStationUpdateDTO dto){
		try {
			String msg = policeStationService.updatePoliceStation(id, dto);
	        return ResponseEntity.ok(msg);
		} catch (Exception e) {
			System.out.println("In catch block");
			
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponseDTO(e.getMessage()));
		}
				
	}
	@PutMapping("/delete-policestation/{id}")
	public ResponseEntity<?> deletePoliceStation(@PathVariable Long id){
		try {
			String msg=policeStationService.deletePoliceStation(id);
		    return ResponseEntity.ok(msg);
		} catch (Exception e) {
			System.out.println("In catch block");
			
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponseDTO(e.getMessage()));
		}
	
	}
	@PutMapping("/update-officer/{id}")
	public ResponseEntity<?> updateOfficer(@PathVariable Long id, @RequestBody OfficerUpdateDTO dto) {
	    try {
	    	String updatedOfficer = officerService.updateOfficer(id, dto);
		    return ResponseEntity.ok(updatedOfficer);
		} catch (Exception e) {
			System.out.println("In catch block");
			
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponseDTO(e.getMessage()));
		}
		
	}

	@PutMapping("/delete-officer/{id}")
	public ResponseEntity<?> deleteOfficer(@PathVariable Long id){
		try {
			officerService.deleteOfficer(id);
	        return ResponseEntity.ok("Officer marked as INACTIVE.");
		} catch (Exception e) {
			System.out.println("In catch block");
			
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponseDTO(e.getMessage()));
		}
		 
	}
	
}
