import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IpaService {

  // url:String='http://localhost:3000/';
  url:String='https://nameless-springs-14035.herokuapp.com/';
  constructor(private http:HttpClient) { }

  save_ipa(base){
    return this.http.post(this.url+'api/ipa/save',base);
  }
  get_ipa(pro){
    return this.http.post(this.url+'api/ipa/getall',pro);
  }
  get_barchartdata(pid){
    return this.http.get(this.url+'api/ipa/getbarchart/'+pid);
  }
}
