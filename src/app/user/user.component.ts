import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

//variables
  company: Array<any>;
  companyForm: FormGroup;
  returnUrl: string;
  allcomp: Array<any>;
  tempID = '';
  editItem: any[] = [];
  public dummyvalue: any;
//variables

  constructor(private router: Router,	private route: ActivatedRoute, private fb: FormBuilder, private companyService:CompanyService, private _dataService: DataService) {
	this.companyForm = fb.group({
  	'name' : ['', Validators.compose([Validators.required, Validators.maxLength(25)])],
	  'cemail' : ['', Validators.compose([Validators.required])],
	  'phone' : ['', Validators.compose([Validators.required])],
    'address' : ['', Validators.compose([Validators.required])],
    'city' : ['', Validators.compose([Validators.required])],
	})

   }

   getCompanylist()
  {
      this._dataService.getCompany()
      .subscribe(res => this.allcomp = res);
  }
  

   editcomForm(comvalue:any)
   {
     this.tempID = comvalue._id;
      this.editItem = comvalue;
   }

   deleteFieldValue4(index) {
      var r = confirm("Are you sure to delete");
        if (r == true) {
          this._dataService.deleteCompany(index)
              .subscribe(res => {
              if(res['success']) {
                    this.getCompanylist();
                  }
                  else {
                    this.dummyvalue = " Cant able to Delete";
                  }
              })
        }
     
   }
    
   subcomForm(comvalue:any,companyForm: FormGroup)
   { 
     if(this.tempID) {
         this.companyService.updatecom(comvalue,this.tempID)
      .subscribe(res=> {
        this.getCompanylist();
        location.reload();
       });

     }
     else {

    this.companyService.test(comvalue).subscribe();    
    this.router.navigate(['/']); 
     }
   }

  ngOnInit() {
  	this.getCompanylist();
  }

}
