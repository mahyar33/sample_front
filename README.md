## The technology which is used:

 - React  
 - Highchart 
 - Socket.io 
 - Jest,Enzyme,sinon

*/src/App.js* is the main part of program which imports all component.

## Component In /src/component is:
 - AddCard : add a drone
 - DeleteCard : remove a drone
 - outRangedDrones : show drones with position(x or y) more than 200

## How to start the project :

 - `npm install`
 - `npm start`

**Also:**

 - `npm run build` =>for deploy
 - `npm run test` => for test

## Dockerizing a React App:

 - `docker build -t [name] .`
 - `docker run -t -i -p 3000:3000 [name]`