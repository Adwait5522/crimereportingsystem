package com.sunbeam.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class PoliceStation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "police_station_id", unique = true)
    private Long policeStationId;

    @OneToOne
    @JoinColumn(name = "station_head_id", referencedColumnName = "officer_id", nullable = false)
    private Officer stationHead;

    @Column(name = "police_station_name", length = 100, nullable = false)
    private String policeStationName;

    @Column(name = "police_station_pincode", length = 10, nullable = false)
    private int policeStationPincode;

    @Column(name = "number_of_officers")
    private Integer numberOfOfficers;

    @Column(name = "status", nullable = false)
    private boolean status = true;

    @Column(name = "maps_link", length = 500)
    private String mapsLink;
}
