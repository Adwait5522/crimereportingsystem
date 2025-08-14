package com.sunbeam.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Designation {

	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long designationId;

	    private String designationName;
	    
	    @Column(name="status")
	    private boolean status=true;
}
