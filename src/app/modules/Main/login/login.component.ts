import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {

  invalidLogIn: boolean;
  emailConfirmed: boolean;
  isActive: boolean = true;
  constructor(private authService: AuthService,
    private router: Router, private route: ActivatedRoute) {
    this.invalidLogIn = false;
    this.emailConfirmed = true;
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/dashboard']);
    }else{
      this.router.navigate(['/login']);
    }

  }

  ngOnInit() {
  }

  signIn(credentials) {
    this.authService.postPerAction("/login", credentials).subscribe(
      result => {
        debugger;
        if (result['valid'] as boolean == true) {
          if (result['emailConfirmed'] as boolean == true) {
            localStorage.setItem("token", result["token"])
            let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
            this.router.navigate([returnUrl || '/dashboard']);
          } else {
            this.emailConfirmed = false
          }

        }
        else {
          if (!result['isActive']) {
            this.isActive = false;
          } else {
            this.invalidLogIn = true;
          }
        }
      }
    )
  }

}
