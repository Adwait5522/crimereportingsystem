package com.sunbeam.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedback_id", unique = true, nullable = false)
    private Long feedbackId;

    @ManyToOne
    @JoinColumn(name = "complaint_id", nullable = false)
    private Complaints complaint;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "rating", nullable = false)
    private int rating; // e.g., 1 to 5 stars

    @Column(name = "comments", columnDefinition = "TEXT")
    private String comments;
    
    @Column(name="status",nullable = false)
    private boolean status=false;
    

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
