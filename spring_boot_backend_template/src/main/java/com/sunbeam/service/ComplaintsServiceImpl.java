package com.sunbeam.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.ComplaintsDao;
import com.sunbeam.dao.PoliceStationDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.ComplaintReqDTO;
import com.sunbeam.dto.ComplaintRespDTO;
import com.sunbeam.entities.Complaints;
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

    @Override
    public String updateStatus(Integer complaintId, String newStatus) {
        Complaints complaint = complaintsDao.findById(complaintId)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));

        Status status = Status.valueOf(newStatus.toUpperCase()); // Convert string to enum
        complaint.setStatus(status);
        complaintsDao.save(complaint);

        return "Status updated to " + status;
    }
    
    @Override
    public String updatePriority(Integer complaintId, String newPriority) {
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
                    c.getComplaint_id(),
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
                        c.getComplaint_id(),
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
	public String deleteCompliant(Integer complaint_id) {
		// TODO Auto-generated method stub
		Complaints complaint = complaintsDao.findById(complaint_id).orElseThrow(()->new ResourceNotFoundException("Invalid Complaint ID !!!!"));
		complaint.setStatus(Status.REJECTED);
		complaintsDao.save(complaint);
		
		return "soft deleted complaint details";
	}


}