import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  moduleId: module.id, 	
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	
	credentials = { username: '', password: '' };
  errorMessage:boolean = false;
  successMessage:boolean = false;

  constructor(private route: ActivatedRoute, private router: Router,private service: AuthService) { }

  ngOnInit() {
   		
    }

    login() {
    this.service.login(this.credentials.username, this.credentials.password)
      .subscribe(
        data => {
          if(data["success"] == true)
          {
             this.successMessage = true;
             setTimeout(() => { this.successMessage = false; }, 2500);
             // this.router.navigate(['home'])
              setTimeout((router: Router) => {  this.router.navigate(['home']);},2000 );
             this.service.loggedIn = true;

          

          } 
          else
          {
            this.errorMessage = true;
            setTimeout(() => { this.errorMessage = false; }, 2500);
          }
        },
        err => { console.log(err);        }
      );
  }


}
