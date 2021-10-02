# Space Garbage UI
## Orbital Position and Trail
The current postition of a garbage object is calculated with the satellite.js library, based on the TLE data and the set time.
As the earth in our UI is stationary, the provided ECI coordinates are converted into ECF coordinates.
The orbital trail consists of multiple points in time past before the current position, several seconds apart from each other, which are the connected with increasingl trasparent line meshes.

## Collision Detection
The naive approach to always calculate the distance between each object is highly inefficient, as this algorithm runs in O(n²) on large sets.
Because of this we split the objects into cells in a uniform grid based on the ECS coordinate components.
We only calculate object distances between objects in the same cell or neighboring cells.
If we assume an equal distribution of objects over the globe and we scale the grid proportional to the amount of objects, we can effectively reduce the mean number of objects per cell to be constant and thereby reduce the asymptotic runtime to O(n).