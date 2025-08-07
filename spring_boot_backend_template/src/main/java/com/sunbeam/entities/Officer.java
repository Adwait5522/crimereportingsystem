package com.sunbeam.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Officer extends BaseEntity {


    @Id
    private Long officerId;

    @Column(nullable = false, length = 255)
    private String officerName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OfficerStatus activeStatus;

    @ManyToOne
    @JoinColumn(name = "designation_id", referencedColumnName = "designationId")
    private Designation designation;

    @ManyToOne
    @JoinColumn(name = "police_station_id", referencedColumnName = "policeStationId")
    private PoliceStation policeStation;
}
