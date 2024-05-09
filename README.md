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

___
## Ejercicio 05


### FormGroup
Los FormGroup es la forma ágil de crear formularios y manipular su información de una manera más sencilla. Además de que nos brinda de herramientas para su construcción y validación de datos. 

### NgSubmit
ngSubmit es la propiedad que nos ayuda a escuchar el evento del usuario al lanzar la información 

Para la construcción de un Formulario en importante realizar la importaciones 
```
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
```
La estructura en nuestro HTML a segir es la se compone de la siguiente manera
```
<form [formGroup]="checkoutForm" (ngSubmit)="onSubmit(checkoutForm.value)">
    <label for="name">Name</label>
    <input id="name" type="text" formControlName="name">
    
    <label for="url">URL</label>
    <input id="url" type="text" formControlName="url">

    <label for="email">Email</label>
    <input id="email" type="email" formControlName="email">

    <button mat-flat-button color="primary" type="submit">Purchase</button>
  </form>
```
Y dentro de nuestro constructor del componente, declaramos nuestro objeto checkoutForm, junto con nuestras variables correspondientes a los inputs del form 
```
  checkoutForm : any;

  constructor(private ObtenerDatosService: ObtenerDatosService, private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.minLength(1)]),
      url: new FormControl(null, [Validators.maxLength(2)]),
      email: new FormControl(null, [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    });
  }
```

Para que posteriormente podamos establecer nuestra funcion `onSubmit()` que cubre el evento submit del usuario
```
  onSubmit(valorFormulario: any){
    if( (this.checkoutForm.invalid || (this.checkoutForm.get('name').value == 'angular') )){
      alert('Formulario invalido')
    }else{
      this.valores.push(valorFormulario); 
      this.checkoutForm.reset();
    }
  }
```
___
## Ejercicio 06
### Observables-Subscribe
Se utiliza ampliamente para la programación reactiva en Angular. Los observables representan una colección de valores que pueden llegar con el tiempo.  
En Angular, los observables se utilizan en muchos aspectos de la aplicación, como manejar eventos del usuario, manejar datos asíncronos provenientes de servicios (por ejemplo, solicitudes HTTP), propagar cambios en el estado de la aplicación a través de componentes y mucho más.  
En este caso nosotros creamos un Observable mediante un nuevo servicio que el objetivo es utilizarlo para un loader.
```
export class ObservablesService {
  private loader$ = new BehaviorSubject<boolean>(true);
  public loaderObs = this.loader$.asObservable();

  actualizarValorLoader(valor: boolean){
    this.loader$.next(valor);
  }
  constructor() { }
}
```
Tiene que ser integrado como parámetro a nuestro constructor del app-component y en nuestro caso establecemos su valor en el `NgOnInit()` y mediante un `setTimeOut()` modificamos su valor para simular el asincronismo
```
ngOnInit(): void{
  this.getPokemon();
  this.observablesService.loaderObs.subscribe((valor: Boolean) => {
    this.loader = valor;
    console.log(valor);
  });
}

setTimeout(() => this.observablesService.actualizarValorLoader(false),5000);  
```

### NgClass
El básicamente es usado para asignarle clases a nuestros componentes o etiquetas que agregamso en el HTML
```
<div [ngClass]="loader ? 'cargando' : ''">
```  
___
## Ejercicio 07
### Guard
En Angular, los "guards" (guardias) son una característica que te permite controlar la navegación y la activación de rutas en tu aplicación. Los guards se utilizan principalmente en el enrutamiento para proteger las rutas y asegurarse de que ciertas condiciones se cumplan antes de permitir que un usuario acceda a una ruta específica.

Para crear un Guardia usamos el comando 
```
ng generate guard <name>
```
La estructura básica que usamos para crear nuestro guardia fue la siguente, como tal el objetivo es que si el usuario intenta entrar a la ruta 'error', mostraremos una alerta que le indique que la ruta no está permitida
```
@Injectable({ providedIn: 'root' })
class PermissionService { 
  puedeActivarRuta(rutaIngresada: string): boolean {
    console.log('Ruta ingresada: ', rutaIngresada);
    if (rutaIngresada == 'error'){
      alert('Ruta no permitida');
      return false;
    }else {
      return true;
    }
  }
}
  export const guardiaSesionGuard: CanActivateFn = (route, state) => {
  return inject(PermissionService).puedeActivarRuta(route.url.toString());
};
```
Y por ultimo, para que nuestra Guardia funcione necesitamos incluirlo como un atributo a las rutas que tenemos establecidas en el archivo de app.rutes.ts
```
export const routes: Routes = [
    {path: 'first-component', component: FirstComponent, canActivate: [guardiaSesionGuard]},
    {path: 'error', component: NofoundComponent, canActivate: [guardiaSesionGuard]}
];
```
### NgModel
Cuando usas ngModel, estableces una asociación entre el valor del control HTML y una propiedad en el componente de Angular. Esto significa que cualquier cambio en el valor del control HTML se reflejará automáticamente en la propiedad del componente y viceversa.
Para utilizar en NgModel es necesario tener importado el paquete `FormsModule`

En nuestro caso creamos una clase Pokemon con el comando 
```
ng generate class <Pokemon>
```
Para que a su vez crear una instancia en el app.component ``pokemon: Pokemon = new Pokemon();`` 

Que junto con nuestro input en el HTML que le asignamos a la propiedad de ngModel la referencia a nuestra instancia de pokemon 
```
<input type="text" id="pokemon" [(ngModel)]="pokemon.name">
{{pokemon.name}}
```

### Ng Build 
Angular nos provee un comando que nos ayuda a hacer la contrucción de nuestra aplicacion para hacer el desplege, el comando es el siguiente:
```
ng build <project>
```