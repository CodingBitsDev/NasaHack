// import Orbit from './BabylonComponents/Orbit';
import Trash from './BabylonComponents/Trash';

// import data from './data/spaceTrackDataDebriOnly.json';
// import data from "./data/spaceTrackDebri10k_clean.json";

async function getCelestrakData(){
    let sateliteResult = await fetch("/satelite_data_CelesTrak.json") 
    let sateliteData = await sateliteResult.json()

    let trashResult = await fetch("/debris_data_CelesTrak.json") 
    let trashData = await trashResult.json()

    return {
        debris: Object.values( trashData ).map(data => ({...data, type: "debris"})),
        satelites: Object.values( sateliteData ).map(data => ({...data, type: "satelite"})),
    }
}

async function getSpaceTrack(){
    let result = await fetch("/spaceTrackDebri10k_clean.json") 
    let data = await result.json()
    return data.map(el => ({
        ...el,
        type: "debris",
        name: el["TLE_LINE0"],
        tle1: el["TLE_LINE1"],
        tle2: el["TLE_LINE2"],
    }))
}

export default async function renderTrash(scene){
    let trashList = [];

    let renderMax = 10000
    let step = 1

    let celestrackdata = await getCelestrakData()
    let data = [...celestrackdata.debris, ...celestrackdata.satelites];
    // console.log("### data", data[0])

    for (let index = 0; index < data.length; index++) {
        let trash = data[index]
        if (index > step * renderMax) return;
        setTimeout( () => {
            let newTrash = new Trash(
                scene,
                trash.tle1,
                trash.tle2,
                trash.name,
                trash.type,
                trash,
            );
            trashList.push(newTrash)
        } , 0)
        
    }

    let currentStep = 0;
    let update = () => {
        let interval = Math.ceil( trashList.length / 100 )
        if (trashList.length > currentStep){
            let subList = trashList.slice(currentStep, currentStep + interval)
            currentStep = currentStep + interval;
            subList.forEach((trash) => {
                if (trash) trash.update(new Date())
            })
        } else {
            currentStep = 0;
        }
    }
    setInterval(update, 10);

    scene.onTimeUpdated((time, update) => {
        if (update)
        trashList.forEach(trash => trash && trash.update());
    })

    return trashList;
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