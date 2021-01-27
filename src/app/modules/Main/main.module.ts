import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    NotAuthorizedComponent,
    MainComponent,
  ],
  imports: [
    SharedModule,
    MainRoutingModule,
    RouterModule.forChild([]),
    TranslateModule
  ],
  exports: [
  ]
})
export class MainModule { }
