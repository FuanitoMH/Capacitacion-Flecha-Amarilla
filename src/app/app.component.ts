import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BannerRightComponent } from './components/app-banner-right/banner-right/banner-right.component';
import { BannerLeftComponent } from './components/app-banner-left/banner-left/banner-left.component';
import { BodyComponent } from './components/app-body/body/body.component';
import { HeaderComponent } from './components/app-header/header/header.component';
import { FooterComponent } from './components/app-footer/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { ObtenerDatosService } from './services/obtener-datos.service';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ObservablesService } from './services/observables.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppLoaderComponent } from './components/app-loader/app-loader.component';
import { Pokemon } from './entities/pokemon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, BannerRightComponent, BannerLeftComponent, BodyComponent, HeaderComponent,
    FooterComponent, MatButtonModule, MatGridListModule, CommonModule, ReactiveFormsModule, MatProgressSpinnerModule,
    AppLoaderComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  valores: any[] = [];
  checkoutForm : any;
  loader: Boolean = false;
  pokemon: Pokemon = new Pokemon();

  constructor(private ObtenerDatosService: ObtenerDatosService, private formBuilder: FormBuilder, private observablesService: ObservablesService) {
    this.checkoutForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.minLength(1)]),
      url: new FormControl(null, [Validators.maxLength(2)]),
      email: new FormControl(null, [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    });
  }
  ngOnInit(): void{
    this.getPokemon();
    this.observablesService.loaderObs.subscribe((valor: Boolean) => {
      this.loader = valor;
      console.log(valor);
    });
  } 

  onSubmit(valorFormulario: any){
    if( (this.checkoutForm.invalid || (this.checkoutForm.get('name').value == 'angular') )){
      alert('Formulario invalido')
    }else{
      this.valores.push(valorFormulario); 
      this.checkoutForm.reset();
    }
  }

  getPokemon(): void{
    this.ObtenerDatosService.getPokemon('https://pokeapi.co/api/v2/pokemon').subscribe(
      (items: any) => {
        console.log(items.results);
        this.valores = items.results;
        setTimeout(() => this.observablesService.actualizarValorLoader(false),5000);        
      }
    )
  }

  title = 'Hola a todos';
  alumnos :String ='UG';
  valorif = true;
  // variables = [{nombre:'Laura'}, {nombre:'Luis'}, {nombre:'Maria'}];

  funicionEjemplo(){
    alert('hola');
  }
}
