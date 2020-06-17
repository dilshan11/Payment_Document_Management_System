import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  // url:String='http://localhost:3000/';
  url:String='https://nameless-springs-14035.herokuapp.com/';
  constructor(private http:HttpClient) { }

  project_save(project){
    return this.http.post(this.url+'api/project/save',project);     //save bu super admin
  }

  project_getall(){
    return this.http.get(this.url+'api/project/getallproject')
  }

  project_update(project){
    return this.http.post(this.url+'api/project/update',project);
  }  
  project_getforViwes(viwer){
    return this.http.post(this.url+'api/project/getviwerproject',viwer)
  }

  project_delete(project){
    return this.http.post(this.url+'api/project/delete',project);
  }
}
