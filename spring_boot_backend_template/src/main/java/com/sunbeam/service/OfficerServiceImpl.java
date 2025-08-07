package com.sunbeam.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sunbeam.custom_exceptions.ApiException;
import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.OfficerDao;
import com.sunbeam.dao.OfficerLoginDao;
import com.sunbeam.dto.OfficerLoginReqDTO;
import com.sunbeam.dto.OfficerLoginRespDTO;
import com.sunbeam.dto.OfficerRespDTO;
import com.sunbeam.entities.Officer;
import com.sunbeam.entities.OfficerLogin;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class OfficerServiceImpl implements OfficerService {

	
    private final OfficerLoginDao officerLoginDao; // ✅ updated name
    
    private final OfficerDao officerDao;
    
    private final ModelMapper modelMapper;
    

//    @Override
//    public OfficerLoginRespDTO authenticate(OfficerLoginReqDTO logindto) {
//        OfficerLogin login = officerLoginDao
//            .findByOfficerOfficerId(logindto.getOfficerId())
//            .orElseThrow(() -> new ResourceNotFoundException("Officer not found!"));
//
//        if (!login.getPassword().equals(logindto.getPassword())) {
//            throw new ApiException("Invalid password!");
//        }
//
//        return new OfficerLoginRespDTO("Login Successful!");
//    }
//    
    
    @Override
    public OfficerLoginRespDTO authenticate(OfficerLoginReqDTO logindto) {
        OfficerLogin login = officerLoginDao
            .findByOfficerOfficerId(logindto.getOfficerId())
            .orElseThrow(() -> new ResourceNotFoundException("Officer not found!"));

        if (!login.getPassword().equals(logindto.getPassword())) {
            throw new ApiException("Invalid password!");
        }

        Long designationId = login.getOfficer().getDesignation().getDesignationId(); // ✅ extract designation ID

        return new OfficerLoginRespDTO("Login Successful!", designationId);
    }

    
    
    
    @Override
    public List<OfficerRespDTO> getAllInspectors() {
        List<Officer> allOfficers = officerDao.findByDesignationDesignationNameIgnoreCase("Inspector");

        return allOfficers.stream()
                .map(officer -> {
                    OfficerRespDTO dto = new OfficerRespDTO();
                    dto.setOfficerId(officer.getOfficerId());
                    dto.setOfficerName(officer.getOfficerName());
                    dto.setDesignation(officer.getDesignation().getDesignationName());
                    dto.setPoliceStationName(officer.getPoliceStation().getPoliceStationName());
                    dto.setStatus(officer.getActiveStatus().toString());
                    return dto;
                }).toList();
    }

}