import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  project$;
  constructor(private adminservice:AdminService) { }

  ngOnInit() {
    this.project$=this.adminservice.getProjectOfusers(sessionStorage.getItem('PDMSusername'));
    //console.log(sessionStorage.getItem('PDMSusername'));
    console.log("asasass");
  }
  templist;
  pid;
  select(list,pid){
    if(this.templist!=undefined){
    this.templist.style.backgroundColor='';
    }
    this.pid=pid;
    list.style.backgroundColor="yellow";
    this.templist=list;
     
  }
  save(){
    console.log("ere wetw");
  }

}
