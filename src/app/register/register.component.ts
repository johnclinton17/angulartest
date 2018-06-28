import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService } from '../register.service';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
 
 user: Array<any>;
private newAttribute: any = {};
public dummyvalue: any;


// Define a users property to hold our user data
 users: Array<any>;

  constructor(private registerService:RegisterService, private _dataService: DataService,private service: AuthService) {

    // Access the Data Service's getUsers() method we defined
    
        
  }
   
getUserlist() {
  this._dataService.getUsers()  
        .subscribe(res => this.users = res);
}

 registerval = {name:'', email:'',phone:'',address:'',password:''}



deleteFieldValue3(index) {

var r = confirm("Are you sure to delete");
if (r == true) {
   this._dataService.deleteUserReg(index)
      .subscribe(res => {
      if(res['success']) {
            this.getUserlist();
          }
          else {
            this.dummyvalue = " Cant able to Delete";
          }
      })
}
     
   }


onSubmit()
{ 

   this.registerService.regValue(this.registerval.name,this.registerval.email,this.registerval.phone,this.registerval.address,this.registerval.password)
   .subscribe()
  location.reload();

}


  ngOnInit() {
  this.getUserlist();
  }


}
