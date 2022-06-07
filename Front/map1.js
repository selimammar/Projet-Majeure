
var url = "http://vps.cpe-sn.fr:8081"
var teamuuid = "eda70af1-4c45-4f0a-abb1-99bf8f6b8385"; 
var facilityID=173;

const data = {
    "crewMember": 0,
    "facilityRefID": 0,
    "fuel": 0,
    "id": 0,
    "lat": 0,
    "liquidQuantity": 0,
    "liquidType": "ALL",
    "lon": 0,
    "type": "CAR"
};

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

// var intervalTimer = setInterval(UpdateVehicles, 30000);
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

function AddVehicle(form){

    data.crewMember     =parseInt(form.crewMember.value);
    data.facilityRefID  =parseInt(form.facilityRefID.value);
    data.fuel           =parseInt(form.fuel.value);
    data.id             =parseInt(form.id.value);
    data.lat            =parseFloat(form.lat.value);
    data.liquidQuantity =parseInt(form.liquidQuantity.value);
    data.liquidType     =form.liquidType.value;
    data.lon            =parseFloat(form.lon.value);
    data.type           =form.type.value;
    console.log("vehicle to add :", data)
    // verifier pas vide
    ok = true;
    Object.values(data).every(
        element => {
            if(element == "" || (isNaN(element)&& typeof element != 'string')){
                alert("content empty"); 
                ok = false;
                return false;
            }
            return true;
        } 
    );
    if(!ok){return;}

    fetch (url+'/vehicle/'+teamuuid, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data),
        
    })
    .then(response => response.json())
    .then(data => {
        console.log('Added:', data);
    })
    .catch(error => console.error('Error:', error));
}

function  DelAllVehicle(){
    fetch (url+'/vehicle/'+teamuuid, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
          },
    })
    .then (response => console.log('DeletedAll:', response.ok))
    .catch((error) => {
        console.error('Error:', error);
    });
}

function EditVehicle(form){

    var editId = parseInt(form.editId.value);

    data.crewMember     =parseInt(form.crewMember.value);
    data.facilityRefID  =parseInt(form.facilityRefID.value);
    data.fuel           =parseInt(form.fuel.value);
    data.id             =parseInt(form.id.value);
    data.lat            =parseFloat(form.lat.value);
    data.liquidQuantity =parseInt(form.liquidQuantity.value);
    data.liquidType     =form.liquidType.value;
    data.lon            =parseFloat(form.lon.value);
    data.type           =form.type.value;

    // verifier pas vide
    ok = true;
    console.log("data before verify empty :", Object.values(data));
    Object.values(data).every(
        element => {
            console.log(element);
            if(element === "" || (isNaN(element)&& typeof element != 'string')){
                alert("content empty"); 
                ok = false;
                return false;
            }
            return true;
        } 
    );
    if(!ok){return;}

    console.log("ID of vehicle to edit :", editId);
    console.log("to translate to :", data)

    fetch (url+'/vehicle/'+teamuuid+'/'+editId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data),
        
    })
    .then(response => response.json())
    .then(data => {
        console.log('Edited: ', data);
    })
    .catch(error => console.error('Error:', error));

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


