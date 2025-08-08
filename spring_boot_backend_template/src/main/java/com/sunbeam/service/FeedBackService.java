package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.DesignationDTO;
import com.sunbeam.dto.FeedbackDTO;
import com.sunbeam.dto.FetchFeedbackDTO;
import com.sunbeam.entities.Designation;
import com.sunbeam.entities.Feedback;

public interface FeedBackService {
	List<FetchFeedbackDTO> getAllFeedBack();
	List<FetchFeedbackDTO> getUnseenFeedbacks();
	String setSeenStatus(Long Id);
	ApiResponse submitFeedback(Long userId, FeedbackDTO dto,Long complaintId) ;
}
