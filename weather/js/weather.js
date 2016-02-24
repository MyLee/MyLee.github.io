// var map = L.map('map').setView([56.687,16.256],5);
// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     maxZoom: 18,
//     id: 'majlee.ol5j183c',
//     accessToken: 'pk.eyJ1IjoibWFqbGVlIiwiYSI6ImNpajYwNzJ3ZTAwMWgyN20zeDJqZ2lsOHgifQ.ZK47RkEmbnxTmnBqYYIPmg'
// }).addTo(map);
// 
// function myOwmMarker(data) {
//     // just a Leaflet default marker
//     return L.marker([data.coord.lat, data.coord.lon]);
// }
// 
// function myOwmPopup(data) {
//     // just a Leaflet default popup with name as content
//     return L.popup().setContent(data.name);
// }
// 
// var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 18, attribution: '[insert correct attribution here!]' });
// 
// var clouds = L.OWM.clouds({showLegend: false, opacity: 0.5});
// var city = L.OWM.current({intervall: 15, lang: 'de',
//             markerFunction: myOwmMarker, popupFunction: myOwmPopup});
// 
// var map = L.map('map', { center: new L.LatLng(51.5, 10), zoom: 10, layers: [osm] });
// var baseMaps = { "OSM Standard": osm };
// var overlayMaps = { "Clouds": clouds, "Cities": city };
// var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

// $.getJSON( "js/city.list.json", function( json ) {
//   console.log( "JSON Data: " + json.users[ 3 ].name );
//  })
//  .fail(function( jqxhr, textStatus, error ) {
//     var err = textStatus + ", " + error;
//     console.log( "Request Failed: " + err);
// });

// Current date;
// Date.prototype.currentDate = function () { 
//     return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
// }
//Current time
Date.prototype.timeNow = function () {
    return((this.getHours()<10? '0':'') + this.getHours() + ((this.getSeconds() < 10)?"0":""));
}
var currentDate = new Date();
var currentTime = currentDate.timeNow();
// var displayDate = Date.currentDate();

document.getElementById('time').innerHTML=currentTime;
document.getElementById('searchDate').innerHTML=currentDate;

//https://api.trafiklab.se/samtrafiken/stationinfo/stations.xml?details=true&sort=name&key=<70200205b59e4e6f8456bd02e1b6f74d>