var urlSimul = "http://vps.cpe-sn.fr:8081";

var url = "http://vps.cpe-sn.fr:8081";
var teamuuid = "eda70af1-4c45-4f0a-abb1-99bf8f6b8385"; 


var map = L.map('map',{
    center: [39.73, -104.99],
    zoom: 10,
}).setView([45.732333858926715, 4.8260937761478795], 12);

var FacilityIcon = L.icon({
    iconUrl :  'images/caserne.png',
    iconSize : [50,50],
})

var FireIcon = L.icon({
    iconUrl :  'images/feu.png',
    iconSize : [40,60],
})

var VehicleIcon = L.icon({
    iconUrl :  'images/camion.png',
    iconSize : [55,35],
})

var VehicleIcon2 = L.icon({
    iconUrl :  'images/camion2.png',
    iconSize : [50,30],
})


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
    }).addTo(map);



var feu = [];
var camions = [];
var casernes = [];

var lfeu = new L.layerGroup();
var lleurs_camions = new L.layerGroup();
var lnos_camions =new  L.layerGroup();
var lleurs_camions = new L.layerGroup();
var lnotre_caserne =new  L.layerGroup();
var lleurs_casernes = new L.layerGroup();

map.addLayer(lfeu);
map.addLayer(lleurs_camions);
map.addLayer(lnos_camions);
map.addLayer(lnotre_caserne);
map.addLayer(lleurs_casernes);



function initMap (){
    feu = [];
    camions = [];
    casernes = [];

    lfeu.clearLayers();
    lleurs_camions.clearLayers();
    lnos_camions.clearLayers();
    lleurs_camions.clearLayers();
    lnotre_caserne.clearLayers();
    lleurs_casernes.clearLayers();

    
    fetch(url+'/fire')
    .then (response =>  response.json())
    .then(reponse => {
        reponse.forEach(fire => {
            feu.push(fire);
            
            // var marker = L.marker([fire.lat, fire.lon],{icon : FireIcon}).addTo(lfeu).bindPopup('Type = ' +fire.type +'<br>'+'Intensite :' +fire.intensity+'<br>'+'Etendue :' +fire.range);
        })
        filtre_feu();
    });


    fetch(url+'/vehicle')
    .then (response => response.json())
    .then(response => { 
        response.forEach(vehicle => {
            camions.push(vehicle);
        })
        filtre_camion();
    });


    fetch(url+'/facility')
    .then (response =>  response.json())
    .then(response => {   
    response.forEach(facility => {
        casernes.push(facility);
        coucheNotre_caserne();
        coucheLeurs_casernes();
        })
        box_caserne();   
    });

    


    
}
setInterval(()=>{initMap()}, 2000);
//initMap();



function filtre_feu(){
    var etendue = document.getElementById("val_eten");
    var intensite = document.getElementById("val_int");
    var sliderE = document.getElementById("myRange");
    var sliderI = document.getElementById("myRangeI");

    etendue.innerHTML = sliderE.value;
    intensite.innerHTML = sliderI.value;    

    lfeu.clearLayers();

    feu.forEach(fire =>{
    if (fire.intensity <= sliderI.value ){
        if ( fire.range <= sliderE.value){
            if ((document.getElementById("A").checked == true && fire.type == 'A' )||
            (document.getElementById("B_Gasoline").checked == true && fire.type == 'B_Gasoline' )||
            (document.getElementById("B_Alcohol").checked == true && fire.type == 'B_Alcohol' )||
            (document.getElementById("B_Plastics").checked == true && fire.type == 'B_Plastics' )||
            (document.getElementById("C_Flammable_Gases").checked == true && fire.type == 'C_Flammable_Gases' )||
            (document.getElementById("D_Metals").checked == true && fire.type == 'D_Metals' )||
            (document.getElementById("E_Electric").checked == true && fire.type == 'E_Electric' )){
                L.marker([fire.lat, fire.lon],{icon : FireIcon}).addTo(lfeu).bindPopup('Type = ' +fire.type +'<br>'+'Intensite :' +fire.intensity+'<br>'+'Etendue :' +fire.range)
}}}})}



function filtre_camion(){
 var nb_equipier = document.getElementById("equipier");
 var sliderE = document.getElementById("nb_equipier");
 var nos_camions = document.querySelector('input[value="nos_camions"]');
 var leurs_camions = document.querySelector('input[value="leurs_camions"]');

 nb_equipier.innerHTML = sliderE.value 

 lnos_camions.clearLayers();
 lleurs_camions.clearLayers();
 camions.forEach(camion =>{
 if (camion.crewMember <= sliderE.value ){
 if (document.getElementById("nos_camions").checked == true && camion.facilityRefID == 173 ){
 var bindText = 'Type = ' +vehicle.type +'<br>'+'Nombre équipiers :' +camion.crewMember+'<br>'+ ' Type de liquide : ' +camion.liquidType+'<br>'+'Quantité de liquide : ' + camion.liquidQuantity;
 var marker = L.marker([camion.lat, camion.lon],{icon : VehicleIcon}).addTo(lnos_camions).bindPopup(bindText)
 }
 if(document.getElementById("leurs_camions").checked == true && !(camion.facilityRefID == 173)){
 var bindText = 'Type = ' +vehicle.type +'<br>'+'Nombre équipiers :' +camion.crewMember+'<br>'+ ' Type de liquide : ' +camion.liquidType+'<br>'+'Quantité de liquide : ' + camion.liquidQuantity;
 var marker = L.marker([camion.lat, camion.lon],{icon : VehicleIcon2}).addTo(lleurs_camions).bindPopup(bindText) 
 

 }
 }

 
})}


function box_caserne(){
    var bnotre_caserne = document.querySelector('input[value="notre_caserne"]').checked;
    var bleurs_casernes = document.querySelector('input[value="leurs_casernes"]').checked;
        
    if (!bnotre_caserne){lnotre_caserne.clearLayers();}
    else{coucheNotre_caserne();}

    if (!bleurs_casernes){lleurs_casernes.clearLayers();}
    else{coucheLeurs_casernes();}

}


    
function coucheNotre_caserne(){
    casernes.forEach(facility =>{
        if (facility.id == 173){
            var marker = L.marker([facility.lat, facility.lon],{icon: FacilityIcon}).addTo(lnotre_caserne).bindPopup('Id = ' +facility.id +'<br>'+'Nom :' +facility.name)
    }
    })}

function coucheLeurs_casernes(){
    casernes.forEach(facility =>{
    if (!(facility.id== 173)){
        var marker = L.marker([facility.lat, facility.lon],{icon: FacilityIcon}).addTo(lleurs_casernes).bindPopup('Id = ' +facility.id +'<br>'+'Nom :' +facility.name)
    }
})}



