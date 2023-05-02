import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirlinesComponent } from './airlines/airlines.component';
import { AirlineDetailComponent } from './airline-detail/airline-detail.component';

const routes: Routes = [
  { path: '', component: AirlinesComponent },
  { path: 'airline-detail/:id', component: AirlineDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
