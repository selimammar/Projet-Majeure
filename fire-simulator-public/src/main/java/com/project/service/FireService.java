
package com.project.service;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.project.model.dto.FireDto;
import com.project.model.dto.VehicleDTO;

@Service
public class FireService {
	
	Deplacement dRunnable;
	private Thread displayThread;
	private final ClientRestService client;
	
	public FireService( ClientRestService client) {
		this.client=client;
		
		VehicleDTO[] vehicle = client.getAllVehicles();
		ArrayList<VehicleDTO> lvehicle = (ArrayList<VehicleDTO>) client.toListV(vehicle);

		for(VehicleDTO vehicle2 : lvehicle) {
			if (vehicle2.getFacilityRefID() ==173) {
				this.dRunnable=new Deplacement(vehicle2,this.client);
				displayThread=new Thread(dRunnable);
				displayThread.start();
			}
		}
		
	}
	
	

	public void stopDisplay() {
		//Call the user defined stop method of the runnable
		this.dRunnable.stop();
		try {
			//force the thread to stop
			this.displayThread.join(100);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
}
