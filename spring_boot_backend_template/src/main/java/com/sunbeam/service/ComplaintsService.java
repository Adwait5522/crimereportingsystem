package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.ComplaintReqDTO;
import com.sunbeam.dto.ComplaintRespDTO;

public interface ComplaintsService {
	 String updateStatus(Integer complaintId, String newStatus);
	 
	 String updatePriority(Integer complaintId, String newPriority);
	 
	 List<ComplaintRespDTO> getComplaintsByPoliceStationId(Long policeStationId);
	 
	 String registerComplaint(ComplaintReqDTO dto);
	 
	 List<ComplaintRespDTO> getComplaints();
	 
	 String deleteCompliant(Integer complaint_id);
}
