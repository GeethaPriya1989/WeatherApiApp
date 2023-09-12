import { AfterViewInit, Component, inject,Input,OnInit,ViewChild } from '@angular/core';

import { WeatherServService } from '../services/weather-serv.service';
import { weatherInputs } from '../model/weatherInput';
import { weatherOutput } from '../model/weatherOutput';
import { HourlyData } from '../model/HourlyData';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.css']
})
export class WeatherDashboardComponent implements OnInit,AfterViewInit {
  length = 5;
  pageSize = 3;
  pageIndex = 0;
  pageSizeOptions = [3,5,8];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  index:number=0;
  
  data!:string;

 pageEvent!: PageEvent;
 handlePageEvent(e: PageEvent) {
  this.pageEvent = e;
  this.length = this.pageEvent.length;
  // console.log(this.length);
  
  this.pageSize = e.pageSize;
  this.pageIndex = e.pageIndex;
}

// setPageSizeOptions(setPageSizeOptionsInput: string) {
//   if (setPageSizeOptionsInput) {
//     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
//   }
// }
  outputData:any[]=[];
  inputData!:weatherInputs;
  hourlyData:any[]=[];
  displayedColumns: string[] = ['Time', 'Temp', 'FeelsLike', 'Icon'];
  @ViewChild('paginator') paginator!:MatPaginator;
     dataSource=new MatTableDataSource(this.hourlyData)

     ngAfterViewInit(): void {
      this.dataSource=new MatTableDataSource(this.hourlyData)
      this.dataSource.paginator=this.paginator;
    }
  constructor(private weatherServService:WeatherServService,private router:Router,private activatedRoute:ActivatedRoute){
    this.data=this.weatherServService.getCity();
    
    this.dataProcessor()
  }

  ngOnInit(): void {
    this.weatherServService.getReloadDashboard().subscribe((flag) => {
      if (flag) {
        this.data=this.weatherServService.getCity();
        this.dataProcessor();
      }
    });
   
  }

  dataProcessor()
  {
    // console.log(this.data);
    
    this.inputData={city:this.data,days:5}
    
    this.weatherServService.getWeatherInfo(this.inputData).subscribe({
      next:res=>{
        let array=[0,1,2,3,4]
        // console.log(res);
        
        for(let index of array)
        {
          this.outputData[index]=new weatherOutput(res,index);
          // console.log(this.outputData[index]);
        
        }
        
      //  this.outputData.forEach(p=>console.log(p)) ;
        this.hourlyData=this.outputData[this.index].hour;
      this.dataSource=new MatTableDataSource(this.hourlyData)
    },
      error:err=>{console.log(err)}
    })
     
  }

  onNext()
  {
    this.index++;
    this.hourlyData=this.outputData[this.index].hour;
    // console.log(this.hourlyData);
    
    this.dataSource=new MatTableDataSource(this.hourlyData)
    this.dataSource.paginator=this.paginator;
  }
  onPrevious()
  {
    this.index--;
    this.hourlyData=this.outputData[this.index].hour;
    this.dataSource=new MatTableDataSource(this.hourlyData)
    this.dataSource.paginator=this.paginator;
  }

}
