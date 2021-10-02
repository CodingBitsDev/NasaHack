// import Orbit from './BabylonComponents/Orbit';
import Trash from './BabylonComponents/Trash';

import data from './data/spaceTrackDataDebriOnly.json';

export default function renderTrash(scene){
    let trashList = [];

    data.forEach(( trash, index ) => {
        let newTrash = new Trash(
            scene,
            trash["TLE_LINE1"],
            trash["TLE_LINE2"],
            trash["TLE_LINE0"]
        )
        if (index == 0){
            newTrash.setOrbitEnabled(true);
        }
        trashList.push(newTrash)

    })

    let interval = 50;
    let currentStep = 0;
    let update = () => {
        if (trashList.length > currentStep){
            let subList = trashList.slice(currentStep, currentStep + interval)
            currentStep = currentStep + interval;
            subList.forEach((trash) => {
                if (trash) trash.update()
            })
        } else {
            currentStep = 0;
        }
    }
    setInterval(update, 10);
    // // Sample TLE
    // var tleLine1 = '1 25544U 98067A   21275.52277778  .00006056  00000-0  11838-3 0  9993',
    // tleLine2 = '2 25544  51.6451 172.0044 0004138  50.9000 316.9051 15.48905523305232';  
    
    // // Initialize a satellite recor
    // let orbit = new Orbit(tleLine1, tleLine2, null, scene)

    // let interval =  setInterval(() => {
    //    orbit.update(); 
    // }, 100);
    // return orbit
}