import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from 'ng-kloten';
import { ApiService } from './api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    AuthModule
  ],
  providers: [
    ApiService
  ]
})
export class ApiModule { }
