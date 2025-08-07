package com.sunbeam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PoliceStationUpdateDTO {
	private String policeStationName;
	private String policeStationPincode;
	private String googleMap;
}
