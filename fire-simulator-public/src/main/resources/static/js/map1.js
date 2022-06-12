var url = "http://vps.cpe-sn.fr:8081"
var teamuuid = "eda70af1-4c45-4f0a-abb1-99bf8f6b8385"; 
var facilityID=173;

// ------------------- Avant avoir créer l'app springboot, on a fait tous les calculs en front pour gagner des pts -------------------------------

// Nous avons commenté l'appelation des fct qui gere les vehicules prsq on les gere dans le back (proj springboot) mnt

// explication des fcts qu'on a commenté :

// on crée la var glob ourVehicules (contient nos vehicles)
// après on appele la dct UpdateVehicles qui se relance chaque 45s
// UpdateVehicles recupere nos vehicles et tout les fires 
// et affecte à chaque vehicle une fire récupéré
// et demande au vehicule d'aller au fire
// et c tout




// var ourVehicles=[];
// GetOurVehicle(facilityID);
// console.log("ourVehicles :",ourVehicles);


async function GetOurVehicle(facilityID){
    var allVehicle = await GetAllVehicle()
    allVehicle.forEach(vehicle => {
        if (vehicle.facilityRefID== 173){
            vehicle.fireID=0;
            ourVehicles.push(vehicle);
        }
    });
}


// var intervalTimer = setInterval(UpdateVehicles, 45000);
// UpdateVehicles();


async function UpdateVehicles(){

    var fires = await GetAllFire();
    console.log(' got fires : ', typeof fires);
    console.log("ourVehicles :", typeof ourVehicles);
    var i=0;
    ourVehicles.forEach(vehicle =>{
        console.log('this fire :', fires[i]);
        console.log('this vehicle :', vehicle);
        var myfireID = fires[i].id;
        vehicle.fireID = myfireID;
        console.log('go to : fire : ', myfireID, ', vehicle : ', vehicle.id);
        GoToFire(myfireID,vehicle.id);
        i++;
    })
}

async function GetAllFire(){
    return fetch (url+'/fire')
    .then(response => response.json())
    .then(fires => {
        console.log('Success GetAllFire :', fires);
        return fires
    })
    .catch(error => console.error('Error:', error));
}

async function GetAllVehicle(){
    return fetch(url+'/vehicle')
    .then (response =>  response.json())
    .then(response => {   
        return response;
        })
    .catch(error => console.error("Error :",error))
}


async function GoToFire(fireID, vehicleID){

    var data = await GetVehicleByID(vehicleID);
    var fireData = await GetFireByID(fireID);

    if (typeof fireData === 'undefined'){ 
        alert('fire is already extinct');
        return; 
    }
    
    console.log('fireData :',fireData);
    console.log('vehicle data :', data);
    data.lon = fireData.lon;
    data.lat = fireData.lat;
    console.log('vehicle put data :', data);

    fetch (url+'/vehicle/'+teamuuid+'/'+vehicleID, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data),
        
    })
    .then(response => response.json())
    .then(data => {
        console.log('Vehicle : ', vehicleID, ', Went To Fire', fireID);
    })
    .catch(error => console.error('Error:', error));

}

async function GetVehicleByID(vehicleID){

    return fetch (url+'/vehicle/'+vehicleID)
    .then(response => response.json())
    .then(data => {
        console.log('Success GetVehicle : id=',vehicleID,' : ', data);
        return data;
    })
    .catch(error => console.error('Error:', error));
}

async function GetFireByID(fireID){
    return fetch (url+'/fire'+'/'+fireID)
    .then(response => response.json())
    .then(data => {
        console.log('Success GetFire :', data);
        return data;
    })
    .catch(error => console.error('Error:', error));

}


// GoToFire(702,264);
// GoToFire(795,841);
// GoToFire(835,842);


