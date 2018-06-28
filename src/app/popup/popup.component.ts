import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service';
import { DataService } from '../data.service';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
declare var $: any;

const upload = 'http://localhost:3000/api/uploadget';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})



export class PopupComponent implements OnInit {

//variables
  company: Array<any>;
  popupForm: FormGroup;
  returnUrl: string;
  allcomp: Array<any>;
  tempID = '';
  editItem: any[] = [];
  public dummyvalue: any;
  public uploader:FileUploader = new FileUploader({url: upload, itemAlias: 'photo'});
  profile_pic: any = '';

//variables

 constructor(private router: Router,	private route: ActivatedRoute, private fb: FormBuilder, private companyService:CompanyService, private _dataService: DataService) {
	this.popupForm = fb.group({
  	'name' : ['', Validators.compose([Validators.required, Validators.maxLength(25)])],
	  'cemail' : ['', Validators.compose([Validators.required])],
	  'phone' : ['', Validators.compose([Validators.required])],
    'address' : ['', Validators.compose([Validators.required])],
    'city' : ['', Validators.compose([Validators.required])],
	})

   }

  getpopuplist()
  {
      this._dataService.getpopuplist()
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
          this._dataService.deletepopuplist(index)
              .subscribe(res => {
              if(res['success']) {
                    this.getpopuplist();
                  }
                  else {
                    this.dummyvalue = " Cant able to Delete";
                  }
              })
        }
     
   }

    formReset(comvalue:any)
    {

      $("#profile_pic").val('');
    }


  subcomForm(comvalue:any,popupForm: FormGroup)
   { 
     if(this.tempID) {
         this.companyService.updatepopup(comvalue,this.tempID)
      .subscribe(res=> {
        this.getpopuplist();
        location.reload();
       });

     }
     else {

    this.companyService.popuptest(comvalue).subscribe();    
    this.getpopuplist();
        location.reload();
     }
   }

   ngOnInit() {
  	this.getpopuplist();
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false};
     this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any)=>{}
  }

}
