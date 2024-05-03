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
