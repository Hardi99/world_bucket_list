/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return initMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addMarkerOnMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return visitDreamOnMap; });
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



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dream__ = __webpack_require__(2);



function init() {
    Object(__WEBPACK_IMPORTED_MODULE_0__map__["b" /* initMap */])();
    Object(__WEBPACK_IMPORTED_MODULE_1__dream__["a" /* buildAllDreams */])();
}

window.init = init;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildAllDreams; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__map__ = __webpack_require__(0);



const dreamsContainer = document.querySelector("#dreams-container");

function buildAllDreams(){
    while(dreamsContainer.hasChildNodes()) {
        dreamsContainer.removeChild(dreamsContainer.lastChild);
    }
    __WEBPACK_IMPORTED_MODULE_0__data__["a" /* data */].forEach(buildOneDream);
    addDreamsListeners();
}

function buildOneDream(dream){
    const dreamElement = document.createElement("div");

    dreamElement.innerHTML = 
    `<div class="card text-center" id="${dream.id}">
        <h5 class="card-header font-weight-bold">${dream.description}</h5>
        <img class="card-img-top" src="${dream.imagePath}" alt="">
        <div class="card-body">
            <a href="#" class="button-action btn btn-${dream.done?"secondary":"danger"} font-weight-bold btn-block">${dream.done?"Je veux le refaire":"Je me lance !"}</a>
        </div>
        <div class="card-footer text-muted text-right">
            <a href="#" class="button-visit btn btn-outline-secondary btn-sm">Visiter</a>
            <a href="${dream.link}" target="_blank" class="btn btn-outline-dark btn-sm">Plus d'infos</a>
        </div>
    </div>`;
    dreamsContainer.appendChild(dreamElement);
    Object(__WEBPACK_IMPORTED_MODULE_1__map__["a" /* addMarkerOnMap */])(dream);
}

function addDreamsListeners(){
    document.querySelectorAll(".button-visit").forEach(item =>{
        item.addEventListener("click", event => {
            visitDream(item.parentElement.parentElement.getAttribute("id"));
        })
    });

    document.querySelectorAll(".button-action").forEach(item =>{
        item.addEventListener("click", event => {
            toggleDreamDone(item.parentElement.parentElement.getAttribute("id"));
            buildAllDreams();
        })
    });
}

function visitDream(dreamId) {
    let position = __WEBPACK_IMPORTED_MODULE_0__data__["a" /* data */].filter(item => item.id == dreamId)[0].coordinates;
    Object(__WEBPACK_IMPORTED_MODULE_1__map__["c" /* visitDreamOnMap */])(position);
}

function toggleDreamDone(dreamId) {
    let dream = __WEBPACK_IMPORTED_MODULE_0__data__["a" /* data */].filter(item => item.id == dreamId)[0];
    dream.done = !dream.done;
}



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return data; });
const data = [
    {
        id: 1,
        imagePath: "images/img-arena.jpg",
        description: "Visiter l'Allianz Arena",
        done: false,
        link: "https://allianz-arena.com/fr/nos-offres",
        coordinates: {
            lat: 48.2192592,
            lng: 11.6237551
        }
    },
    {
        id: 2,
        imagePath: "images/img-temple.jpg",
        description: "Aller au Japon",
        done: false,
        link: "https://fr.japantravel.com/places/wakayama/kumano-nachi-taisha/207",
        coordinates: {
            lat:33.6685228,
            lng:135.8903315
        }
    },
    {
        id: 3,
        imagePath: "images/img-cancun.jpg",
        description: "Passer un séjour à Cancún",
        done: false,
        link: "https://mexique-decouverte.com/cancun-mexique-capitale-du-tourisme/",
        coordinates: {
            lat:21.1426622,
            lng:-86.7726038
        }
    },
    {
        id: 4,
        imagePath: "images/img-baseball.jpg",
        description: "Voir un match de base-ball",
        done: false,
        link: "https://www.kenya-guide.com/choix-safari-kenya",
        coordinates: {
            lat:40.829651,
            lng:-73.927078
        }
    },
    {
        id: 5,
        imagePath: "images/img-kenya.jpg",
        description: "Faire un safari au Kenya",
        done: false,
        link: "https://www.kenya-guide.com/choix-safari-kenya",
        coordinates: {
            lat:0.5711046,
            lng:37.5639002
        }
    },
    /* {
        id: 6,
        imagePath: "images/img-maldives.jpg",
        description: "Maison sur pilotis aux Maldives",
        done: false,
        link: "https://www.toureiffel.paris/",
        coordinates: {
            lat:-0.681786,
            lng:73.191414
        }
    },
    {
        id: 7,
        imagePath: "images/img-paris.jpg",
        description: "Monter sur la Tour Eiffel",
        done: true,
        link: "https://www.toureiffel.paris/",
        coordinates: {
            lat: 48.858227,
            lng: 2.294559
        }
    }, */
    
]



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map