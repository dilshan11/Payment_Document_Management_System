import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  admin;
  constructor() { 
    console.log(this.admin);
  }
}
