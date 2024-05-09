import { Routes } from '@angular/router';
import { FirstComponent } from './components/first/first/first.component';
import { NofoundComponent } from './components/nofound/nofound/nofound.component';
import { guardiaSesionGuard } from './guard/guardia-sesion.guard';

export const routes: Routes = [
    {path: 'first-component', component: FirstComponent, canActivate: [guardiaSesionGuard]},
    {path: 'error', component: NofoundComponent, canActivate: [guardiaSesionGuard]}
];
