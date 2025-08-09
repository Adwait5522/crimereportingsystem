package com.sunbeam.dto;

import com.sunbeam.entities.Status;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateComplaintStatusDTO {
    private Long complaintId;
    private Status status; // PENDING, INVESTIGATING, RESOLVED, REJECTED
}
