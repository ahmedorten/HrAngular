import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  invalidRegisteration: boolean;
  needEmailConfirmation: boolean;
  fieldTextType: boolean;
  fieldTextTypeConfirm: boolean;
  passwordConfirmed: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.invalidRegisteration = false;
    this.needEmailConfirmation = false;
    this.passwordConfirmed = true;
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/dashboard']);
    }else{
      this.router.navigate(['/signup']);
    }
  }
  createNewAccount(credentials) {
    this.passwordConfirmed = true;

    if (credentials.confirmpassword === credentials.password) {
      this.authService.postPerAction('/register', credentials).subscribe((res: any) => {
        if (res.valid as boolean === true) {
          if (res.needConfirm as boolean === true) {
            this.needEmailConfirmation = true;
            alert('Thank you for your registration , Please Confirm Your Email');
          } else {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/dashboard']);
          }
        }
        else {
          this.invalidRegisteration = true;
        }
      });
    }
    else {
      this.passwordConfirmed = false;
    }

  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextTypeConfirm() {
    this.fieldTextTypeConfirm = !this.fieldTextTypeConfirm;
  }
  CheckConfirm(credentials) {
    if (credentials.confirmpassword === credentials.password) {
      this.passwordConfirmed = true;
    }
    else {
      this.passwordConfirmed = false;
    }
  }
}
