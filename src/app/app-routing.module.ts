import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: LoginComponent },
  { path: 'email', component: EmailComponent },
  { path: 'login', component: SignupComponent },
  { path: 'profile', component: ViewProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
