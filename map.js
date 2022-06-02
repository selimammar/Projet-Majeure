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
    iconSize : [70,60],
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
        var marker = L.marker([fire.lat, fire.lon],{icon : FireIcon}).addTo(lA).bindPopup('Type = ' +fire.type +'<br>'+'Intensite :' +fire.intensity+'<br>'+'Etendue :' +fire.range).openPopup()
    }
    })}

function coucheD_Metals(){
    feu.forEach(fire =>{
    if (fire.type == 'D_Metals'){
        var marker = L.marker([fire.lat, fire.lon],{icon : FireIcon}).addTo(lD_Metals).bindPopup('Type = ' +fire.type +'<br>'+'Intensite :' +fire.intensity+'<br>'+'Etendue :' +fire.range).openPopup()
    }
})}
    

function coucheB_Gasoline(){
    feu.forEach(fire =>{
        if (fire.type == 'B_Gasoline'){
        var marker = L.marker([fire.lat, fire.lon],{icon : FireIcon}).addTo(lB_Gasoline).bindPopup('Type = ' +fire.type +'<br>'+'Intensite :' +fire.intensity+'<br>'+'Etendue :' +fire.range).openPopup()
    }})}

function coucheB_Alcohol(){
    feu.forEach(fire =>{
        if (fire.type == 'B_Alcohol'){
        var marker = L.marker([fire.lat, fire.lon],{icon : FireIcon}).addTo(lB_Alcohol).bindPopup('Type = ' +fire.type +'<br>'+'Intensite :' +fire.intensity+'<br>'+'Etendue :' +fire.range).openPopup()
    }})}

function coucheB_Plastics(){
    feu.forEach(fire =>{
        if (fire.type == 'B_Plastics'){
        var marker = L.marker([fire.lat, fire.lon],{icon : FireIcon}).addTo(lB_Plastics).bindPopup('Type = ' +fire.type +'<br>'+'Intensite :' +fire.intensity+'<br>'+'Etendue :' +fire.range).openPopup()
    }})}

function coucheC_Flammable_Gases(){
    feu.forEach(fire =>{
        if (fire.type == 'C_Flammable_Gases'){
        var marker = L.marker([fire.lat, fire.lon],{icon : FireIcon}).addTo(lC_Flammable_Gases).bindPopup('Type = ' +fire.type +'<br>'+'Intensite :' +fire.intensity+'<br>'+'Etendue :' +fire.range).openPopup()
    }})}

function coucheE_Electric(){
    feu.forEach(fire =>{
        if (fire.type == 'E_Electric'){
        var marker = L.marker([fire.lat, fire.lon],{icon : FireIcon}).addTo(lE_Electric).bindPopup('Type = ' +fire.type +'<br>'+'Intensite :' +fire.intensity+'<br>'+'Etendue :' +fire.range).openPopup()
    }})}


fetch(url+'/vehicle')
.then (response =>  response.json())
.then(response => {   
response.forEach(vehicle => {
    if (vehicle.facilityRefID == 173){
        var bindText = 'Type = ' +vehicle.type +'<br>'+'Nombre équipiers :' +vehicle.crewMember+'<br>'+ ' Type de liquide : ' +vehicle.liquidType+'<br>'+'Quantité de liquide : ' + vehicle.liquidQuantity;
        var marker = L.marker([vehicle.lat, vehicle.lon],{icon : VehicleIcon}).addTo(map).bindPopup(bindText)//.openPopup();
    }
    else {
        var bindText = 'Type = ' +vehicle.type +'<br>'+'Nombre équipiers :' +vehicle.crewMember+'<br>'+ ' Type de liquide : ' +vehicle.liquidType+'<br>'+'Quantité de liquide : ' + vehicle.liquidQuantity;
        var marker = L.marker([vehicle.lat, vehicle.lon],{icon : VehicleIcon2}).addTo(map).bindPopup(bindText)//.openPopup();
    }})   
});


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
    data.lat            =parseInt(form.id.value);
    data.liquidQuantity =parseInt(form.liquidQuantity.value);
    data.liquidType     =form.liquidType.value;
    data.lon            =parseInt(form.lon.value);
    data.type           =form.type.value;
    console.log("vehicle to add :", data)
    // verifier pas vide
    ok = true;
    Object.values(data).every(
        element => {
            if(element == "" || isNaN(element)){
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

function  DelVehicle(){
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
