import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BannerRightComponent } from './components/app-banner-right/banner-right/banner-right.component';
import { BannerLeftComponent } from './components/app-banner-left/banner-left/banner-left.component';
import { BodyComponent } from './components/app-body/body/body.component';
import { HeaderComponent } from './components/app-header/header/header.component';
import { FooterComponent } from './components/app-footer/footer/footer.component';

import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, BannerRightComponent, BannerLeftComponent, BodyComponent, HeaderComponent,
    FooterComponent, MatButtonModule, MatGridListModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hola a todos';

  alumnos :String ='UG';
  valorif = true;
  variables = [{nombre:'Laura'}, {nombre:'Luis'}, {nombre:'Maria'}];

  funicionEjemplo(){
    alert('hola');
  }
}
