import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // url:String='http://localhost:3000/';
  url:String='https://nameless-springs-14035.herokuapp.com/';
   
  constructor(private http:HttpClient) { }

  public admin_login(admin){
   return this.http.post(this.url+'api/user/login',admin);
  }

  public chnagePassword(chpass){
     return this.http.post(this.url+'api/user/passwordchange',chpass);
  }

  public save_users(viwer){
   return this.http.post(this.url+'api/user/save',viwer);
  }

  public getall_viwers(){
    return this.http.get(this.url+'api/user/getallviwers');
  }

  public delete_viwer(user){
    return this.http.post(this.url+'api/user/delete',user);
  }
  
  public update_projectassign(proassg){
    return this.http.post(this.url+'api/user/update',proassg);
  }
  public getProjectOfusers(name){
    return this.http.get(this.url+'api/user/getProject/'+name);
  }
}
