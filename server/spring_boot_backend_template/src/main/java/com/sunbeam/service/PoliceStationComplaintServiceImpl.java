package com.sunbeam.service;

import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.dto.DesignationDTO;
import com.sunbeam.dto.PoliceStationDTO;
import com.sunbeam.dao.DesignationDao;
import com.sunbeam.dao.PoliceStationDao;
import com.sunbeam.dao.PoliceStationRepository;
import com.sunbeam.entities.Designation;
import com.sunbeam.entities.PoliceStation;
//import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.exception.CustomExceptionClass;
import com.sunbeam.projection.PoliceStationComplaintStats;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class PoliceStationComplaintServiceImpl implements PoliceStationComplaintService{

//    private final ModelMapper modelMapper;
	
	private final PoliceStationRepository policeStationRepository;
	
	public List<PoliceStationComplaintStats> getComplaintStatsByStation() {
	    return policeStationRepository.fetchComplaintStatsByStation();
	}


		

}
