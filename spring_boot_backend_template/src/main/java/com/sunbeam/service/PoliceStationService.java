package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.AddPoliceStationDTO;
import com.sunbeam.dto.NearestPoliceStationResponseDTO;
import com.sunbeam.dto.PoliceStationDTO;
import com.sunbeam.dto.PoliceStationUpdateDTO;
import com.sunbeam.entities.PoliceStation;

public interface PoliceStationService {
	List<PoliceStationDTO> getAllPoliceStations();
	List<PoliceStationDTO> getAllActivePoliceStation();
//	String addPoliceStation(AddPoliceStationDTO addPoliceStationDTO);
	String deletePoliceStation(Long id);
	String updatePoliceStation(Long id, PoliceStationUpdateDTO dto);
	 String createPoliceStation(PoliceStationDTO dto);
	    
	    boolean existsByStationHeadOfficerId(Long officerId);
	    
	    String addPoliceStation(AddPoliceStationDTO addPoliceStationDTO);
	    
//	    NearestPoliceStationResponseDTO findNearestStation(NearestPoliceStationRequestDTO request);
	    
	    NearestPoliceStationResponseDTO findNearestPoliceStation(double latitude, double longitude);

}
