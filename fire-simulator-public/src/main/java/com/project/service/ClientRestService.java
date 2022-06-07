package com.project.service;

import org.springframework.beans.BeanUtils;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import com.project.model.dto.VehicleDTO;
import com.project.model.Vehicle;

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

    
    public VehicleDTO postVehicle(String teamuuid, VehicleDTO vehicleDTO) {
    	
    	HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
    	headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
    	//ObjectMapper oMapper = new ObjectMapper();
    	//Map<String, Object> map = oMapper.convertValue(vehicleDTO, Map.class);
    	
    	HttpEntity<VehicleDTO> entity = new HttpEntity<>(vehicleDTO, headers);
    	
    	// send POST request
    	ResponseEntity<VehicleDTO> response = restTemplate.postForEntity(url+'/'+teamuuid, entity, VehicleDTO.class);

//    	// check response
    	if (response.getStatusCode() == HttpStatus.CREATED) {
    	    System.out.println("Request Successful");
    	    System.out.println(response.getBody());
        	return response.getBody();
    	} else {
    	    System.out.println("Request Failed");
    	    System.out.println(response.getStatusCode());
    	    return null;
    	}

    	
    }
    
    public void putVehicle(String teamuuid, VehicleDTO vehicleDTO) {
    	
    	HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
    	headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

    	
    	HttpEntity<VehicleDTO> entity = new HttpEntity<>(vehicleDTO, headers);
    	
    	// send POST request
    	this.restTemplate.put(url+'/'+teamuuid+'/'+vehicleDTO.getId(), entity);
    	
    }
    

}
