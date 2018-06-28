import { Injectable } from '@angular/core';
import { Http,Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';



@Injectable()
export class DataService {

result:any;

userurl: string  = "http://localhost:3000/api/"

constructor(private _http: Http) { }

getUsers() {
  return this._http.get(this.userurl+"allusers")
      .map(result => this.result = result.json().data);
  }

   deleteUserReg(userID){
   return this._http.get(this.userurl+"deleteallusers/"+userID)
   .map(result => this.result = result.json());
  }


   getCompany() {
    return this._http.get(this.userurl+"users")
        .map(result => this.result = result.json().data);
  }
  
  deleteCompany(userID){
   return this._http.get(this.userurl+"deletemycompany/"+userID)
   .map(result => this.result = result.json());
  }

  deleteRegusers(userID){
   return this._http.get(this.userurl+"deletereguser/"+userID)
   .map(result => this.result = result.json());
  }


  getPosts(){
      return this._http.get(this.userurl+"posts")
        .map(result => this.result = result.json().data);
  }

  deletePost(userID){
   return this._http.get(this.userurl+"deleteposts/"+userID)
   .map(result => this.result = result.json());
  }

  getpopuplist() {
    return this._http.get(this.userurl+"getpopup")
        .map(result => this.result = result.json().data);
  }
  deletepopuplist(userID){
   return this._http.get(this.userurl+"deletepopup/"+userID)
   .map(result => this.result = result.json());
  }

}


