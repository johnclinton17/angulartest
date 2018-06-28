import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
        constructor(private authService: AuthService, private router: Router)
  {
    
  }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) 
    {
        if (this.authService.isLoggedIn())
        {
           
             this.router.navigate(['/home']);
             return false;
            }else
            {
                   
                this.router.navigate(['']);
                return true;
            }
        }
        // not logged in so redirect to login page with the return url
        // this.router.navigate(['']);
        // return false;
    }
// }