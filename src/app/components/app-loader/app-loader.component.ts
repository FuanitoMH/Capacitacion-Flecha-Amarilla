import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ObservablesService } from '../../services/observables.service';

@Component({
  selector: 'app-app-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
  templateUrl: './app-loader.component.html',
  styleUrl: './app-loader.component.css'
})
export class AppLoaderComponent implements OnInit {

  loader: Boolean = false;

  constructor(private observablesService: ObservablesService) {
    
  }

  ngOnInit(): void{
    this.observablesService.loaderObs.subscribe((valor: Boolean) => {
      this.loader = valor;
      console.log(valor);
    });
  }

}
