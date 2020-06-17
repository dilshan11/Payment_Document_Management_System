import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-proassg',
  templateUrl: './proassg.component.html',
  styleUrls: ['./proassg.component.css']
})
export class ProassgComponent implements OnInit {

  projectarr;
  viwersarr;

  constructor(private adminservice:AdminService,private projectservice:ProjectService) { }

  ngOnInit() {

    this.projectservice.project_getall().   // get all project
    subscribe(data=>{
        
        this.projectarr=data;
    });

    this.adminservice.getall_viwers()
    .subscribe(data=>{
        this.viwersarr=data;
        console.log(this.viwersarr);
    })

  }
  check_click(check,rid,cid){
    let proass;
    // console.log(p);
    // console.log(rid);
  //  console.log(p._id);
  if(check.checked){
      proass={
      p_id:this.projectarr[cid]._id,
      rid:this.viwersarr[rid]._id,
      cid:cid
    }
  }else{
      proass={
      p_id:null,
      rid:this.viwersarr[rid]._id,
      cid:cid
    }
  } 
    console.log(proass);
    this.adminservice.update_projectassign(proass)
    .subscribe(data=>{
     this.viwersarr=data;
       console.log(data);
    })
  }
  

}
