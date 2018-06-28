import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
  export class AuthService {

   authurl:string = 'http://localhost:3000/api/userlogin';
  loggedIn:boolean = false;

  constructor( private http:Http) {
   this.loggedIn = !!localStorage.getItem('auth_token');
   }

   isLoggedIn()
   {
     return this.loggedIn;
   }

    logout()
     {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('logged');
      localStorage.removeItem('expire_check');
      this.loggedIn =  false;
     }


   login(username: string , password: string): Observable<string>
   {
      let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options       = new RequestOptions({ headers: headers }); // Create a request option

      return this.http.post(this.authurl, JSON.stringify({"username":username,"password":password}), options )
      .map(res => res.json())
      .do( res => {
        if (res.success== true){
        var expirationMS = 350 * 60 * 1000;
        var record = {value: JSON.stringify('expiry'), timestamp: new Date().getTime() + expirationMS}
        localStorage.setItem('expire_check', JSON.stringify(record));

        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('admin_role', res.admin_status);
        localStorage.setItem('logged' , res.logged_status);
          this.loggedIn=true;
        }
        else{
          this.loggedIn = false;
        }
      }).catch(this.handleError);
   }

     tokenVerify(auth_token: string) {
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request optio

    return this.http.get(this.authurl+'/tokenVerify/'+auth_token, options)
    .map(res => res.json())
    .catch(this.handleError);
  }
  
   private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      let body   = err.json() || '';
      let error  = body.error || JSON.stringify(body);
      console.log(err);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return Observable.throw(errMessage);
  }


}