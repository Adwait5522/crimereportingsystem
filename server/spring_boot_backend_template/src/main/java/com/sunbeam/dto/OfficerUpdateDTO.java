package com.sunbeam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OfficerUpdateDTO {
	private String officerName;
    private Long designationId;
    private Long policeStationId;
    private String password;
}
