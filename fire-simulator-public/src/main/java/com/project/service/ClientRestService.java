package com.project.service;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.BeanUtils;

import com.project.model.dto.VehicleDTO;
import com.project.model.Vehicle;

@Service
public class ClientRestService {
	String url = "http://vps.cpe-sn.fr:8081/vehicle";
	
//	HttpHeaders headers = new HttpHeaders();
//	headers.setContentType(MediaType.APPLICATION_JSON);
	
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
    
	private VehicleDTO vehicleToVehicleDTO(Vehicle vehicle){
		VehicleDTO vehicleDTO = new VehicleDTO();
		BeanUtils.copyProperties(vehicle, vehicleDTO);
		return vehicleDTO;
	}
	
	private Vehicle VehicleDTOTOVehicle(VehicleDTO vehicleDTO){
		Vehicle vehicle = new Vehicle();
		//Card card = new Card(cardDTO.getName(),cardDTO.getDescription(),cardDTO.getImgUrl(),cardDTO.getFamily(),cardDTO.getAffinity(),cardDTO.getHp(),cardDTO.getEnergy(),cardDTO.getAttack(),cardDTO.getDefense(),cardDTO.getPlayerId(),cardDTO.getPrice(),cardDTO.getIsToSell());
		BeanUtils.copyProperties(vehicleDTO, vehicle);
		return vehicle;
	}
	
    
//    public VehicleDTO addVehicle(String teamuuid, VehicleDTO vehicleDTO) {
//    	//Vehicle vehiclecreate =  this.VehicleDTOTOVehicle(vehicleDTO);
//    	//return this.vehicleToVehicleDTO(vehiclecreate);
//    	return 
//    }

}
