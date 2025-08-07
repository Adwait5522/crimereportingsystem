package com.sunbeam.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ComplaintResponseDTO {
    private Long complaintId;
    private Integer userId;
    private String userFullName;
    private String complaintType;
    private String description;
//    private List<String> evidenceFiles;
    private String locationPincode;
    private String city;
    private String state;
    private String status;
    private LocalDateTime createdAt;
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}