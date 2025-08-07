package com.sunbeam.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sunbeam.exception.ResourceNotFoundException;
import com.sunbeam.custom_exceptions.ApiException;
import com.sunbeam.dao.ComplaintsDao;
import com.sunbeam.dao.OfficerDao;
import com.sunbeam.dao.PoliceStationDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.ComplaintReqDTO;
import com.sunbeam.dto.ComplaintRespDTO;
import com.sunbeam.dto.ComplaintRespDTO2;
import com.sunbeam.dto.ComplaintResponseDTO;
import com.sunbeam.dto.CreateComplaintDTO;
import com.sunbeam.dto.UpdateComplaintDTO;
import com.sunbeam.entities.Complaints;
import com.sunbeam.entities.Officer;
import com.sunbeam.entities.PoliceStation;
import com.sunbeam.entities.Priority;
import com.sunbeam.entities.Status;
import com.sunbeam.entities.User;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class ComplaintsServiceImpl implements ComplaintsService {

    private final ComplaintsDao complaintsDao;
    
    private final PoliceStationDao policeStationDao;
    
    private final UserDao userDao;
    
    private final OfficerDao officerDao;
    
    ModelMapper mapper = new ModelMapper();
    
    

    @Override
    public String updateStatus(Long complaintId, String newStatus) {
        Complaints complaint = complaintsDao.findById(complaintId)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));

        Status status = Status.valueOf(newStatus.toUpperCase()); // Convert string to enum
        complaint.setStatus(status);
        complaintsDao.save(complaint);

        return "Status updated to " + status;
    }
    
    @Override
    public String updatePriority(Long complaintId, String newPriority) {
        Complaints complaint = complaintsDao.findById(complaintId)
            .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));

        Priority priority = Priority.valueOf(newPriority.toUpperCase());
        complaint.setPriority(priority);
        complaintsDao.save(complaint);

        return "Priority updated to " + priority;
    }
    
    @Override
    public List<ComplaintRespDTO> getComplaintsByPoliceStationId(Long policeStationId) {
        List<Complaints> complaints = complaintsDao.findByPoliceStationIdPoliceStationId(policeStationId);

        return complaints.stream()
                .map(c -> new ComplaintRespDTO(
                    c.getComplaintId(),
                    c.getComplaintType(),
                    c.getDescription(),
                    c.getCity(),
                    c.getState(),
                    c.getStatus().toString(),
                    c.getPriority().toString()
                ))
                .toList();
    }
    
    @Override
    public String registerComplaint(ComplaintReqDTO dto) {
        User user = userDao.findById(dto.getUserId())
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        PoliceStation ps = policeStationDao.findById(dto.getPoliceStationId())
            .orElseThrow(() -> new ResourceNotFoundException("Police station not found"));

        Complaints complaint = new Complaints();
        complaint.setUser(user);
        complaint.setComplaintType(dto.getComplaintType());
        complaint.setDescription(dto.getDescription());
        complaint.setEvidenceFiles(dto.getEvidenceFiles());
        complaint.setLocationPincode(dto.getLocationPincode());
        complaint.setCity(dto.getCity());
        complaint.setState(dto.getState());
        complaint.setStatus(Status.PENDING); // default
        complaint.setPriority(Priority.valueOf(dto.getPriority().toUpperCase()));
        complaint.setPoliceStationId(ps);

        complaintsDao.save(complaint);

        return "Complaint registered successfully!";
    }

    @Override
    public List<ComplaintRespDTO> getComplaints() {
        List<Complaints> complaintList = complaintsDao.findAll();

        return complaintList.stream()
                .map(c -> new ComplaintRespDTO(
                        c.getComplaintId(),
                        c.getComplaintType(),
                        c.getDescription(),
                        c.getCity(),
                        c.getState(),
                        c.getStatus().name(),    // enum to string
                        c.getPriority().name()   // enum to string
                ))
                .toList();  // or use .collect(Collectors.toList()) for Java 8
    }
    
    @Override
	public String deleteCompliant(Long complaint_id) {
		// TODO Auto-generated method stub
		Complaints complaint = complaintsDao.findById(complaint_id).orElseThrow(()->new ResourceNotFoundException("Invalid Complaint ID !!!!"));
		complaint.setStatus(Status.REJECTED);
		complaintsDao.save(complaint);
		
		return "soft deleted complaint details";
	}
    
    @Override
	public List<ComplaintResponseDTO> getComplaintsByUserId(Long userId) {
	    List<Complaints> complaints = complaintsDao.findByUserUserId(userId);
	    List<ComplaintResponseDTO> dtoList = new ArrayList<>();

	     // Create instance here

	    // Define custom mapping locally
	    mapper.typeMap(Complaints.class, ComplaintResponseDTO.class).addMappings(m -> {
	        m.map(src -> src.getUser().getUserId(), ComplaintResponseDTO::setUserId);
	        m.map(src -> src.getUser().getFullName(), ComplaintResponseDTO::setUserFullName);
//	        m.map(Complaints::getEvidenceFiles, ComplaintResponseDTO::setEvidenceFiles);

	        m.map(Complaints::getComplaintId, ComplaintResponseDTO::setComplaintId);
	        m.map(Complaints::getCreatedAt, ComplaintResponseDTO::setCreatedAt);
	    });


	    for (Complaints complaint : complaints) {
	        ComplaintResponseDTO dto = mapper.map(complaint, ComplaintResponseDTO.class);
	        dtoList.add(dto);
	    }

	    return dtoList;
	}

	
	@Override
	
	public ApiResponse registerComplaint(Long userId, CreateComplaintDTO dto) {
	    User user =userDao.findById(userId.longValue())

	        .orElseThrow(() -> new ResourceNotFoundException("User", "ID", userId));

	    PoliceStation nearestPS = policeStationDao.findByPoliceStationPincode(dto.getLocationPincode())
	        .orElseThrow(() -> new ResourceNotFoundException("Police Station", "Pincode", dto.getLocationPincode()));

	    Complaints complaint = new Complaints();
	    complaint.setUser(user);
	    complaint.setComplaintType(dto.getTitle());
	    complaint.setDescription(dto.getDescription());
	    complaint.setLocationPincode(dto.getLocationPincode());
	    complaint.setCity(dto.getCity());
	    complaint.setState(dto.getState());
	    complaint.setPoliceStationId(nearestPS);

	    // ✅ Default status (OPEN)
	    complaint.setStatus(Status.PENDING);

	    // ✅ Default priority is already set to MEDIUM in entity, no need to manually set

	    complaintsDao.save(complaint);

	    return new ApiResponse("Complaint registered successfully!");
	}
	
//	@Override
//	public ApiResponse deleteCompliant(Long complaint_id) {
//		// TODO Auto-generated method stub
//		Complaints complaint = complaintsDao.findById(complaint_id).orElseThrow(()->new ResourceNotFoundException("Invalid Complaint ID !!!!"));
//		complaint.setStatus(Status.REJECTED);
//		complaintsDao.save(complaint);
//		
//		return new ApiResponse("soft deleted complaint details");
//	}
	@Override
	@Transactional
	public ApiResponse updateDetails(Long complaintId, UpdateComplaintDTO dto) {

	    // Uniqueness check
	    if (dto.getComplaintType() != null &&
	        complaintsDao.existsByComplaintTypeAndComplaintIdNot(dto.getComplaintType(), complaintId)) {
	        throw new ApiException("Duplicate complaint type - update failed");
	    }

	    // Fetch persistent entity
	    Complaints complaint = complaintsDao.findById(complaintId)
	            .orElseThrow(() -> new ResourceNotFoundException("Invalid Complaint ID"));

	    // Map basic fields (null values skipped by mapper configuration)
	    mapper.map(dto, complaint);

	    // Handle FKs manually if provided
	    if (dto.getOfficerId() != null) {
	        complaint.setOfficer(officerDao.findById(dto.getOfficerId())
	                .orElseThrow(() -> new ResourceNotFoundException("Officer not found")));
	    }
	    if (dto.getPoliceStationId() != null) {
	        complaint.setPoliceStationId(policeStationDao.findById(dto.getPoliceStationId())
	                .orElseThrow(() -> new ResourceNotFoundException("Police station not found")));
	    }
	    if (dto.getPriority() != null) {
	        complaint.setPriority(Priority.valueOf(dto.getPriority().toUpperCase()));
	    }
	    if (dto.getStatus() != null) {
	        complaint.setStatus(Status.valueOf(dto.getStatus().toUpperCase()));
	    }

	    return new ApiResponse("Complaint details updated!");
	}

	@Override
	public List<ComplaintRespDTO2> getComplaintsByStationFromOfficer(Long inspectorId) {
		Officer officer = officerDao.findById(inspectorId).orElseThrow(()-> new ResourceNotFoundException("Inspector not found"));

        PoliceStation station = officer.getPoliceStation();
        if (station == null) {
            throw new RuntimeException("No police station assigned to this inspector");
        }

        List<Complaints> complaints = complaintsDao.findByPoliceStationId(station);
        return complaints.stream()
                .map(c -> new ComplaintRespDTO2(
                        c.getComplaintId(),
                        c.getComplaintType(),
                        c.getDescription(),
                        c.getCity(),
                        c.getState(),
                        c.getStatus().name(),
                        c.getPriority().name(),
                        c.getOfficer() != null ? c.getOfficer().getOfficerId() : null
                ))
                .collect(Collectors.toList());
	}

    @Override
    public List<ComplaintRespDTO> getComplaintsByOfficerId(Long officerId) {
        List<Complaints> complaints = complaintsDao.findByOfficerOfficerId(officerId);

        return complaints.stream()
                .map(c -> new ComplaintRespDTO(
                    c.getComplaintId(),
                    c.getComplaintType(),
                    c.getDescription(),
                    c.getCity(),
                    c.getState(),
                    c.getStatus().toString(),
                    c.getPriority().toString()
                ))
                .toList();
    }

	@Override
	public ComplaintRespDTO getComplaintsById(Long id) {
		Complaints complaints= complaintsDao.findById(id).orElseThrow(()-> new ResourceNotFoundException("Complaint not found"));
		return new ComplaintRespDTO(complaints.getComplaintId(),complaints.getComplaintType(),complaints.getDescription(),complaints.getCity(),complaints.getState(),complaints.getStatus().name(),complaints.getPriority().name());
	}

	@Override
	public void assignOfficer(Long complaintId, Long officerId) {
		 Complaints complaint = complaintsDao.findById(complaintId)
	                .orElseThrow(() -> new RuntimeException("Complaint not found"));

	        Officer officer = officerDao.findById(officerId)
	                .orElseThrow(() -> new RuntimeException("Officer not found"));

	        complaint.setOfficer(officer);
	        complaintsDao.save(complaint);
		
	}


}