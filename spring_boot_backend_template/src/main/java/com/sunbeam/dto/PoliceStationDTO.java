package com.sunbeam.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PoliceStationDTO {

	private String policeStationId;
	
    private String policeStationName;

    private int policeStationPincode;
    
    private int stationHeadId;

    private Integer numberOfOfficers;

    private String mapsLink;

}
