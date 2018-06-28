import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RegisterService } from './register.service';
import { DataService } from './data.service';
import { CompanyService } from './company.service';
import { AuthService } from './auth.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { AuthGuard } from './auth.guard';
import { FileDropDirective,FileSelectDirective } from 'ng2-file-upload';



import { AppComponent } from './app.component';
import { routing }        from './app.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { UserComponent } from './user/user.component';
import { PostComponent } from './post/post.component';
import { PopupComponent } from './popup/popup.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserComponent,
    PostComponent,
    PopupComponent,
    FileDropDirective, 
    FileSelectDirective

   ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
   
  ],
  providers: [RegisterService,DataService,CompanyService,AuthService,CanActivateRouteGuard,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
