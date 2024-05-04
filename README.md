# CELULA
En Este repositorio se lleva a cabo a las actividades vistas en el curso de capacitacion de Flecha Amarilla

## Ejercicio 01
Las actividades realizadas para este ejercicio fueron ... 

* Instalación y configuracion de Angular
* Creación del proyecto


Este proyecto está construido con __Angular 17__  
La instalacion de Angular se realiza con el siguiente comando
```
npm install -g @angular/cli
```

Para crear un proyecto con Angular basta con escribir el comando
```
ng new <nameproject>
```

---
## Ejercicio 02
Las actividades vistas fueron la creacion de componentes y como los poddemos utilizar en nuestra página 

Comando `ng` para crear componentes 
```
ng generate component <name>
```
El enrutamiento entre los componentes, para ello es necesario primero tener hacer las importaciones en el TypeScript

```
export const routes: Routes = [
    {path: 'first-component', component: FirstComponent},
    {path: 'error', component: NofoundComponent}
];

<button [routerLink]="['/first-component']" >First component</button>
<button [routerLink]="['/error']" >Second component</button>

```
---
## Ejercicio 03
Las actividades realizadas se enfocaron en el aprendizaje de la manipulación y diseño de una página.

Para ello, se hizo la instalación de un paquete extra, que proporciona componentes que facilitan con la estructuración y estilo de la pagina.

El paquete Utilizado es [Angular Material](https://material.angular.io). Y para realizar su instalacion es con el siguiente comando
```
ng add @angular/material
```

Un componente visto fue el __Grid-List__, es una vista de lista bidimensional que organiza las celdas en un diseño basado en cuadrícula.
```
<!-- HEADER -->
<mat-grid-tile-header cols="2" rowHeight="2:2">
  <app-header mat-grid-tile></app-header>
</mat-grid-tile-header>
```

Otro componente visto fue el __Button__, Los elementos nativos `<button>` o `<a>` se mejoran con estilos de Material Design y efectos de tinta.
```
<button [routerLink]="['/first-component']" mat-stroked-button color="warn" >First component</button>
<button [routerLink]="['/error']" mat-flat-button color="primary">Second component</button>
```
___
## Ejercicio 4 
### Services
En esta sesión vimos como se hace el uso de los servicios en Angulas.
Para crear un servicio se utiliza el conamdo `ng`
```
ng generate service <servicename>
```

En este caso cramos un servicio llamado obtener-datos que nos ayuda a recopilar información de una api por medio de los protocolos http

file: __\src\app\services\obtener-datos.service.ts__
```
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class ObtenerDatosService {

  constructor(private http:HttpClient) { }

  getPokemon(url: string): Observable<object> {
    return this.http.get(url, httpOptions)
  }
  
}
```
Archivo: __\src\app\app.component.ts__
```
export class AppComponent implements OnInit {
  constructor(private ObtenerDatosService: ObtenerDatosService) {}

  ngOnInit(): void{
    this.getPokemon();
  } 
  variables: any;

  getPokemon(): void{
    this.ObtenerDatosService.getPokemon('https://pokeapi.co/api/v2/pokemon').subscribe(
      (items: any) => {
        this.variables = items.results;
        console.log(items.results);
      }
    )
  }
}
```