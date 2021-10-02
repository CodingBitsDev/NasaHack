export default function checkCollsion(trashList, crashDistance) {
    let crashDistSqr = crashDistance * crashDistance;

    for (let i = 0; i < trashList.length; i++) {
        for (let j = i; j < trashList.length; j++) {
            let t1 = trashList[i].orbit.currentPosition;
            let t2 = trashList[j].orbit.currentPosition;
            let distSqr = ((t1.x - t2.x) * (t1.x - t2.x) 
                + (t1.y - t2.y) * (t1.y - t2.y) 
                + (t1.z - t2.z) * (t1.z - t2.z));

            if (distSqr < crashDistSqr) {
                return {
                    crash: true,
                    trash1: trashList[i],
                    trash2: trashList[j],
                    distance: Math.sqrt(distSqr)
                }
            }

        }
    }

    return {
        crash: false,
    }
}