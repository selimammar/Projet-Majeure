package com.project.service;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.project.model.dto.VehicleDTO;

@Service
public class ClientRestService {
	String url = "http://vps.cpe-sn.fr:8081/vehicle";
	
    private final RestTemplate restTemplate;

    public ClientRestService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public VehicleDTO getVehicleByID(int id) {
        return this.restTemplate.getForObject(url+"/"+id, VehicleDTO.class);
    }
    
    public VehicleDTO[] getAllVehicles() {
        return this.restTemplate.getForObject(url, VehicleDTO[].class);
    }
    
    // public VehicleDTO addVehicle(int teamuuid, VehicleDTO vehicle) {
		
    	
    // }

}
