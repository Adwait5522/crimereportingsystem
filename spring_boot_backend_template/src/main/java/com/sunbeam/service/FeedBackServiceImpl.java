package com.sunbeam.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.DesignationDTO;
import com.sunbeam.dto.FeedbackDTO;
import com.sunbeam.dto.FetchFeedbackDTO;
import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.ComplaintsDao;
import com.sunbeam.dao.DesignationDao;
import com.sunbeam.dao.FeedBackDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.entities.Complaints;
import com.sunbeam.entities.Designation;
import com.sunbeam.entities.Feedback;
import com.sunbeam.entities.User;
//import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.exception.CustomExceptionClass;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class FeedBackServiceImpl implements FeedBackService{

    private final ModelMapper modelMapper;
	
	private final FeedBackDao feedBackDao;
	
	private final UserDao userDao;
	
	private final ComplaintsDao complaintsDao;
	
	@Override
	public List<FetchFeedbackDTO> getAllFeedBack() {
	    List<Feedback> feedbacks = feedBackDao.findAll();
	    return mapToDTOList(feedbacks);
	}
	
	@Override
	public List<FetchFeedbackDTO> getUnseenFeedbacks() {
		List<Feedback> feedbacks = feedBackDao.findByStatus(false);
		return mapToDTOList(feedbacks);
	}
	
	public FetchFeedbackDTO mapToDTO(Feedback feedback) {
	    if (feedback == null) return null;

	    FetchFeedbackDTO dto = new FetchFeedbackDTO();
	    dto.setFeedBackId(feedback.getFeedbackId());
	    dto.setComplaintId(feedback.getComplaint().getComplaintId());
	    dto.setPoliceStationId(feedback.getComplaint().getPoliceStation().getPoliceStationId()); // Fetch from complaint
	    dto.setRating(feedback.getRating());
	    dto.setComments(feedback.getComments());
	    return dto;
	}

	
	public List<FetchFeedbackDTO> mapToDTOList(List<Feedback> feedbackList) {
	    return feedbackList.stream()
	            .map(this::mapToDTO)
	            .collect(Collectors.toList());
	}



	@Override
	public String setSeenStatus(Long Id) {
		Feedback feedback = feedBackDao.findById(Id).orElseThrow(()->new CustomExceptionClass("Cannot find feedback"));
		feedback.setStatus(true);
		return null;
	}
	
	@Override
    public ApiResponse submitFeedback(Long userId, FeedbackDTO dto,Long complaintId) {
        Complaints complaint = complaintsDao.findById(complaintId)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));

        User user = userDao.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Feedback feedback = new Feedback(
                complaint,
                user,
                dto.getRating(),  // use rating from DTO
                dto.getComments(),             // use comment from DTO
                LocalDateTime.now()
        );

//        feedbackDao.save(feedback);
        feedBackDao.save(feedback);
        return new ApiResponse("Feedback submitted successfully!");
    }


}
