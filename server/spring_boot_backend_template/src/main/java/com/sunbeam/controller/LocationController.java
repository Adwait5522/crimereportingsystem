//package com.sunbeam.controller;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.client.RestTemplate;
//
//@RestController
//@RequestMapping("/api/location")
//public class LocationController {
//
//    @GetMapping("/search")
//    public ResponseEntity<String> searchLocation(@RequestParam String postalcode) {
//        String url = "https://nominatim.openstreetmap.org/search?postalcode="+postalcode+"&country=India&format=json&limit=1";
//        
//        System.out.println(url);
//
//        RestTemplate restTemplate = new RestTemplate();
//        String result = restTemplate.getForObject(url, String.class);
//
//        return ResponseEntity.ok(result);
//    }
//}

package com.sunbeam.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/location")
public class LocationController {

    @GetMapping("/search")
    public ResponseEntity<String> searchLocation(@RequestParam String postalcode) {
        String url = "https://nominatim.openstreetmap.org/search?postalcode=440025&country=India&format=json&limit=1";

        System.out.println("Requesting URL: " + url);

        RestTemplate restTemplate = new RestTemplate();

        // Nominatim requires User-Agent header (see https://operations.osmfoundation.org/policies/nominatim/)
        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent", "your-app-name/1.0 (your-email@example.com)");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            return ResponseEntity.ok(response.getBody());
        } catch (RestClientException e) {
            e.printStackTrace();
            // Return a 503 Service Unavailable or 500 error with message
            return ResponseEntity.status(503).body("{\"error\":\"Failed to connect to location service\"}");
        }
    }
}

