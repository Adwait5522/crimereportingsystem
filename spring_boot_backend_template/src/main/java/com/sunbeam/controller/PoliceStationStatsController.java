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

import com.sunbeam.dto.PoliceStationDTO;
import com.sunbeam.entities.PoliceStation;
import com.sunbeam.projection.PoliceStationComplaintStats;
import com.sunbeam.service.PoliceStationComplaintService;
import com.sunbeam.service.PoliceStationService;

import io.swagger.v3.oas.annotations.Parameter;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/policestation")
public class PoliceStationStatsController {
	
	private final PoliceStationComplaintService policeStationComplaintService;
	
	@GetMapping("/complaint-stats")
	public List<PoliceStationComplaintStats> getComplaintStats() {
	    return policeStationComplaintService.getComplaintStatsByStation();
	}

	
	
}


