import { Component } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { WeatherServService } from '../services/weather-serv.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchTerm!:string;
  constructor(private router :Router,private location:Location, private weatherservice:WeatherServService){}
  onSubmit()
  {
    console.log("*************");
    this.weatherservice.setCity(this.searchTerm);
    this.searchTerm="";
 
  }
}
