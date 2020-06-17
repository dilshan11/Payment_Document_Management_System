import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';
import { DataService } from '../service/data/data.service';

@Component({
  selector: 'app-fontpage',
  templateUrl: './fontpage.component.html',
  styleUrls: ['./fontpage.component.css']
})
export class FontpageComponent implements OnInit {
    admin;
    submit:boolean=false;
    loginstatus:boolean=false;
    
  login=this.fb.group({
    uname:['',Validators.required],
    password:['',Validators.required]
  });
  constructor(private fb:FormBuilder,private adminservice:AdminService,private router:Router,private dataservice:DataService) { }
  modalstat=true;
  ngOnInit() {
  }
  get f(){return this.login.controls}

  onSubmit(clo){
   console.log(this.login.value);
    this.submit=true;               // sumbit mae true or false
    if(this.login.invalid) return;
    this.adminservice.admin_login(this.login.value)
    .subscribe(data=>{
      console.log(data);
      if(data==false){
        this.loginstatus=true;
      }
     else{
        this.admin=data[0];
       this.dataservice.admin=this.admin.username;
       sessionStorage.setItem("PDMSusername",this.dataservice.admin);
       sessionStorage.setItem("PDMSsuperadmin",this.admin.superadmin);
       sessionStorage.setItem("PDMSadmin",this.admin.admin);
       sessionStorage.setItem("PDMSviwer",this.admin.viwer);
       sessionStorage.setItem("nameofuser",this.admin.name);

      sessionStorage.setItem("permission_project",this.admin.permission_project);
      sessionStorage.setItem("permission_projectTable",this.admin.permission_projectTable);
      sessionStorage.setItem("permission_charts",this.admin.permission_charts);
      sessionStorage.setItem("permission_users",this.admin.permission_users);

       console.log(this.admin);
      clo.click();
       this.router.navigateByUrl('/mainnav')
       
     }
    });
  
  }

}
