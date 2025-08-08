package com.sunbeam.controller;

import java.util.List;

import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.AddPoliceStationDTO;
import com.sunbeam.dto.CreatePoliceStationDTO;
import com.sunbeam.dto.NearestPoliceStationRequestDTO;
import com.sunbeam.dto.NearestPoliceStationResponseDTO;
import com.sunbeam.dto.PoliceStationDTO;
import com.sunbeam.entities.PoliceStation;
import com.sunbeam.service.PoliceStationService;

import io.swagger.v3.oas.annotations.Parameter;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/policestation")
public class PoliceStationController {
	
	private final PoliceStationService policeStationService;
	
	@GetMapping
	public List<PoliceStationDTO> getAllPoliceStations() {
		return policeStationService.getAllPoliceStations();
	}
	
	@GetMapping("/active-station")
	public List<PoliceStationDTO> getAllPoliceActiveStations() {
		return policeStationService.getAllActivePoliceStation();
	}
	
	@PostMapping
	public String addtPoliceStation(@RequestBody AddPoliceStationDTO addPoliceStationDTO) {
		policeStationService.addPoliceStation(addPoliceStationDTO);
		return "Added successfully";	
	}
	
	@PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody CreatePoliceStationDTO dto) {
        String msg = policeStationService.createPoliceStation(dto);
        return ResponseEntity.ok(msg);
    }
	
	@DeleteMapping("/{policeStaionId}")
	public String deletePoliceStation(@PathVariable Long policeStaionId) {
		return policeStationService.deletePoliceStation(policeStaionId);
	}
	
	@PostMapping("/nearest")
    public ResponseEntity<NearestPoliceStationResponseDTO> findNearestPoliceStation(
            @RequestBody NearestPoliceStationRequestDTO requestDTO) {
        NearestPoliceStationResponseDTO response = policeStationService.findNearestPoliceStation(
                requestDTO.getLatitude(), requestDTO.getLongitude());
        return ResponseEntity.ok(response);
    }
	
	
}


