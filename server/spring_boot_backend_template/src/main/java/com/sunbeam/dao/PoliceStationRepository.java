package com.sunbeam.dao;

import com.sunbeam.service.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.sunbeam.entities.PoliceStation;
import com.sunbeam.projection.PoliceStationComplaintStats;

import java.util.List;

@Repository
public interface PoliceStationRepository extends CrudRepository<PoliceStation, Long> {

    @Query(value = """
        SELECT 
            ps.police_station_id AS policeStationId,
            ps.police_station_name AS policeStationName,
            ps.police_station_pincode AS policeStationPincode,
            o.officer_name AS inchargeName,
            SUM(CASE WHEN c.status = 'Resolved' THEN 1 ELSE 0 END) AS resolvedCount,
            SUM(CASE WHEN c.status != 'Resolved' THEN 1 ELSE 0 END) AS unresolvedCount
        FROM 
            police_station ps
        LEFT JOIN 
            officer o ON ps.station_head_id = o.officer_id
        LEFT JOIN 
            complaints c ON ps.police_station_id = c.police_station_id
        GROUP BY 
            ps.police_station_id, ps.police_station_name, o.officer_name
        """, nativeQuery = true)
    List<PoliceStationComplaintStats> fetchComplaintStatsByStation();
}
