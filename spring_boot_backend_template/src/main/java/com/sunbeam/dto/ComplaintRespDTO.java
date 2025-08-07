package com.sunbeam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComplaintRespDTO {
    private Integer complaintId;
    private String complaintType;
    private String description;
    private String city;
    private String state;
    private String status;
    private String priority;
}