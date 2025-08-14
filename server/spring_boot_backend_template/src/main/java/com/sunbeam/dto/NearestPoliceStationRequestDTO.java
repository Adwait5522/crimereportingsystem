package com.sunbeam.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NearestPoliceStationRequestDTO {
//    private String mapsLink; // e.g., "https://maps.google.com/?q=18.5204,73.8567"
	  private double latitude;
	    private double longitude;
}
