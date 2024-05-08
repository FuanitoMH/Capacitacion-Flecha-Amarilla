import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLoaderComponent } from './app-loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

describe('AppLoaderComponent', () => {
  let component: AppLoaderComponent;
  let fixture: ComponentFixture<AppLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLoaderComponent, MatProgressSpinnerModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
