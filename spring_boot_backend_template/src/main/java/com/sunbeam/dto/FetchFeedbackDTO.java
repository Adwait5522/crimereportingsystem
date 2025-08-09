package com.sunbeam.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FetchFeedbackDTO {
	
	private Long feedBackId;
	
    private Long complaintId;

    private Long policeStationId;

    private int rating;

    private String comments;
}
