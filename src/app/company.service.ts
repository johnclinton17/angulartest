import { Injectable } from '@angular/core';
import { Http,Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class CompanyService {
 userurl: string  = "http://localhost:3000/api/"

  constructor(private http:Http) { }


test(comvalue)
{
  let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
     let options = new RequestOptions({ headers: headers }); // Create a request option
return this.http.post(this.userurl+"company", comvalue,options)
.map(res => (res.json));

}
     
updatecom(comvalue,id)
{

  let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
  let options = new RequestOptions({ headers: headers }); // Create a request option

  return this.http.post(this.userurl+'/upcompany', {"data":comvalue,"_id":id},options)
  .map(res => (res.json));
}

popuptest(comvalue)
{
  let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
     let options = new RequestOptions({ headers: headers }); // Create a request option
return this.http.post(this.userurl+"popupmy", comvalue,options)
.map(res => (res.json));

}
   
updatepopup(comvalue,id)
{

  let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
  let options = new RequestOptions({ headers: headers }); // Create a request option

  return this.http.post(this.userurl+'updatepopup', {"data":comvalue,"_id":id},options)
  .map(res => (res.json));
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

