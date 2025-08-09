package com.sunbeam.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/location")
public class LocationController {

    @GetMapping("/search")
    public ResponseEntity<String> searchLocation(@RequestParam String postalcode) {
        String url = "https://nominatim.openstreetmap.org/search?postalcode=" + postalcode +
                     "&country=India&format=json&limit=1";

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);

        return ResponseEntity.ok(result);
    }
}
