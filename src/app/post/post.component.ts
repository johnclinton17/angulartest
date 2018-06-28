import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService } from '../register.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

post: Array<any> = [];
tempID = '';
editForm: FormGroup;
editItem: any[] = [];
public dummyvalue: any;
posts: Array<any>;
editing=0;
registerval = {title:''}
returnUrl: string;


  constructor(private router: Router,  private route: ActivatedRoute, private _dataService: DataService, private registerService:RegisterService, private fb: FormBuilder) { 
  this.editForm = fb.group({
  	'title' : ['', Validators.compose([Validators.required])]
	})
}

  getpostlist() {
  this._dataService.getPosts()  
        .subscribe(res => this.posts = res);
	}

	editpostForm(comvalue:any)
   {
     this.tempID = comvalue._id;
      this.editItem = comvalue;
   }


 deleteFieldValue1(index) {
      var r = confirm("Are you sure to delete");
        if (r == true) {
          this._dataService.deletePost(index)
              .subscribe(res => {
              if(res['success']) {
                    this.getpostlist();
                  }
                  else {
                    this.dummyvalue = " Cant able to Delete";
                  }
              })
        }
     
   }

  ngOnInit() {
  	this.getpostlist();
  }



  onSubmit(comvalue:any,editForm: FormGroup)
  { 

     this.registerService.postValue(this.registerval.title)
   .subscribe();
   location.reload();


  }
}
