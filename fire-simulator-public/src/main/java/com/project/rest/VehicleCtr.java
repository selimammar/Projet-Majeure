package com.project.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


import com.project.model.dto.VehicleDTO;
import com.project.service.ClientRestService;


@RestController
public class VehicleCtr{
	
	@Autowired
	ClientRestService CRService;
	
	@CrossOrigin(origins = "hhtp://127.0.0.1:5500")
	@GetMapping("/vehicle")
	public VehicleDTO[] getAllVehicles() {
		return this.CRService.getAllVehicles();
	}
	
	@CrossOrigin(origins = "hhtp://127.0.0.1:5500")
	@GetMapping("/vehicle/{id}")
	public VehicleDTO getVehicleByID(@PathVariable int id) {
		return this.CRService.getVehicleByID(id);
	}
	
	
	@CrossOrigin(origins = "hhtp://127.0.0.1:5500")
	@PostMapping("/vehicle/{teamuuid}")
	public VehicleDTO postVehicle(@PathVariable String teamuuid,@RequestBody VehicleDTO vehicleDTO) {
		return this.CRService.postVehicle(teamuuid, vehicleDTO);
	}
	
	@CrossOrigin(origins = "hhtp://127.0.0.1:5500")
	@PutMapping("/vehicle/{teamuuid}/{id}")
	public void putVehicle(@PathVariable String teamuuid,@RequestBody VehicleDTO vehicleDTO) {
		this.CRService.putVehicle(teamuuid, vehicleDTO);
	}
	
	@CrossOrigin(origins = "hhtp://127.0.0.1:5500")
	@DeleteMapping("/vehicle/{teamuuid}")
	public void delAllVehicles(@PathVariable String teamuuid) {
		this.CRService.delAllVehicles(teamuuid);
	}
	
	@CrossOrigin(origins = "hhtp://127.0.0.1:5500")
	@DeleteMapping("/vehicle/{teamuuid}/{id}")
	public void delVehicle(@PathVariable String teamuuid, @PathVariable int id) {
		this.CRService.delVehicle(teamuuid, id);
	}

}