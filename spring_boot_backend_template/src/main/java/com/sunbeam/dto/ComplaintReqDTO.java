package com.sunbeam.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComplaintReqDTO {
    private Long userId;
    private String complaintType;
    private String description;
    private List<String> evidenceFiles;
    private String locationPincode;
    private String city;
    private String state;
    private String priority; // HIGH, MEDIUM, LOW
    private Long policeStationId;
}
