package com.project.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import com.project.model.dto.FireDto;
import com.project.model.dto.VehicleDTO;

public class Deplacement implements Runnable {
	private boolean isEnd = false;
	private VehicleDTO vehicle;
	private FireDto fire = null;
	private boolean enMission = true;
	private boolean aLaMaison = false;
	private final double lon_m = 4.8;
	private final double lat_m = 45.7;
	private final ClientRestService client;
	private final String teamuuid = "eda70af1-4c45-4f0a-abb1-99bf8f6b8385"; 
	
	public Deplacement(VehicleDTO idVehicle,ClientRestService client) {
		this.vehicle = idVehicle;
		this.client=client;
	}
	
	@Override
	public void run() {
		this.fire = assignation();
		while (!this.isEnd) {
			try {
				Thread.sleep(1000);
				while(!aLaMaison) {
					retour();
					while(enMission) {
						mouvement();
						// System.out.println(vehicle.getLat()+"   " +vehicle.getLon());
					}
				}
			}
			catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		
		System.out.println("Runnable DisplayRunnable ends.... ");
	}

	public void mouvement() {
		double d =  Math.sqrt((vehicle.getLat()-fire.getLat())*(vehicle.getLat()-fire.getLat())+(vehicle.getLon()-fire.getLon())*(vehicle.getLon()-fire.getLon()));
		double x =  (vehicle.getLat()+(fire.getLat()-vehicle.getLat()/d));
		double y = (vehicle.getLon()+(fire.getLon()-vehicle.getLon()/d));
		vehicle.setLat(x);
		vehicle.setLon(y);
		client.putVehicle(teamuuid, vehicle);
		if (this.fire.getRange()==0) {
			this.enMission=false;
		}
		// c'est les nouvelles coordonnes pas un delta a ajoutter
	}
	
	public void retour() {
		double d = Math.sqrt((vehicle.getLat()-lat_m)*(vehicle.getLat()-lat_m)+(vehicle.getLon()-lon_m)*(vehicle.getLon()-lon_m));
		double x = (vehicle.getLat()+(lat_m-vehicle.getLat()/d));
		double y = (vehicle.getLon()+(lon_m-vehicle.getLon()/d));
		vehicle.setLat(x);
		vehicle.setLon(y);
		client.putVehicle(teamuuid, vehicle);
		if (d<1) {
			this.aLaMaison=true;
		}
		
	}
	
	public void stop() {
		this.isEnd = true;
	}
	
	public FireDto assignation() {
		
		FireDto[] fire1 = client.getAllFire();
		ArrayList<FireDto> lfire= (ArrayList<FireDto>) client.toList(fire1);
		Map<FireDto,Integer> lmoyenne = new HashMap<FireDto,Integer>();//init map de moyenne
		
		for (int i=0; i<lfire.size(); i++){//parcourir les feux
			if (checkFire(lfire.get(i))){//if checkFire(idFire)
				int moyenne = (distance(lfire,lfire.get(i))+agent(vehicle,lfire.get(i))+personne()+capacite()+consommation())/5;//moyenne distance(vehicle, fire) & agent(vehicle, fire) & personne(vehicle)
				if (moyenne>15) {
					lmoyenne.put(lfire.get(i), moyenne);//ajout dans la liste de moyennes
				}
			}
		}
					
				
		FireDto ff = null;
		try {
			int maxValueInMap = (Collections.max(lmoyenne.values()));//recuperation de la plus grande moyenne
			for(Entry<FireDto, Integer> entry : lmoyenne.entrySet()) {
				if (entry.getValue()==maxValueInMap) {
					ff = entry.getKey();
				}
			}
		} 
		catch (Exception NoSuchElementException) {
		} 
		
	return ff;	
	}
	
	private boolean checkFire(FireDto fire1) {
		boolean ret = true;
		int compteur = 0;
		
		VehicleDTO[] vehicle = client.getAllVehicles();
		ArrayList<VehicleDTO> lvehicle = (ArrayList<VehicleDTO>) client.toListV(vehicle);
		
		for (int j=0; j<lvehicle.size(); j++){//parcourir les vehicle
			VehicleDTO camion = lvehicle.get(j);
			int d = (int) Math.sqrt((camion.getLat()-fire1.getLat())*(camion.getLat()-fire1.getLat())+(camion.getLon()-fire1.getLon())*(camion.getLon()-fire1.getLon()));
			if (d< 50) { 
				compteur+=1;
			}
		}
		if (compteur<5) {
			ret = false;
		}
		return ret;
	}
	
	private Integer distance(ArrayList<FireDto> lfire,FireDto fire3) {
		int distancemax = 0;
		for (int j=0; j<lfire.size(); j++){//parcourir les fire
			FireDto fire2 = lfire.get(j);
			int d = (int) Math.sqrt((vehicle.getLat()-fire2.getLat())*(vehicle.getLat()-fire2.getLat())+(vehicle.getLon()-fire2.getLon())*(vehicle.getLon()-fire2.getLon()));
			if(d>distancemax) {
				distancemax=d;
			}
		}
		return (int) (1-(Math.sqrt((vehicle.getLat()-fire3.getLat())*(vehicle.getLat()-fire3.getLat())+(vehicle.getLon()-fire3.getLon())*(vehicle.getLon()-fire3.getLon()))/distancemax)*100);
	}
	
	private Integer agent(VehicleDTO vehicle, FireDto fire) {
		return 100;
	}
	
	private Integer personne() {
		return (int) (vehicle.getType().getEfficiency()*10);
	}
	
	private Integer capacite() {
		return 100;
	}
	
	private Integer consommation() {
		return 100;
	}

}


