var map = L.map('map',{
    center: [39.73, -104.99],
    zoom: 10,
}).setView([45.732333858926715, 4.8260937761478795], 12);

var FacilityIcon = L.icon({
    iconUrl :  'caserne.png',
    iconSize : [50,50],
})

var FireIcon = L.icon({
    iconUrl :  'feu.png',
    iconSize : [40,60],
})

var VehicleIcon = L.icon({
    iconUrl :  'camion.png',
    iconSize : [50,30],
})

var VehicleIcon2 = L.icon({
    iconUrl :  'camion2.png',
    iconSize : [50,30],
})

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);http://vps.cpe-sn.fr:8081/facility

var url = "http://vps.cpe-sn.fr:8081"
var teamuuid = "eda70af1-4c45-4f0a-abb1-99bf8f6b8385"; 
fetch(url+'/facility')
    .then (response =>  response.json())
    .then(reponse => {
    reponse.forEach(facility => {
        var marker = L.marker([facility.lat, facility.lon],{icon: FacilityIcon}).addTo(map).bindPopup('Id = ' +facility.id +'<br>'+'Nom :' +facility.name)//.openPopup()
     } )    
});

fetch(url+'/fire')
.then (response =>  response.json())
.then(reponse => {
    reponse.forEach(fire => {
        tab(fire);
    })
});




lD_Metals = new L.layerGroup();
lA =new  L.layerGroup();
lB_Gasoline =new  L.layerGroup();
lB_Alcohol =new  L.layerGroup();
lB_Plastics =new  L.layerGroup();
lE_Electric =new  L.layerGroup();
lC_Flammable_Gases =new  L.layerGroup();

map.addLayer(lD_Metals);
map.addLayer(lA);
map.addLayer(lB_Gasoline);
map.addLayer(lB_Alcohol);
map.addLayer(lB_Plastics);
map.addLayer(lE_Electric);
map.addLayer(lC_Flammable_Gases);

let feu = [];

function tab(fire) {
    feu.push(fire);
    coucheA();
    coucheB_Alcohol();
    coucheB_Gasoline();
    coucheB_Plastics();
    coucheC_Flammable_Gases();
    coucheD_Metals();
    coucheE_Electric();
}



function box(){
    var A = document.querySelector('input[value="A"]');
    var B_Gasoline = document.querySelector('input[value="B_Gasoline"]');
    var B_Alcohol = document.querySelector('input[value="B_Alcohol"]');
    var B_Plastics = document.querySelector('input[value="B_Plastics"]');
    var C_Flammable_Gases = document.querySelector('input[value="C_Flammable_Gases"]');
    var D_Metals = document.querySelector('input[value="D_Metals"]');
    var E_Electric = document.querySelector('input[value="E_Electric"]');

    var bA = true;
    var bB_Gasoline= true;
    var bB_Alcohol= true;
    var bB_Plastics= true;
    var bC_Flammable_Gases= true;
    var bD_Metals= true;
    var bE_Electric= true;


    A.onchange = function() {
        if (bA){
            lA.clearLayers();
            bA = false;
        }
        else{
            coucheA();
            bA=true;
        }
        
    }
    B_Plastics.onchange = function(){
        if (bB_Plastics){
            lB_Plastics.clearLayers();
            bB_Plastics = false;
        }
        else{
            coucheB_Plastics();
            bB_Plastics=true;
        }
    }
    B_Gasoline.onchange = function(){
        if (bB_Gasoline){
            lB_Gasoline.clearLayers();
            bB_Gasoline = false;
        }
        else{
            coucheB_Gasoline();
            bB_Gasoline=true;
        }
    }
    B_Alcohol.onchange = function(){
        if (bB_Alcohol){
            lB_Alcohol.clearLayers();
            bB_Alcohol = false;
        }
        else{
            coucheB_Alcohol();
            bB_Alcohol=true;
        }
    }
    C_Flammable_Gases.onchange = function(){
        if (bC_Flammable_Gases){
            lC_Flammable_Gases.clearLayers();
            bC_Flammable_Gases = false;
        }
        else{
            coucheC_Flammable_Gases();
            bC_Flammable_Gases=true;
        }
    }
    D_Metals.onchange = function(){
        if (bD_Metals){
            lD_Metals.clearLayers();
            bD_Metals = false;
        }
        else{
            coucheD_Metals();
            bD_Metals=true;
        }
    }
    E_Electric.onchange = function(){
        if (bE_Electric){
            lE_Electric.clearLayers();
            bE_Electric = false;
        }
        else{
            coucheE_Electric();
            bE_Electric=true;
        }
    }
}
    
function coucheA(){
    feu.forEach(fire =>{
        if (fire.type == 'A'){
        var marker = L.marker([fire.lat, fire.lon],{icon : FireIcon}).addTo(lA).bindPopup('ID = ' + fire.id+'<br>'+'Type = ' +fire.type +'<br>'+'Intensite :' +fire.intensity+'<br>'+'Etendue :' +fire.range)
    }
    })}

function coucheD_Metals(){
    feu.forEach(fire =>{
    if (fire.type == 'D_Metals'){
        var marker = L.marker([fire.lat, fire.lon],{icon : FireIcon}).addTo(lD_Metals).bindPopup('ID = ' + fire.id+'<br>'+'Type = ' +fire.type +'<br>'+'Intensite :' +fire.intensity+'<br>'+'Etendue :' +fire.range)
    }
})}
    

function coucheB_Gasoline(){
    feu.forEach(fire =>{
        if (fire.type == 'B_Gasoline'){
        var marker = L.marker([fire.lat, fire.lon],{icon : FireIcon}).addTo(lB_Gasoline).bindPopup('ID = ' + fire.id+'<br>'+'Type = ' +fire.type +'<br>'+'Intensite :' +fire.intensity+'<br>'+'Etendue :' +fire.range)
    }})}

function coucheB_Alcohol(){
    feu.forEach(fire =>{
        if (fire.type == 'B_Alcohol'){
        var marker = L.marker([fire.lat, fire.lon],{icon : FireIcon}).addTo(lB_Alcohol).bindPopup('ID = ' + fire.id+'<br>'+'Type = ' +fire.type +'<br>'+'Intensite :' +fire.intensity+'<br>'+'Etendue :' +fire.range)
    }})}

function coucheB_Plastics(){
    feu.forEach(fire =>{
        if (fire.type == 'B_Plastics'){
        var marker = L.marker([fire.lat, fire.lon],{icon : FireIcon}).addTo(lB_Plastics).bindPopup('ID = ' + fire.id+'<br>'+'Type = ' +fire.type +'<br>'+'Intensite :' +fire.intensity+'<br>'+'Etendue :' +fire.range)
    }})}

function coucheC_Flammable_Gases(){
    feu.forEach(fire =>{
        if (fire.type == 'C_Flammable_Gases'){
        var marker = L.marker([fire.lat, fire.lon],{icon : FireIcon}).addTo(lC_Flammable_Gases).bindPopup('ID = ' + fire.id+'<br>'+'Type = ' +fire.type +'<br>'+'Intensite :' +fire.intensity+'<br>'+'Etendue :' +fire.range)
    }})}

function coucheE_Electric(){
    feu.forEach(fire =>{
        if (fire.type == 'E_Electric'){
        var marker = L.marker([fire.lat, fire.lon],{icon : FireIcon}).addTo(lE_Electric).bindPopup('ID = ' + fire.id+'<br>'+'Type = ' +fire.type +'<br>'+'Intensite :' +fire.intensity+'<br>'+'Etendue :' +fire.range)
    }})}


fetch(url+'/vehicle')
.then (response =>  response.json())
.then(response => {   
response.forEach(vehicle => {
    tab_camion(vehicle);
    })   
});

lleurs_camions = new L.layerGroup();
lnos_camions =new  L.layerGroup();

map.addLayer(lleurs_camions);
map.addLayer(lnos_camions);

let camions = [];

function tab_camion(camion) {
    camions.push(camion);
    coucheNos_camions();
    coucheLeurs_camions();
    
}



function box_camion(){
    var nos_camions = document.querySelector('input[value="nos_camions"]');
    var leurs_camions = document.querySelector('input[value="leurs_camions"]');

    var bnos_camions = true;
    var bleurs_camions= true;


    nos_camions.onchange = function() {
        
        if (bnos_camions){
            lnos_camions.clearLayers();
            bnos_camions = false;
        }
        else{
            coucheNos_camions();
            bnos_camions=true;
        }
        
    }
    leurs_camions.onchange = function(){
        if (bleurs_camions){
            
            lleurs_camions.clearLayers();
            bleurs_camions = false;
        }
        else{
            coucheLeurs_camions();
            bleurs_camions=true;
        }
    }
}
    
function coucheNos_camions(){

    camions.forEach(vehicle =>{
        if (vehicle.facilityRefID == 173){
            var bindText = 'ID = ' + vehicle.id+'<br>'+ 'Type = ' +vehicle.type +'<br>'+'Nombre équipiers :' +vehicle.crewMember+'<br>'+ ' Type de liquide : ' +vehicle.liquidType+'<br>'+'Quantité de liquide : ' + vehicle.liquidQuantity;
            var marker = L.marker([vehicle.lat, vehicle.lon],{icon : VehicleIcon}).addTo(lnos_camions).bindPopup(bindText)//.openPopup();
    }
    })}

function coucheLeurs_camions(){
    camions.forEach(vehicle =>{
    if (!(vehicle.facilityRefID == 173)){
        var bindText = 'Type = ' +vehicle.type +'<br>'+'Nombre équipiers :' +vehicle.crewMember+'<br>'+ ' Type de liquide : ' +vehicle.liquidType+'<br>'+'Quantité de liquide : ' + vehicle.liquidQuantity;
        var marker = L.marker([vehicle.lat, vehicle.lon],{icon : VehicleIcon2}).addTo(lleurs_camions).bindPopup(bindText)//.openPopup();
    }
})}
    






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
    var fireData = await GetLastFire(fireID);
    
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
        console.log('Vehicle : ', vehicleID, ', Went To Fire');
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

async function GetLastFire(fireID){
    return fetch (url+'/fire'+'/'+fireID)
    .then(response => response.json())
    .then(data => {
        console.log('Success GetFire :', data);
        return data;
    })
    .catch(error => console.error('Error:', error));

}

//GetVehicleByID(264);
//GetOneFire();
//GoToFire(490,264);