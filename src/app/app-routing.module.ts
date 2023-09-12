import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WeatherDashboardComponent } from './weather-dashboard/weather-dashboard.component';


const routes: Routes = [
  {
    path:"",
    component: WeatherDashboardComponent
  },
  // {
  //   path:"dd",
  //   // component: WeatherDashboardComponent
  //   redirectTo:"",
  //   pathMatch:'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
