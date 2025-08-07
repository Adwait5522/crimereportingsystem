package com.sunbeam.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.dto.AddPoliceStationDTO;
import com.sunbeam.dto.DesignationDTO;
import com.sunbeam.dto.PoliceStationDTO;
import com.sunbeam.dto.PoliceStationUpdateDTO;
import com.sunbeam.dao.DesignationDao;
import com.sunbeam.dao.OfficerDao;
import com.sunbeam.dao.PoliceStationDao;
import com.sunbeam.entities.Designation;
import com.sunbeam.entities.Officer;
import com.sunbeam.entities.PoliceStation;
//import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.exception.CustomExceptionClass;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class PoliceStationServiceImpl implements PoliceStationService{

    private final ModelMapper modelMapper;
	
	private final PoliceStationDao policeStationDao;
	
	private final OfficerDao officerDao;
	
	@Override
	public List<PoliceStationDTO> getAllPoliceStations() {
	    List<PoliceStation> stations = policeStationDao.findAll();
	    return stations.stream()
	            .map(this::convertToDTO)
	            .collect(Collectors.toList());
	}

	@Override
	public List<PoliceStationDTO> getAllActivePoliceStation() {
	    List<PoliceStation> stations = policeStationDao.findByStatus(true);
	    return stations.stream()
	            .map(this::convertToDTO)
	            .collect(Collectors.toList());
	}

	private PoliceStationDTO convertToDTO(PoliceStation ps) {
	    PoliceStationDTO dto = modelMapper.map(ps, PoliceStationDTO.class);
	    
	    // manually map nested property: stationHeadId
	    if (ps.getStationHead() != null) {
	        dto.setStationHeadId(ps.getStationHead().getOfficerId().intValue());
	    } else {
	        dto.setStationHeadId(0); // or null, depending on your preference
	    }

	    return dto;
	}

	

//	@Override
//	public List<PoliceStationDTO> getAllPoliceStations() {
//		
//		return policeStationDao.findAll();
//	}
//
//	@Override
//	public List<PoliceStationDTO> getAllActivePoliceStation() {
//		// TODO Auto-generated method stub
//		return policeStationDao.findByStatus(true);
//	}

//	@Override
//	public String addPoliceStation(AddPoliceStationDTO addPoliceStationDTO) {
//		PoliceStation policeStation = modelMapper.map(addPoliceStationDTO, PoliceStation.class);
//		Officer officer = officerDao.findById(addPoliceStationDTO.getStationHeadId()).orElseThrow(()->new CustomExceptionClass("Cannot add station"));
//		policeStation.setStationHead(officer);
//		policeStationDao.save(policeStation);
//		return "Added Successfully";
//	}
	
	@Override
	public String addPoliceStation(AddPoliceStationDTO addPoliceStationDTO) {
	    // Step 1: Map DTO to Entity
	    PoliceStation policeStation = modelMapper.map(addPoliceStationDTO, PoliceStation.class);

	    // Step 2: Get Officer by ID
	    Officer officer = officerDao.findById(addPoliceStationDTO.getStationHeadId())
	            .orElseThrow(() -> new CustomExceptionClass("Cannot add station"));

	    // Step 3: Set Officer as Station Head (Bidirectional link - Optional)
	    policeStation.setStationHead(officer);

	    // Step 4: Save Police Station first to get its ID
	    PoliceStation savedStation = policeStationDao.save(policeStation);

	    // Step 5: Set saved station to the officer's policeStation field
	    officer.setPoliceStation(savedStation);

	    // Step 6: Save the updated officer
	    officerDao.save(officer);

	    return "Added Successfully";
	}


	@Override
	public String deletePoliceStation(Long id) {
		PoliceStation policeStation = policeStationDao.findById(id).orElseThrow(()->new CustomExceptionClass("Cannot delete station"));
		policeStation.setStatus(false);
		return "Deleted Successfully";
	}

	@Override
	public String updatePoliceStation(Long id, PoliceStationUpdateDTO dto) {
		// TODO Auto-generated method stub
		return null;
	}
	

}
