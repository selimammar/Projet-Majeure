var map = L.map('map').setView([45.732333858926715, 4.8260937761478795], 12);

var FacilityIcon = L.icon({
    iconUrl :  'caserne.png',
    iconSize : [50,50],
})

var FireIcon = L.icon({
    iconUrl :  'feu.png',
    iconSize : [40,60],
})

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var url = "http://vps.cpe-sn.fr:8081"
var teamuuid = "eda70af1-4c45-4f0a-abb1-99bf8f6b8385"; 
fetch(url+'/facility')
    .then (response =>  response.json())
    .then(reponse => {
    reponse.forEach(facility => {
        var marker = L.marker([facility.lat, facility.lon],{icon: FacilityIcon}).addTo(map).bindPopup('Id = ' +facility.id +'<br>'+'Nom :' +facility.name).openPopup()
     } )
    
    
});
fetch(url+'/fire')
.then (response =>  response.json())
.then(reponse => {
reponse.forEach(fire => {
        var marker = L.marker([fire.lat, fire.lon],{icon : FireIcon}).addTo(map).bindPopup('Type = ' +fire.type +'<br>'+'Intensite :' +fire.intensity+'<br>'+'Etendue :' +fire.range).openPopup()
    })
    
});


const data_vehicle = {
    "crewMember": 0,
    "facilityRefID": 94,
    "fuel": 0,
    "id": 0,
    "lat": 0,
    "liquidQuantity": 0,
    "liquidType": "ALL",
    "lon": 0,
    "type": "CAR"
} 

fetch (url+'/'+teamuuid, {
    method: 'POST',
    body: JSON.stringify(data_vehicle),
    
})
.then(response => response.json())
