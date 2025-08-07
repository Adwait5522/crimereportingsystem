package com.sunbeam.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddPoliceStationDTO {
	
	private String policeStationName;

    private int policeStationPincode;
    
    private Long stationHeadId;

    private Integer numberOfOfficers;

    private String mapsLink;
}
