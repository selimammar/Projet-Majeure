
package com.project.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.tomcat.jni.Time;
import org.springframework.stereotype.Service;

import com.project.model.dto.FireDto;
import com.project.model.dto.VehicleDTO;

@Service
public class FireService {
	
	Deplacement dRunnable;
	private Thread displayThread;
	private final ClientRestService client;
	public static Map<VehicleDTO,Integer> lmission = new HashMap<VehicleDTO,Integer>();
	private boolean isEnd =false;
	
	public FireService( ClientRestService client) throws InterruptedException {
		this.client=client;
		
		VehicleDTO[] vehicle = client.getAllVehicles();
		ArrayList<VehicleDTO> lvehicle = (ArrayList<VehicleDTO>) client.toListV(vehicle);
		for(VehicleDTO vehicle1 : lvehicle) {
			if (vehicle1.getFacilityRefID() ==664789) {
				lmission.put(vehicle1, 0);
			}
		}
		
		while(!(isEnd)) {
			try {
				for(Entry<VehicleDTO, Integer> entry : lmission.entrySet()) {
					if (entry.getValue()==0) {
						lmission.put(entry.getKey(), -1);
						this.dRunnable=new Deplacement(entry.getKey(),this.client);
						displayThread=new Thread(dRunnable);
						displayThread.start();
					}
				}
			} 
			catch (Exception NoSuchElementException) {
			} 
			Thread.sleep(45000);
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
