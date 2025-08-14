package com.sunbeam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PoliceStationUpdateDTO {
	private String policeStationName;
    private Integer policeStationPincode;
    private Integer numberOfOfficers;
    private String mapsLink;
    private Double latitude;
    private Double longitude;
    private Long stationHeadId;
}
