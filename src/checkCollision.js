export default function checkCollision(trashList, crashDistance) {
    let crashDistSqr = crashDistance * crashDistance;

console.log("Cheking for " + trashList.length);

    let crashCells = []
    let tp, tp2, cx, cy, cz, distSqr;
    for (let i = 0; i < trashList.length; i++) {
        tp = trashList[i].orbit.currentPosition;

        // determine and create own cell
        cx = Math.floor(tp.x / 1000);
        if (!crashCells[cx]) {crashCells[cx] = []}
        cy = Math.floor(tp.y / 1000);
        if (!crashCells[cx][cy]) {crashCells[cx][cy] = []}
        cz = Math.floor(tp.z / 1000);
        if (!crashCells[cx][cy][cz]) {crashCells[cx][cy][cz] = []}

        // check neighboring cells for trash
        for (let ncx = cx - 1; ncx < cx + 1; ncx++) {
            for (let ncy = cy - 1; ncy < cy + 1; ncy++) {
                for (let ncz = cx - 1; ncz < cz + 1; ncz++) {
                    if (crashCells[ncx] && crashCells[ncx][ncy] && crashCells[ncx][ncy][ncz]) {

                        // check all trash in this cell
                        for (let j = 0; j < crashCells[ncx][ncy][ncz].length; j++) {
                            tp2 = crashCells[ncx][ncy][ncz][j];
                            distSqr = ((tp.x - tp2.x) * (tp.x - tp2.x) 
                                + (tp.y - tp2.y) * (tp.y - tp2.y) 
                                + (tp.z - tp2.z) * (tp.z - tp2.z));
            
                            if (distSqr < crashDistSqr) {
                                console.log("COLLISION WARNING:",
                                    "distance: " +  Math.sqrt(distSqr),
                                    cx, cy, cz, ncx, ncy, ncz
                                )
                                return {
                                    crash: true,
                                    trash1: trashList[i],
                                    trash2: trashList[tp2.index],
                                    distance: Math.sqrt(distSqr)
                                }
                            }
                        }
                    }
                }
            }
        }

        // register self in crash Cell
        crashCells[cx][cy][cz].push({
            index: i,
            position: tp
        })
    }

    return {
        crash: false,
    }
}