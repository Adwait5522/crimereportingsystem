package com.sunbeam.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

	@Entity
	@Table(name="Complaints")
	@Getter
	@Setter
	@NoArgsConstructor
public class Complaints extends BaseEntity{
		@Id
		@GeneratedValue(strategy=GenerationType.IDENTITY)
		@Column(name="complaint_id")
		private Integer complaint_id;
		
		
		@NotNull
		@ManyToOne(fetch=FetchType.LAZY)
		@JoinColumn(name="user_id",nullable=false)
		private User user;
		
		@NotBlank
		@Column(name="complaint_type",nullable=false,length=100)
		private String complaintType;
		
		@NotBlank
		@Column(name="description",nullable=false,columnDefinition = "TEXT")
		private String description;
		
		@Convert(converter = EvidenceFilesSimpleConverter.class)
		@Column(name = "evidence_files", columnDefinition = "TEXT")
		private List<String> evidenceFiles;
		
		@NotBlank
		@Column(name="location_pincode",nullable=false,length=10)
		private String locationPincode;
		
		@NotBlank
	    @Column(name = "city", nullable = false, length = 30)
	    private String city;

	    @NotBlank
	    @Column(name = "state", nullable = false, length = 100)
	    private String state;

	    @NotNull
	    @Enumerated(EnumType.STRING)
	    @Column(name = "status", nullable = false, length = 20)
	    private Status status;
	    
	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "officer_id")
	    private Officer officer;


	    @NotNull
	    @Enumerated(EnumType.STRING)
	    @Column(name = "priority", nullable = false, length = 20)
	    private Priority priority = Priority.MEDIUM;
	    
	    @NotNull
	    @ManyToOne(fetch = FetchType.LAZY, optional = false)
	    @JoinColumn(name = "police_station_id", nullable = false)
	    private PoliceStation policeStationId;

		public Complaints(@NotNull User user, @NotBlank String complaintType, @NotBlank String description,
				List<String> evidenceFiles, @NotBlank String locationPincode, @NotBlank String city, @NotBlank String state,
				Status status, Officer officer, Priority priority, PoliceStation policeStationId) {
			super();
			this.user = user;
			this.complaintType = complaintType;
			this.description = description;
			this.evidenceFiles = evidenceFiles;
			this.locationPincode = locationPincode;
			this.city = city;
			this.state = state;
			this.status = status;
			this.officer = officer;
			this.priority = priority;
			this.policeStationId = policeStationId;
		}
		
		public Status getStatus() {
		    return status;
		}

		public void setStatus(Status status) {
		    this.status = status;
		}
	    
	    
}

