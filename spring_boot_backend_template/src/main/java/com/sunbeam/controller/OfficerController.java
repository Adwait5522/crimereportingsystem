package com.sunbeam.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.ApiResponseDTO;
import com.sunbeam.dto.ComplaintRespDTO;
import com.sunbeam.dto.ComplaintRespDTO2;
import com.sunbeam.dto.OfficerDTO;
import com.sunbeam.dto.OfficerLoginReqDTO;
import com.sunbeam.dto.OfficerRespDTO;
import com.sunbeam.service.ComplaintsService;
import com.sunbeam.service.OfficerService;
import com.sunbeam.service.PoliceStationComplaintService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/officers")
@AllArgsConstructor
@Validated
public class OfficerController {
	private final OfficerService officerService;
	private final ComplaintsService complaintsService; 

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
	
	@PatchMapping("/update-designation-incharge")
	public String updateDesignation(Long id) {
		officerService.updateDesignation(id);
		return "Updated";
	}
	
	@PostMapping
	public String addOfficer(@RequestBody OfficerDTO officerDTO) {
		officerService.addOfficer(officerDTO);
		return "Added successfully";	
	}
	@GetMapping ("/{id}")
	public ResponseEntity<?> getOfficerById(@PathVariable Long id) {
	    OfficerRespDTO officer = officerService.getOfficerById(id);
	    return ResponseEntity.ok(officer);
	}
	@GetMapping("/officersBy/{inspectorId}")
	public ResponseEntity<?> getOfficersByInspector(@PathVariable Long inspectorId) {
	    List<OfficerRespDTO> officers = officerService.getOfficersByInspector(inspectorId);
	    return ResponseEntity.ok(officers);
	}
	@GetMapping("/inspectors/{inspectorId}/station-complaints")
	public ResponseEntity<List<ComplaintRespDTO2>> getComplaintsByInspector(@PathVariable Long inspectorId) {
        List<ComplaintRespDTO2> complaints = complaintsService.getComplaintsByStationFromOfficer(inspectorId);
        return ResponseEntity.ok(complaints);
	}
	 @GetMapping("/{officerId}/complaints")
	    public ResponseEntity<?> getComplaintsByStation(@PathVariable Long officerId) {
	    	try {
	    		List<ComplaintRespDTO> list = complaintsService.getComplaintsByOfficerId(officerId);
	            return ResponseEntity.ok(list);
			} catch (Exception e) {
				// TODO: handle exception
				System.out.println("In catch block");
				
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponseDTO("Invalid input"));
			}
	        
	    }
}
