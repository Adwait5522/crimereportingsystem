package com.sunbeam.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NearestPoliceStationResponseDTO {
//    private Long policeStationId;
//    private String policeStationName;
//    private double latitude;
//    private double longitude;
//    private String mapsLink;
	
	 private Long policeStationId;
	    private String policeStationName;
	    private String address;
	    private double latitude;
	    private double longitude;
	    private double distanceInKm;
}
