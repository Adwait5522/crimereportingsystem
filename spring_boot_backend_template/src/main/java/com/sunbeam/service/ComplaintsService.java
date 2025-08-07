package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.ComplaintReqDTO;
import com.sunbeam.dto.ComplaintRespDTO;
import com.sunbeam.dto.ComplaintRespDTO2;
import com.sunbeam.dto.ComplaintResponseDTO;
import com.sunbeam.dto.CreateComplaintDTO;
import com.sunbeam.dto.UpdateComplaintDTO;

public interface ComplaintsService {
	 String updateStatus(Long complaintId, String newStatus);
	 
	 String updatePriority(Long complaintId, String newPriority);
	 
	 List<ComplaintRespDTO> getComplaintsByPoliceStationId(Long policeStationId);
	 
	 String registerComplaint(ComplaintReqDTO dto);
	 
	 List<ComplaintRespDTO> getComplaints();
	 
	 String deleteCompliant(Long complaint_id);

	 ApiResponse updateDetails(Long complaint_id, UpdateComplaintDTO dto);

	public List<ComplaintResponseDTO> getComplaintsByUserId(Long userId);
		
	ApiResponse registerComplaint(Long userId,CreateComplaintDTO dto);

	List<ComplaintRespDTO2> getComplaintsByStationFromOfficer(Long inspectorId);

	List<ComplaintRespDTO> getComplaintsByOfficerId(Long officerId);

	ComplaintRespDTO getComplaintsById(Long id);

	void assignOfficer(Long complaintId, Long officerId);
}
