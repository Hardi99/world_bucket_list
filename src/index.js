import {initMap} from './map'
import {buildAllDreams} from './dream'
import {getData} from './data'

function init() {
    initMap();
    getData();
}

window.init = init;