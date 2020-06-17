import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-ptable',
  templateUrl: './ptable.component.html',
  styleUrls: ['./ptable.component.css']
})
export class PtableComponent implements OnInit {

  pro_submit=false;
  project;
  singelrwdata;
  projectNew=true;                          // template variable for new
  projectView=true;                         // template variable for view
  projectEdit=true;                         // template variable for edit
  projectDelete=true;                         // template variable for delete
  userPermission=[true,true,true,true];

  addproject=this.addfb.group({
    procode:['',Validators.required],
    proname:['',Validators.required],
    prodescription:['',Validators.required]
  })

  constructor(private addfb:FormBuilder,private router:Router,private projectservice:ProjectService) { }

  ngOnInit() {

    if(sessionStorage.getItem('PDMSsuperadmin')=="true"){
      console.log("sadmin");
      this.projectservice.project_getall()        //get all project fot super admin
      .subscribe(data=>{
        this.project=data;
      });
    }

    if(sessionStorage.getItem('PDMSadmin')=="true"){
      console.log("admin");
      this.projectservice.project_getall()        //get all project fot s admin
      .subscribe(data=>{
        this.project=data;
      });
    }

    if(sessionStorage.getItem('PDMSviwer')=="true"){
      // console.log("vierw");
      this.projectservice.project_getforViwes({uname: sessionStorage.getItem('PDMSusername')})        //get all project fot s admin
      .subscribe(data=>{
        this.project=data;
      });
    }

    this.check_UserPermission();
  }

  check_UserPermission(){                                                       // this methode make template array true or false by using sessionStorage
    let tempStr=sessionStorage.getItem("permission_project");
       let tempArr=tempStr.split(",");                                          // split tempStr based on , 
      this.projectNew=(tempArr[0]=='true');
      this.projectView=(tempArr[1]=='true');
      this.projectEdit=(tempArr[2]=='true');
      this.projectDelete=(tempArr[3]=='true');
      console.log(tempArr);
  }

  
  get pro(){return this.addproject.controls}

  newfunction(a,t,s,c,e,d){  
    e.style.display="none";
    d.style.display="none";
    s.style.display="block";
    c.style.display="block";
    this.addproject.reset();        
    
                          // this function is attaced to new button
    t.innerText="Add";
    a.click();
  }

  viewfunction(a,t,s,c,e,d){
    t.innerText="view"
    s.style.display="none";
    c.style.display="none";
    e.style.display="none";
    d.style.display="none";
    this.addproject.setValue({
      procode:this.singelrwdata.code,
      proname:this.singelrwdata.name,
      prodescription:this.singelrwdata.description
    })
    
    Object.keys(this.addproject.controls).forEach(key => {    // reset all value after submitting
      this.addproject.controls[key].setErrors(null)
    }); 
    a.click();
  }

  editfunction(a,t,s,c,e,d){
    t.innerText="Edit"
    a.click();
    s.style.display="none";
    c.style.display="block";
    e.style.display="block";
    d.style.display="none";
    this.addproject.setValue({
      procode:this.singelrwdata.code,
      proname:this.singelrwdata.name,
      prodescription:this.singelrwdata.description
    });
    this.precode=this.addproject.get('procode').value;
  }

  precode;
  edit_save(n){
    console.log(this.addproject.value);
    let sent_pro=this.addproject.value;
    sent_pro.precode=this.precode;
    this.projectservice.project_update(sent_pro).
    subscribe(data=>{
      this.project=data;
      console.log(data);
      n.click();
    });
    this.addproject.reset();
    Object.keys(this.addproject.controls).forEach(key => {    // reset all value after submitting
      this.addproject.controls[key].setErrors(null)
    }); 
  }

  deletefunction(a,t,s,c,e,d){
    t.innerText="Delete"
    a.click();
    s.style.display="none";
    c.style.display="block";
    e.style.display="none";
    d.style.display="block";
    this.addproject.setValue({
      procode:this.singelrwdata.code,
      proname:this.singelrwdata.name,
      prodescription:this.singelrwdata.description
    });
  }

  delete_save(n){
    this.projectservice.project_delete(this.addproject.value).
    subscribe(data=>{
    this.project=data;
    n.click();
    })
  }

  save_changes(n){
    this.pro_submit=true;
    let sipro=this.addproject.value;
    if(this.addproject.invalid){return}
    this.projectservice.project_save(this.addproject.value).
    subscribe(data=>{
       this.project=data;
      n.click();
     
    });
  }


  rcolor:any;
  getrowdata(data,trow){
    
   this.singelrwdata=data;
   trow.style.backgroundColor="yellow";
   if(this.rcolor!=undefined){
   this.rcolor.style.backgroundColor="white";
   }
   this.rcolor=trow;
    console.log(this.rcolor);
  }

  func2(pro){
    console.log(pro);
    this.router.navigate(['mainnav/mtabletest',pro._id]);
  }
}
