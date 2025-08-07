package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.OfficerLoginReqDTO;
import com.sunbeam.dto.OfficerLoginRespDTO;
import com.sunbeam.dto.OfficerRespDTO;

public interface OfficerService {

	OfficerLoginRespDTO authenticate(OfficerLoginReqDTO logindto);
	
	List<OfficerRespDTO> getAllInspectors();



}
