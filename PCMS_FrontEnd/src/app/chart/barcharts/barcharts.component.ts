import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IpaService } from 'src/app/service/ipa.service';

@Component({
  selector: 'app-barcharts',
  templateUrl: './barcharts.component.html',
  styleUrls: ['./barcharts.component.css']
})
export class BarchartsComponent implements OnInit {
  routerid;
  chartdata;
  constructor(private router:ActivatedRoute, private ipaservice:IpaService) { 
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [], label: 'Series A'},
    {data: [], label: 'Series B'}
  ];

  
  ngOnInit() {
    this.routerid= this.router.snapshot.paramMap.get('id'); 
    console.log(this.routerid);
 this.ipaservice.get_barchartdata(this.routerid).
   subscribe(data=>{
    this.chartdata=data;

    for(let a of this.chartdata){
      this.barChartLabels.push(a.ipa_no);
      this.barChartData[0].data.push(a.ctydly);
      this.barChartData[1].data.push(a.paydly);
        console.log(a.ipa_no);
        console.log(a.ctydly);
        console.log(a.paydly);
    }
   });

  
  }

}
