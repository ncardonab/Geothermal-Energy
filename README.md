# Geothermal-Energy
Geothermal Energy Web Page.

## Información general
Este repositorio tendrá dos ramas base `master` y `develop`.
Sobre `develop` se desarrollaran las tareas de cada sprint, así que cada desarrollador deberá seguir la siguiente dinámica a la hora de entregar sus tareas:
1. Desde la rama `develop` ejecutar el comando `git checkout -b nombre-de-la-nueva-rama`.
2. Una vez la tarea esté completa, crear un pull request que tenga como base la rama `develop`.
3. El pull request **debe** ser aprobado por **todos** los compañeros del equipo, dependiendo del tipo de tarea.

Todas las tareas deben seguir este mismo proceso para ser entregadas y poder hacer seguimiento de las mismas, los links de los PR (Pull Request) deben de ser puestos en el slack para hacer el seguimiento.

Se hará merge de `develop` en `master` **solamente** antes de realizar el deploy de cada entrega y eso lo podrá hacer únicamente Nicolás Cardona.

## Initial Setup
## Project Setup
```
npm install
```

## Compiles and hot-reloads for development
```
npx webpack-dev-server or npm run dev
```

## Start the server (Already Deployed, instead use https://geo-energy-api.herokuapp.com/[the requested endpoint] )
### But you can run the local server by typing
```
npm run start
```

## Compiles & Minifies for production
```
npm run build
```
