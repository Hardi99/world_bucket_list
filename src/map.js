let map;
let panorama;
const panoramaElement = document.querySelector("#panorama");
const resetMapButton = document.querySelector("#reset-map");
const backToMapButton = document.querySelector("#back-to-map");

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 2.3,
    streetViewControl: false
  });

  panorama = new google.maps.StreetViewPanorama(
    document.getElementById('panorama'), {
      position: {lat: 48.858159, lng: 2.294497},
      pov: {
        heading: 34,
        pitch: 10
      }
    });

  addMapListeners();
  panoramaElement.style.display = "none";
  backToMapButton.style.display = "none";
}

function addMapListeners() {
  resetMapButton.addEventListener("click", resetMap);
  backToMapButton.addEventListener("click", backToMap);
}

  function addMarkerOnMap(dream) {
    const marker = new google.maps.Marker({
      position: dream.coordinates,
      map: map,
      icon: dream.done? "images/marker-done.png" : "images/marker.png"
    });

    marker.addListener("click", () => {
      zoomOn(marker.getPosition());
    });
  }

  function zoomOn(position) {
    map.setZoom(20);
    map.setCenter(position);
    map.setMapTypeId("satellite")
  }

  function resetMap(position){
    map.setZoom(2.49);
    map.setCenter({lat: 0, lng: 0});
    map.setMapTypeId("roadmap")
  }

  function backToMap(position){
    panoramaElement.style.display = "none";
    backToMapButton.style.display = "none";
    resetMapButton.style.display = "block";
  }

  function visitDreamOnMap(position) {
    panorama.setPosition(position);
    panoramaElement.style.display = "block";
    backToMapButton.style.display = "block";
    resetMapButton.style.display = "none";
  }

export {initMap, addMarkerOnMap, visitDreamOnMap};