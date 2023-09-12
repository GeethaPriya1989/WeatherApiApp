// import { CurrentWeather } from "./CurrentWeather"
import { HourlyData } from "./HourlyData";
// import { Location } from "./Location"

export class weatherOutput {
    name!: string;
    region!: string;
    country!: string;
    temp_c!: number;
    comment!: string;
    icon!: string;
    wind_mph!: number;
    humidity!: number;
    feelslike!: number;
    // co!: number;
    airQuality!: number;
    sunrise!: string;
    sunset!: string;
    hour: HourlyData[];
    aqiStatus:string;
    date:string;
    constructor(data:any,i:number)
    {
        console.log(data);
        this.country=data.location.country;
        this.name=data.location.name;
        this.region=data.location.region;
        this.sunrise=data.forecast.forecastday[i].astro.sunrise;
        this.sunset=data.forecast.forecastday[i].astro.sunset;
        this.temp_c=data.forecast.forecastday[i].day.maxtemp_c;
        this.comment=data.forecast.forecastday[i].day.condition.text;
        this.icon=data.forecast.forecastday[i].day.condition.icon;
        this.wind_mph=data.forecast.forecastday[i].day.maxwind_mph;
        this.humidity=data.forecast.forecastday[i].day.avghumidity;
        this.feelslike=data.forecast.forecastday[i].hour[0].feelslike_c;
        this.hour=[];
        this.date=data.forecast.forecastday[i].date;
        this.airQuality=data.forecast.forecastday[i].day.air_quality["us-epa-index"];
        switch(this.airQuality){
            case 1 : this.aqiStatus="Good";
                      break;
           case 2 : this.aqiStatus="Moderate";
                      break; 
            case 3 : this.aqiStatus="Unhealthy for sensitive group";
                      break;
           case 4 : this.aqiStatus="Unhealthy";
                      break;    
          case 5 : this.aqiStatus="Very Unhealthy";
                      break;
           case 6 : this.aqiStatus="Hazardous";
                      break;     
          default : this.aqiStatus="";
                    break;                  
           } 
    
        for (let index = 0; index < data.forecast.forecastday[i].hour.length; index++) {
            let hourObj=new HourlyData(data.forecast.forecastday[i].hour[index]);
            this.hour.push(hourObj);
        }
    }
}
