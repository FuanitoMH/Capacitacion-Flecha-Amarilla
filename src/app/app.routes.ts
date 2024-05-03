import { Routes } from '@angular/router';
import { FirstComponent } from './components/first/first/first.component';
import { NofoundComponent } from './components/nofound/nofound/nofound.component';

export const routes: Routes = [
    {path: 'first-component', component: FirstComponent},
    {path: 'error', component: NofoundComponent}
];
