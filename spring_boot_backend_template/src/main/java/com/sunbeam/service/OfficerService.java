package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.OfficerDTO;
import com.sunbeam.dto.OfficerLoginReqDTO;
import com.sunbeam.dto.OfficerLoginRespDTO;
import com.sunbeam.dto.OfficerRespDTO;
import com.sunbeam.dto.OfficerUpdateDTO;

public interface OfficerService {

	OfficerLoginRespDTO authenticate(OfficerLoginReqDTO logindto);
	
	List<OfficerRespDTO> getAllInspectors();
	String addOfficer(OfficerDTO officerDTO);
	String updateDesignation(Long id);

	String updateOfficer(Long id, OfficerUpdateDTO dto);

	void deleteOfficer(Long id);
	OfficerRespDTO getOfficerById(Long id);

	List<OfficerRespDTO> getOfficersByInspector(Long inspectorId);
	
	List<OfficerRespDTO> getAllOfficers();
	String assignStationToOfficer(Long officerId, Long policeStationId);

	
	List<OfficerRespDTO> getUnassignedOfficers();

}
