import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionService {

  // url:String='http://localhost:3000/';
  url:String='https://nameless-springs-14035.herokuapp.com/';
  constructor(private http:HttpClient) { }

  public getall_viwers(){
    return this.http.get(this.url+'api/user/getallviwers');
  }

  public update_userPermission(user){
    
    return this.http.post(this.url+'api/user/update_userPermission',user);
  }
}
