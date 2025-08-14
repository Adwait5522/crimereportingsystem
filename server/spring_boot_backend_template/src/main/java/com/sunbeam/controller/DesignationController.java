package com.sunbeam.controller;

import java.util.List;

import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.DesignationDTO;
import com.sunbeam.entities.Designation;
import com.sunbeam.service.DesignationService;

import io.swagger.v3.oas.annotations.Parameter;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/designation")
public class DesignationController {
	
	private final DesignationService designationService;

	@GetMapping
	public List<Designation> findAllDesignations() {
		return designationService.getAllDesignation();
	}
	
	@PostMapping
	public String postDesignation(@RequestBody DesignationDTO designation) {
		return designationService.addDesignation(designation);
	}
	
	@DeleteMapping("/{designationId}")
	public String deleteDesignation(@PathVariable Long designationId) {
		return designationService.deleteDesignation(designationId);
	}
}
