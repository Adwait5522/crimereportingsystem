package com.sunbeam.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "adminlogin")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AdminLogin extends BaseEntity {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long loginId;

	    @OneToOne
	    @JoinColumn(name = "admin_id")
	    private Admin admin;

	    @Column(nullable = false)
	    private String password;
	
}
