package com.sunbeam.dto;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UpdateComplaintDTO {

    
    private String complaintType;

    private String description;

    
    private List<@Size(min = 1) String> evidenceFiles;

   
    private String locationPincode;

    
    private String city;

   
    private String state;

    
    private Long officerId;

    
    private String priority;

    
    private String status;

    private Long policeStationId;


}

