package com.sunbeam.projection;

public interface PoliceStationComplaintStats {
    Long getPoliceStationId();
    String getPoliceStationPincode();
    String getPoliceStationName();
    String getInchargeName();
    Long getResolvedCount();
    Long getUnresolvedCount();
}
