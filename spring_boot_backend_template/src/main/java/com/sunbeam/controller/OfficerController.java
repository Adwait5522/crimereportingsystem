package com.sunbeam.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.OfficerLoginReqDTO;
import com.sunbeam.dto.OfficerRespDTO;
import com.sunbeam.service.OfficerService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/officers")
@AllArgsConstructor
@Validated
public class OfficerController {
	private final OfficerService officerService;
	

	@PostMapping("/signin")
	public ResponseEntity<?> officerSignIn(@RequestBody OfficerLoginReqDTO logindto ){
		System.out.println("In sign in DTO"+logindto);
		
		try {
			return ResponseEntity.ok(officerService.authenticate(logindto));
		} catch (RuntimeException e) {
			// TODO: handle exception
			System.out.println("In catch block");
				
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse("Invalid input"));
		}
	}
	
	@GetMapping("/inspectors")
	public ResponseEntity<?> getAllInspectors() {
	    List<OfficerRespDTO> inspectors = officerService.getAllInspectors();
	    return ResponseEntity.ok(inspectors);
	}
	
	
	

}
