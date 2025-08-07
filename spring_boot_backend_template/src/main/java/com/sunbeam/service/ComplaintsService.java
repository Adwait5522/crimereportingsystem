package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.ComplaintReqDTO;
import com.sunbeam.dto.ComplaintRespDTO;

public interface ComplaintsService {
	 String updateStatus(Long complaintId, String newStatus);
	 
	 String updatePriority(Long complaintId, String newPriority);
	 
	 List<ComplaintRespDTO> getComplaintsByPoliceStationId(Long policeStationId);
	 
	 String registerComplaint(ComplaintReqDTO dto);
	 
	 List<ComplaintRespDTO> getComplaints();
	 
	 String deleteCompliant(Long complaint_id);
}
