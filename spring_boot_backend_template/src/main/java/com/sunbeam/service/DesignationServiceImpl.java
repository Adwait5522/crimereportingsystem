package com.sunbeam.service;

import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.dao.DesignationDao;
import com.sunbeam.dto.DesignationDTO;
import com.sunbeam.entities.Designation;
//import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.exception.CustomExceptionClass;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class DesignationServiceImpl implements DesignationService{

    private final ModelMapper modelMapper;
	
	private final DesignationDao designationDao;
	
	@Override
	public List<Designation> getAllDesignation() {
		return designationDao.findAll();
	}

	// Make sure ID is null in designationDTO
	@Override
	public String addDesignation(DesignationDTO designationDTO) {
		Designation designation = modelMapper.map(designationDTO, Designation.class);
		designationDao.save(designation);
		return "Saved Successfully";
	}
	
	@Override
	public String deleteDesignation(Long id) {
		
		Designation designation = designationDao.findById(id).orElseThrow(()->new CustomExceptionClass("Cannot delete designation"));
		designation.setStatus(false);
		return "soft deleted category";
	}

	

}
