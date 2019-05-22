import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SsoLoginComponent } from './sso-login/sso-login.component';

const routes: Routes = [
  {
    path: 'login-with-sso',
    component: SsoLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
