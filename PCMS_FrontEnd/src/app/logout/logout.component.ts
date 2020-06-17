import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  correctness=true;
  admin_name_fword;
  passcorrect=true;
  submit:boolean=false;

   chpassword=this.fb.group({
     oldpassword:['',Validators.required],
     newpassword:['',Validators.required],
     confirmpassword:['',Validators.required]
   });

  constructor(private fb:FormBuilder,private adminservice:AdminService) { }

  ngOnInit() {
    this.admin_name_fword=sessionStorage.getItem('PDMSusername').substr(0,1);
   
  }

  change_password(lunch){
     
    
    lunch.click();
  }
      // remake object which is going to backened
  reformat_chpassword(){
   let chpass= this.chpassword.value;
    chpass.uname=sessionStorage.getItem('PDMSusername');
    return chpass;
  }

  save_changes(close){
    this.submit=true;
    this.correctness=this.chpassword.get('newpassword').value==this.chpassword.get('confirmpassword').value;
     
    if(!this.correctness){
      return;
    }
    if(this.chpassword.invalid){
      return;
    }
     
     let chpass=this.reformat_chpassword();
     this.adminservice.chnagePassword(chpass)    //call adminservice to post data and get observale object 
     .subscribe(data=>{
       console.log(data);
       if(data==false){
       return this.passcorrect=false;
       }
      
        // this.chpassword.reset();   // reset all value after submitting

        this.chpassword.reset()
        Object.keys(this.chpassword.controls).forEach(key => {    // reset all value after submitting
          this.chpassword.controls[key].setErrors(null)
        });
        this.correctness=true;
        this.passcorrect=true;
        close.click();
     });    
       
  }


  get chp(){return this.chpassword.controls}
}
