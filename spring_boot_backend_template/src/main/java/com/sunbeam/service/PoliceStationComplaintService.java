package com.sunbeam.service;

import java.util.List;
import com.sunbeam.projection.PoliceStationComplaintStats;

public interface PoliceStationComplaintService {
    List<PoliceStationComplaintStats> getComplaintStatsByStation();
}
