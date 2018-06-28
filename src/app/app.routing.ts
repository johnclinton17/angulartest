import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { PopupComponent } from './popup/popup.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { AuthGuard } from './auth.guard';


const appRoutes: Routes = [

    { path: 'home', component: HomeComponent,canActivate: [CanActivateRouteGuard] },
    { path: 'register', component: RegisterComponent },  
    { path: 'user', component: UserComponent },  
    { path: 'post', component: PostComponent,canActivate: [CanActivateRouteGuard] },  
    { path: 'popup', component: PopupComponent },  
    { path: '', component: LoginComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);