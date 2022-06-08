package com.project.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.project.model.dto.FireDto;
import com.project.model.dto.VehicleDTO;

@Service
public class ClientRestService {
	String url = "http://vps.cpe-sn.fr:8081/vehicle";
	String url_fire = "http://vps.cpe-sn.fr:8081/fire";
	
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
    
    public FireDto[] getAllFire() {
        return this.restTemplate.getForObject(url_fire,FireDto[].class);
    }
    
    public List<FireDto> toList(FireDto[] tab){
    	List<FireDto> list = new ArrayList<>();
    	for(FireDto t : tab) {
    		list.add(t);
    	}
    	return list;
    	
    }
    
    public List<VehicleDTO> toListV(VehicleDTO[] tab){
    	List<VehicleDTO> list = new ArrayList<>();
    	for(VehicleDTO v : tab) {
    		list.add(v);
    	}
    	return list;
    	
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

