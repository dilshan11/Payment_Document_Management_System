import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { ProjectService } from 'src/app/service/project.service';
import * as xlsx from 'xlsx';                   // xlsx for conerting angualr table to excel 

@Component({
  selector: 'app-viwers',
  templateUrl: './viwers.component.html',
  styleUrls: ['./viwers.component.css']
})
export class ViwersComponent implements OnInit {

  proamount;
  useralready=true;
  singelrwdata;
  viwers;
  add_submit=false;

  user_New=true;
  user_View=true;
  user_Edit=true;
  user_Delete=true;
  user_UserPermission=true;
  user_ProjectAssigning=true;
  user_Excel=true;

  add_user=this.addfb.group({
    add_name:['',Validators.required],
    add_uname:['',Validators.required],
    add_password:['',Validators.required],
    add_category:['',Validators.required],
    add_conNumber:['',Validators.required],
    add_status:['',Validators.required]
  })

  // @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor(private addfb:FormBuilder,private adminservice:AdminService,private projectservice:ProjectService) {
    projectservice.project_getall()
    .subscribe(data=>{
      let temp:any=data;
      this.proamount=temp.length;
      console.log(this.proamount);
    })
   }

  ngOnInit() {
    this.adminservice.getall_viwers()       // get all viwers for super admin
    .subscribe(data=>{
      this.viwers=data;
    })
    this.check_UserPermission();
  }

  check_UserPermission(){                                                       // this methode make template array true or false by using sessionStorage
    let tempStr=sessionStorage.getItem("permission_users");
       let tempArr=tempStr.split(",");                                          // split tempStr based on , 
      this.user_New=(tempArr[0]=='true');
      this.user_View=(tempArr[1]=='true');
      this.user_Edit=(tempArr[2]=='true');
      this.user_Delete=(tempArr[3]=='true');
      this.user_UserPermission=(tempArr[4]=='true');
      this.user_ProjectAssigning=(tempArr[5]=='true');
      this.user_Excel=(tempArr[6]=='true');
    console.log(tempArr);
  }

  exportToExcel(epitable) {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(epitable);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
   }

  newfunction(a,s,e,d,t){                       // new button is attached to this
    //this.add_user.reset();
    t.innerText="ADD"
    d.style.display="none";           //hide delete button
    e.style.display="none";
    s.style.display="block";// to add save changes function
    a.click();
  }
  get add_(){return this.add_user.controls}

  reformate_user(){                       // reformate for save_user
    let user=this.add_user.value;
    user.superadmin=false;
    user.admin=false;
    user.viwer=true;
    user.project=new Array(this.proamount);

    user.permission_project=[false,false,false,false];                              // this object are used in user permission
    user.permission_projectTable=[false,false,false,false];
    user.permission_charts=[false,false,false,false];
    user.permission_users=[false,false,false,false,false,false,false];

    // user.permission_project={new:0,edit:0,view:0,delete:0};                              // this object are used in user permission
    // user.permission_projectTable={new:0,save:0,email:0,excel:0};
    // user.permission_charts={1:0,2:0,3:0,4:0};
    // user.permission_users={new:0,view:0,edit:0,delete:0,userpermission:0,projectassign:0,excel:0};
    // console.log(user);
    return user;
  }
  //save user
  save_user(clo){                     // save user posting value
   
    this.add_submit=true;         // to hangle error message it help
    if(this.add_user.invalid){return}
   
    this.adminservice.save_users(this.reformate_user())
    .subscribe(data=>{
      let a:any=data;
      if(a.message=="user name already exist")
        {
          this.useralready=false;
          return
        }
        this.viwers=data;
       
        this.add_user.reset();
        Object.keys(this.add_user.controls).forEach(key => {    // reset all value after submitting
          this.add_user.controls[key].setErrors(null)
        });
        this.useralready=true;
        clo.click();
    });

    //let udetailarr=[user.add_name,user.add_uname,user.add_password,user.add_category,user.add_conNumber];
    //this.viwers.push(udetailarr);

  }

  rcolor:any;
  getrowdata(data,trow){              // this handel mouse click to yellow

   this.singelrwdata=data;
   trow.style.backgroundColor="yellow";
   if(this.rcolor!=undefined){
   this.rcolor.style.backgroundColor="white";
   }
   this.rcolor=trow;
    console.log(this.rcolor);
  }

  viewfunction(a,s,e,d,t){            //view button is attached
    t.innerText="View";
    console.log();
    d.style.display="none";
    e.style.display="none";   //edit button is hide
    s.style.display="none";     // to remove save change function
    this.add_user.setValue({
      add_name:this.singelrwdata.name,
    add_uname: this.singelrwdata.username,
    add_password: this.singelrwdata.category,
    add_category: this.singelrwdata.conNumber,
    add_conNumber: this.singelrwdata.password,
    add_status:this.singelrwdata.status
    });
    a.click();
  }

  editfunction(a,s,e,d,t){
    t.innerText="Edit";
     d.style.display="none";       
    e.style.display="block";            // edit button is showed
    s.style.display="none";             // save button is hide
    this.add_user.setValue({
      add_name:this.singelrwdata.name,
    add_uname: this.singelrwdata.username,
    add_password: this.singelrwdata.category,
    add_category: this.singelrwdata.conNumber,
    add_conNumber: this.singelrwdata.password,
    add_status:this.singelrwdata.status
    });
    a.click();
  }

  update_user(close){
    this.delete_viwer(close);
    this.save_user(close);               //update user by posting value
   
  }

  deletefunction(a,s,e,d,t){
    t.innerText="Delete"
    d.style.display="block";       
    e.style.display="none";            // edit button is showed
    s.style.display="none"; 
    

    this.add_user.setValue({
      add_name:this.singelrwdata.name,
    add_uname: this.singelrwdata.username,
    add_password: this.singelrwdata.category,
    add_category: this.singelrwdata.conNumber,
    add_conNumber: this.singelrwdata.password,
    add_status:this.singelrwdata.status
    });
    a.click();
  }

  delete_viwer(clo){                         // delete course
    this.adminservice.delete_viwer(this.singelrwdata).
    subscribe(data=>{
      this.viwers=data;

      this.add_user.reset();
        Object.keys(this.add_user.controls).forEach(key => {    // reset all value after submitting
          this.add_user.controls[key].setErrors(null)
        });
        this.useralready=true;
        clo.click();
    })
  }
}
