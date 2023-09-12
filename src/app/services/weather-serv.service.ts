import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { weatherInputs } from '../model/weatherInput';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherServService {

  constructor(private httpClient:HttpClient) { }

  private reloadDashboard = new BehaviorSubject<boolean>(false);

  setReloadDashboard(flag: boolean) {
    this.reloadDashboard.next(flag);
  }

  getReloadDashboard() {
    return this.reloadDashboard.asObservable();
  }

  city:string="New Delhi";
    setCity(city:string)
    {
      this.city=city;
      this.setReloadDashboard(true)
    }
    getCity():string{
      return this.city;
    }

  //http://api.weatherapi.com/v1/forecast.json?key=656dd46ae88d4d71a7d34734230709&q=New%20Delhi&days=1&aqi=yes&alerts=no
  hoururl:string ="http://api.weatherapi.com/v1/forecast.json?key=656dd46ae88d4d71a7d34734230709"

  getWeatherInfo(data:weatherInputs)
  {
     
    let newHourUrl:string = this.hoururl+"&q="+data.city+"&days="+data.days+"&aqi=yes&alerts=no";
      console.log(newHourUrl);
      
      return this.httpClient.get(newHourUrl);
  }

}
