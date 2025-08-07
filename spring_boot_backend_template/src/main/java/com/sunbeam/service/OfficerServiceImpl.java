package com.sunbeam.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sunbeam.custom_exceptions.ApiException;
import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.DesignationDao;
import com.sunbeam.dao.OfficerDao;
import com.sunbeam.dao.OfficerLoginDao;
import com.sunbeam.dao.PoliceStationDao;
import com.sunbeam.dto.OfficerDTO;
import com.sunbeam.dto.OfficerLoginReqDTO;
import com.sunbeam.dto.OfficerLoginRespDTO;
import com.sunbeam.dto.OfficerRespDTO;
import com.sunbeam.entities.Designation;
import com.sunbeam.entities.Officer;
import com.sunbeam.entities.OfficerLogin;
import com.sunbeam.entities.OfficerStatus;
import com.sunbeam.entities.PoliceStation;
import com.sunbeam.exception.CustomExceptionClass;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class OfficerServiceImpl implements OfficerService {

	
    private final OfficerLoginDao officerLoginDao; // ✅ updated name
    
    private final OfficerDao officerDao;
    
    private final PoliceStationDao policeStationDao;
    
    private final DesignationDao designationDao;
    
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
    public String addOfficer(OfficerDTO officerDTO) {
        Officer officer = new Officer();
        officer.setOfficerName(officerDTO.getOfficerName());
        officer.setActiveStatus(OfficerStatus.ACTIVE);

        // Set Designation (required)
        Designation desig = designationDao.findById(officerDTO.getDesignationId())
            .orElseThrow(() -> new CustomExceptionClass("Designation not found"));
        officer.setDesignation(desig);

        // Set Police Station only if ID is provided
        if (officerDTO.getPoliceStationId() != null) {
            PoliceStation ps = policeStationDao.findById(officerDTO.getPoliceStationId())
                .orElseThrow(() -> new CustomExceptionClass("Police Station not found"));
            officer.setPoliceStation(ps);
        } else {
            officer.setPoliceStation(null); // optional but clear
        }

        officerDao.save(officer);
        return "Officer Added";
    }


    @Override
	public String updateDesignation(Long officerId) {
	  
	    Officer officer = officerDao.findById(officerId)
	        .orElseThrow(() -> new CustomExceptionClass("Officer not found with id: " + officerId));

	    Designation designation = designationDao.findByDesignationName("station_incharge")
	        .orElseThrow(() -> new CustomExceptionClass("Designation 'station_incharge' not found"));

	    officer.setDesignation(designation);

	    officerDao.save(officer);

	    return "Designation Updated Successfully";
	}
    
    
    
//    @Override
//    public List<OfficerRespDTO> getAllInspectors() {
//        List<Officer> allOfficers = officerDao.findByDesignationDesignationNameIgnoreCase("station_head");
//
//        return allOfficers.stream()
//                .map(officer -> {
//                    OfficerRespDTO dto = new OfficerRespDTO();
//                    dto.setOfficerId(officer.getOfficerId());
//                    dto.setOfficerName(officer.getOfficerName());
//                    dto.setDesignation(officer.getDesignation().getDesignationName());
//                    dto.setPoliceStationName(officer.getPoliceStation().getPoliceStationName());
//                    dto.setStatus(officer.getActiveStatus().toString());
//                    return dto;
//                }).toList();
//    }
    
    @Override
    public List<OfficerRespDTO> getAllInspectors() {
        List<Officer> allOfficers = officerDao.findByDesignationDesignationNameIgnoreCase("station_head");

        return allOfficers.stream()
                .map(officer -> {
                    OfficerRespDTO dto = new OfficerRespDTO();
                    dto.setOfficerId(officer.getOfficerId());
                    dto.setOfficerName(officer.getOfficerName());
                    dto.setDesignation(officer.getDesignation().getDesignationName());

                    // Null check for policeStation
                    if (officer.getPoliceStation() != null) {
                        dto.setPoliceStationName(officer.getPoliceStation().getPoliceStationName());
                    } else {
                        dto.setPoliceStationName("Not Assigned"); // or use null or empty string
                    }

                    dto.setStatus(officer.getActiveStatus().toString());
                    return dto;
                }).toList();
    }


}