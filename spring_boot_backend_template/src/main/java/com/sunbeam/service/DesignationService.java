package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.DesignationDTO;
import com.sunbeam.entities.Designation;

public interface DesignationService {
	List<Designation> getAllDesignation();
	String addDesignation(DesignationDTO designationDTO);
	String deleteDesignation(Long id);
}
