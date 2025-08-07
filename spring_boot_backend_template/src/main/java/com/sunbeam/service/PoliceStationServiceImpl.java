package com.sunbeam.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.dto.AddPoliceStationDTO;
import com.sunbeam.dto.DesignationDTO;
import com.sunbeam.dto.NearestPoliceStationResponseDTO;
import com.sunbeam.dto.PoliceStationDTO;
import com.sunbeam.dto.PoliceStationUpdateDTO;
import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.DesignationDao;
import com.sunbeam.dao.OfficerDao;
import com.sunbeam.dao.PoliceStationDao;
import com.sunbeam.entities.Designation;
import com.sunbeam.entities.Officer;
import com.sunbeam.entities.PoliceStation;
//import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.exception.CustomExceptionClass;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class PoliceStationServiceImpl implements PoliceStationService{

    private final ModelMapper modelMapper;
	
	private final PoliceStationDao policeStationDao;
	
	private final OfficerDao officerDao;
	
	@Override
	public List<PoliceStationDTO> getAllPoliceStations() {
	    List<PoliceStation> stations = policeStationDao.findAll();
	    return stations.stream()
	            .map(this::convertToDTO)
	            .collect(Collectors.toList());
	}

	@Override
	public List<PoliceStationDTO> getAllActivePoliceStation() {
	    List<PoliceStation> stations = policeStationDao.findByStatus(true);
	    return stations.stream()
	            .map(this::convertToDTO)
	            .collect(Collectors.toList());
	}

	private PoliceStationDTO convertToDTO(PoliceStation ps) {
	    PoliceStationDTO dto = modelMapper.map(ps, PoliceStationDTO.class);
	    
	    // manually map nested property: stationHeadId
	    if (ps.getStationHead() != null) {
	        dto.setStationHeadId(ps.getStationHead().getOfficerId());
	    } else {
	        dto.setStationHeadId(null); // or null, depending on your preference
	    }

	    return dto;
	}

	

//	@Override
//	public List<PoliceStationDTO> getAllPoliceStations() {
//		
//		return policeStationDao.findAll();
//	}
//
//	@Override
//	public List<PoliceStationDTO> getAllActivePoliceStation() {
//		// TODO Auto-generated method stub
//		return policeStationDao.findByStatus(true);
//	}

//	@Override
//	public String addPoliceStation(AddPoliceStationDTO addPoliceStationDTO) {
//		PoliceStation policeStation = modelMapper.map(addPoliceStationDTO, PoliceStation.class);
//		Officer officer = officerDao.findById(addPoliceStationDTO.getStationHeadId()).orElseThrow(()->new CustomExceptionClass("Cannot add station"));
//		policeStation.setStationHead(officer);
//		policeStationDao.save(policeStation);
//		return "Added Successfully";
//	}
	
//	@Override
//	public String addPoliceStation(AddPoliceStationDTO addPoliceStationDTO) {
//	    // Step 1: Map DTO to Entity
//	    PoliceStation policeStation = modelMapper.map(addPoliceStationDTO, PoliceStation.class);
//
//	    // Step 2: Get Officer by ID
//	    Officer officer = officerDao.findById(addPoliceStationDTO.getStationHeadId())
//	            .orElseThrow(() -> new CustomExceptionClass("Cannot add station"));
//
//	    // Step 3: Set Officer as Station Head (Bidirectional link - Optional)
//	    policeStation.setStationHead(officer);
//
//	    // Step 4: Save Police Station first to get its ID
//	    PoliceStation savedStation = policeStationDao.save(policeStation);
//
//	    // Step 5: Set saved station to the officer's policeStation field
//	    officer.setPoliceStation(savedStation);
//
//	    // Step 6: Save the updated officer
//	    officerDao.save(officer);
//
//	    return "Added Successfully";
//	}


	@Override
	public String deletePoliceStation(Long id) {
		PoliceStation policeStation = policeStationDao.findById(id).orElseThrow(()->new CustomExceptionClass("Cannot delete station"));
		policeStation.setStatus(false);
		return "Deleted Successfully";
	}

	@Override
	public String updatePoliceStation(Long id, PoliceStationUpdateDTO dto) {
		PoliceStation station = policeStationDao.findById(id)
		        .orElseThrow(() -> new ResourceNotFoundException("Police Station not found with ID: " + id));

		    if (!station.isStatus()) {
		        throw new RuntimeException("Police Station is INACTIVE.");
		    }

		    if (dto.getPoliceStationName() != null) station.setPoliceStationName(dto.getPoliceStationName());
		    if (dto.getPoliceStationPincode() != null) station.setPoliceStationPincode(dto.getPoliceStationPincode());
		    if (dto.getNumberOfOfficers() != null) station.setNumberOfOfficers(dto.getNumberOfOfficers());
		    if (dto.getMapsLink() != null) station.setMapsLink(dto.getMapsLink());
		    if (dto.getLatitude() != null) station.setLatitude(dto.getLatitude());
		    if (dto.getLongitude() != null) station.setLongitude(dto.getLongitude());

		    if (dto.getStationHeadId() != null) {
		        Officer head = officerDao.findById(dto.getStationHeadId())
		            .orElseThrow(() -> new ResourceNotFoundException("Officer not found with ID: " + dto.getStationHeadId()));
		        station.setStationHead(head);
		    }

		    policeStationDao.save(station);
		    return "Updated the Police Station successfully!!";
	}
	
	
	 @Override
	    public String createPoliceStation(PoliceStationDTO dto) {
	        // Check if the officer is already assigned as a station head
	        if (policeStationDao.existsByStationHeadOfficerId(dto.getStationHeadId())) {
	            throw new IllegalArgumentException("This officer is already assigned as a station head.");
	        }

	        // Fetch officer by ID
	        Officer head = officerDao.findById(dto.getStationHeadId())
	            .orElseThrow(() -> new ResourceNotFoundException("Officer not found"));

	        // Create police station entity
	        PoliceStation ps = new PoliceStation();
	        ps.setPoliceStationName(dto.getPoliceStationName());
	        ps.setPoliceStationPincode(dto.getPoliceStationPincode());
	        ps.setNumberOfOfficers(dto.getNumberOfOfficers());
//	        ps.setMapsLink(dto.getMapsLink());
	        ps.setStationHead(head);
	        ps.setStatus(true);



	        ps.setLatitude(dto.getLatitude());
	        ps.setLongitude(dto.getLongitude());

	        
	        // Save the entity
	        policeStationDao.save(ps);
	        return "Police station created successfully!";
	    }

	    // Method to check if station head is already assigned
	    @Override
	    public boolean existsByStationHeadOfficerId(Long officerId) {
	        return policeStationDao.existsByStationHeadOfficerId(officerId);
	    }

	    // Helper method to extract coordinates from a Google Maps link
	    private double[] extractLatLongFromLink(String mapsLink) {
	        try {
	            String[] parts = mapsLink.split("\\?q=");
	            if (parts.length > 1) {
	                String[] coordinates = parts[1].split(",");
	                if (coordinates.length == 2) {
	                    double lat = Double.parseDouble(coordinates[0].trim());
	                    double lon = Double.parseDouble(coordinates[1].trim());
	                    return new double[]{lat, lon};
	                }
	            }
	        } catch (Exception e) {
	            throw new IllegalArgumentException("Invalid Google Maps link format.");
	        }
	        throw new IllegalArgumentException("Could not extract latitude/longitude.");
	    }
	    
	    

	    
	    @Override
	    public NearestPoliceStationResponseDTO findNearestPoliceStation(double userLat, double userLon) {
	        List<PoliceStation> allStations = policeStationDao.findAll();

	        PoliceStation nearest = null;
	        double minDistance = Double.MAX_VALUE;

	        for (PoliceStation ps : allStations) {
	            if (ps.isStatus()) {
	                double distance = calculateHaversineDistance(userLat, userLon, ps.getLatitude(), ps.getLongitude());
	                if (distance < minDistance) {
	                    minDistance = distance;
	                    nearest = ps;
	                }
	            }
	        }

	        if (nearest == null) {
	            throw new ResourceNotFoundException("No active police station found.");
	        }

	        return new NearestPoliceStationResponseDTO(
	                nearest.getPoliceStationId(),
	                nearest.getPoliceStationName(),
	                "Pincode: " + nearest.getPoliceStationPincode(),
	                nearest.getLatitude(),
	                nearest.getLongitude(),
	                minDistance
	        );
	    }

	    // Haversine formula
	    private double calculateHaversineDistance(double lat1, double lon1, double lat2, double lon2) {
	        final int EARTH_RADIUS = 6371; // in KM

	        double latDistance = Math.toRadians(lat2 - lat1);
	        double lonDistance = Math.toRadians(lon2 - lon1);

	        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
	                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
	                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);

	        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	        return EARTH_RADIUS * c;
	    }


	

}
