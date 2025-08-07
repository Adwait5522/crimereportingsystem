package com.sunbeam.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.dto.DesignationDTO;
import com.sunbeam.dto.FetchFeedbackDTO;
import com.sunbeam.dao.DesignationDao;
import com.sunbeam.dao.FeedBackDao;
import com.sunbeam.entities.Designation;
import com.sunbeam.entities.Feedback;
//import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.exception.CustomExceptionClass;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class FeedBackServiceImpl implements FeedBackService{

    private final ModelMapper modelMapper;
	
	private final FeedBackDao feedBackDao;
	
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
	    dto.setUserId(feedback.getUser().getUserId());
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

}
