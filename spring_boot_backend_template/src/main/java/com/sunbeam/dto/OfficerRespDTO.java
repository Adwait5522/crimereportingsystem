package com.sunbeam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OfficerRespDTO {
    private Long officerId;
    private String officerName;
    private String designation;
    private String policeStationName;
    private String status;
}