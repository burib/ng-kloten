import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import {
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
} from '@angular/material';
import {AuthModule} from '../auth/auth.module';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    FlexLayoutModule,
    AuthModule.forRoot()
  ]
})
export class HeaderModule { }
