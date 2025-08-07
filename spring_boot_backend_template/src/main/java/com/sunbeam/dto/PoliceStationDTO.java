package com.sunbeam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class PoliceStationDTO {
    private String policeStationName;
    private Integer policeStationPincode;
    private Integer numberOfOfficers;
    private String mapsLink; // e.g. https://maps.google.com/?q=18.5308,73.8471
    
    private double latitude;
    private double longitude;

    private Long stationHeadId;
}

