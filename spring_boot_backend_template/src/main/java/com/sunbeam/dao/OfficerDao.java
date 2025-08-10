package com.sunbeam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sunbeam.entities.Officer;
import com.sunbeam.entities.PoliceStation;

@Repository
public interface OfficerDao extends JpaRepository<Officer, Long> {
    List<Officer> findByDesignationDesignationNameIgnoreCase(String designationName);
    List<Officer> findByPoliceStation(PoliceStation station);
//    List<Officer> findByPoliceStationIsNull();
//    List<Officer> findByPoliceStationIsNullAndDesignationDesignationId(Long designationId);
    List<Officer> findByPoliceStationIsNullAndDesignationDesignationName(String designationName);


}