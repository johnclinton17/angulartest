import { Injectable } from '@angular/core';
import { Http,Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';




@Injectable()
export class RegisterService {
 regurl: string  = "http://localhost:3000/api"
  constructor(private http:Http) { }

   regValue(name: string,email:string,phone:string,address:string,password:string)
   {
     let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
     let options = new RequestOptions({ headers: headers }); // Create a request option

     return this.http.post(this.regurl+'/register', JSON.stringify({"name":name,"email":email,"phone":phone,"address":address,"password":password}),options)
     .catch(this.handleError);
   }

   postValue(title:string)
   {
     let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
     let options = new RequestOptions({ headers: headers }); // Create a request option

     return this.http.post(this.regurl+'/post', JSON.stringify({"title":title}),options)
     .catch(this.handleError);
   }

     updateValue(id:string, name: string,email:string,phone:string,address:string,password:string)
   {
     let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
     let options = new RequestOptions({ headers: headers }); // Create a request option

     return this.http.post(this.regurl+'/register', JSON.stringify({"id":id,"name":name,"email":email,"phone":phone,"address":address,"password":password}),options)
     .catch(this.handleError);
   }
   
    postupdateValue(title:string)
   {
     let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
     let options = new RequestOptions({ headers: headers }); // Create a request option

     return this.http.post(this.regurl+'/updatepost', JSON.stringify({"title":title}),options)
     .catch(this.handleError);
   }

  private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      let body   = err.json() || '';
      let error  = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return Observable.throw(errMessage);
  }
}

