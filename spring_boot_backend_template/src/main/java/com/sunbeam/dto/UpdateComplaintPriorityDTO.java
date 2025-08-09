package com.sunbeam.dto;

import com.sunbeam.entities.Priority;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateComplaintPriorityDTO {
    private Long complaintId;
    private Priority priority; // LOW, MEDIUM, HIGH
}
