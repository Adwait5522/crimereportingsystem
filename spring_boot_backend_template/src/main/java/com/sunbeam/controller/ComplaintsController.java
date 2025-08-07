package com.sunbeam.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.ComplaintReqDTO;
import com.sunbeam.dto.ComplaintRespDTO;
import com.sunbeam.dto.PriorityUpdateDTO;
import com.sunbeam.dto.StatusUpdateDTO;
import com.sunbeam.service.ComplaintsService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/complaints")
@AllArgsConstructor
public class ComplaintsController {

    private final ComplaintsService complaintsService;

//    @PutMapping("/{id}/status")
//    public ResponseEntity<?> updateStatus(@PathVariable Integer id, @RequestBody StatusUpdateDTO dto) {
//        try {
//            String msg = complaintsService.updateStatus(id, dto.getStatus());
//            return ResponseEntity.ok(new ApiResponse(msg));
//        } catch (ResourceNotFoundException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
//        }
//    }
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllComplaints() {
        try {
            List<ComplaintRespDTO> complaints = complaintsService.getComplaints();
            return ResponseEntity.ok(complaints);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
        }
    }

    
    @PutMapping("/{id}/priority")
    public ResponseEntity<?> updatePriority(@PathVariable Long id, @RequestBody PriorityUpdateDTO dto) {
        try {
            String msg = complaintsService.updatePriority(id, dto.getPriority());
            return ResponseEntity.ok(new ApiResponse(msg));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body(new ApiResponse(e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(new ApiResponse("Invalid priority value. Use LOW, MEDIUM, or HIGH."));
        }
    }
    
    @GetMapping("/station/{id}")
    public ResponseEntity<?> getComplaintsByStation(@PathVariable Long id) {
        List<ComplaintRespDTO> list = complaintsService.getComplaintsByPoliceStationId(id);
        return ResponseEntity.ok(list);
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> registerComplaint(@RequestBody ComplaintReqDTO dto) {
        String msg = complaintsService.registerComplaint(dto);
        return ResponseEntity.ok(new ApiResponse(msg));
    }
    
    @DeleteMapping("/{complaint_id}")
	public ResponseEntity<?> deleteComplaints(@PathVariable Long complaint_id)
	{
		System.out.println("in delete "+complaint_id);
		return ResponseEntity.ok(complaintsService.deleteCompliant(complaint_id));
	}
}
