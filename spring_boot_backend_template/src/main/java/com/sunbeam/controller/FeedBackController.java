package com.sunbeam.controller;

import java.util.List;

import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.FeedbackDTO;
import com.sunbeam.dto.FetchFeedbackDTO;
//import com.sunbeam.dto.OfficerDTO;
//import com.sunbeam.dto.PoliceStationDTO;
import com.sunbeam.entities.Feedback;
import com.sunbeam.entities.Officer;
import com.sunbeam.entities.PoliceStation;
import com.sunbeam.service.FeedBackService;
import com.sunbeam.service.OfficerService;
//import com.sunbeam.service.PoliceStationService;

import io.swagger.v3.oas.annotations.Parameter;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/feedBack")
public class FeedBackController {
	
	private final FeedBackService feedBackService;
	
	@GetMapping
	public List<FetchFeedbackDTO> getAllFeedBack() {
		return feedBackService.getAllFeedBack();
	}
	
	@GetMapping("/unseen-feedback")
	public List<FetchFeedbackDTO> getAllUnseenFeedBack() {
		return feedBackService.getUnseenFeedbacks();
	}
	
	
	@PatchMapping("/{feedbackId}")
	public String updateSeenStatus(@PathVariable Long feedbackId) {
		return feedBackService.setSeenStatus(feedbackId);
	}
	
	
	
	@PostMapping("/user_login/{userId}/complaint/{complaintId}")
	public ResponseEntity<ApiResponse> submitFeedback(
	        @PathVariable Long userId,
	        @PathVariable Long complaintId,
	        @RequestBody FeedbackDTO dto) {

//	    dto.setComplaintId(complaintId); // auto-set from URL
	    return ResponseEntity.ok(feedBackService.submitFeedback(userId, dto,complaintId));
	}
	
}


