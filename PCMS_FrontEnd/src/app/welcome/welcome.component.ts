import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data/data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
 nameofuser;
  constructor(private dataservice:DataService) { }

  ngOnInit() {
    this.nameofuser=sessionStorage.getItem('nameofuser');
  }

}
