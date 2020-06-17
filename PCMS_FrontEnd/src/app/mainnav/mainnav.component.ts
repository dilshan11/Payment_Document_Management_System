import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainnav',
  templateUrl: './mainnav.component.html',
  styleUrls: ['./mainnav.component.css']
})
export class MainnavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  // 00D3FF
  colorChange(x,y,z){
    x.style.backgroundColor="#00D3FF";
    y.style.backgroundColor='';
    z.style.backgroundColor='';
    
  }

  
}
