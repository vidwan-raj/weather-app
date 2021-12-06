import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from './weather-data.service';
import { data } from './responseObj';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


// Question : https://002c174930c5.ngrok.io/


export class AppComponent implements OnInit{
  title = 'qualia-web-app';
  latitude = 0;
  longitude = 0;
  constructor(private weatherDataService : WeatherDataService) {}
  cityName:String = '';
  temperature = 0;
  weatherData = <data>{};
  showCity = false;
  url = '';
  ngOnInit(){
  }
  
  converKelvinToCelcius(temp:number){
    return temp - 273.15;
 }
 
  getWeatherData(){
    window.navigator.geolocation.getCurrentPosition((response) =>{
      this.latitude = response.coords.latitude;
      this.longitude = response.coords.longitude;
      this.weatherDataService.getGeoLocationData(this.latitude, this.longitude).subscribe((data) =>{
        this.weatherData = <data> data;
        this.url  = `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`;
        this.showCity = true;
        this.cityName = this.weatherData.name;
        this.temperature = this.converKelvinToCelcius(this.weatherData.main.temp);
    });
    })

  }
  toggleTemp(){

  }
}
