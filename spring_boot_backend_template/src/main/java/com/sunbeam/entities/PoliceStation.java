
package com.sunbeam.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "police_station")
public class PoliceStation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "police_station_id", unique = true)
    private Long policeStationId;

//    @OneToOne
//    @JoinColumn(name = "station_head_id", referencedColumnName = "officer_id", nullable = false)
//    private Officer stationHead;

//    @OneToOne
    @ManyToOne
    @JoinColumn(name = "station_head_id", referencedColumnName = "officer_id", nullable = false)
//    @JsonManagedReference // 👈 Allows serializing the Officer inside PoliceStation
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

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;
}

