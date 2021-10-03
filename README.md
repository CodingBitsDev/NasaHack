# Space Garbage UI

## What is this
A tool to Visualy display space trash and satelites and their orbit in realtime.
This also includes a simple Colision detection.

The data are based of Celestrack and are currently set staticly but can be loaded dynamicaly. (See [NasaHackBackend](https://github.com/Renji3/NasaHackBackend))

## How to run

To run this you have to first clone the Project, enter the folder and run

```
npm install
npm run start
```

## Hackathon
This tool was created in almost 2 days during the [Space App Chalange](https://www.spaceappschallenge.org/).

## Orbital Position and Trail
The current postition of a garbage object is calculated with the satellite.js library, based on the TLE data and the set time.
As the earth in our UI is stationary, the provided ECI coordinates are converted into ECF coordinates.
The orbital trail consists of multiple points in time past before the current position, several seconds apart from each other, which are the connected with increasingl trasparent line meshes.

## Collision Detection
The naive approach to always calculate the distance between each object is highly inefficient, as this algorithm runs in O(n²) on large sets.
Because of this we split the objects into cells in a uniform grid based on the ECS coordinate components.
We only calculate object distances between objects in the same cell or neighboring cells.
If we assume an equal distribution of objects over the globe and we scale the grid proportional to the amount of objects, we can effectively reduce the mean number of objects per cell to be constant and thereby reduce the asymptotic runtime to O(n).

## Visualization
The Visualization is used via BabylonJS. A open source 3D rendering engine for the Web.
The biggest challenge was to visualize and update 10000+ Debris in real time. This was done via the use of Model Instances and smartly loading and unloading Models. 

## React
The UI was created via with the use of React JS.