import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../shared/common-service.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthResponseData, UpdateProfile } from '../Interfaces/interface'
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  loginForm: FormGroup;
  loginMsg: string = "Login successful";
  loginMsgError: string = "Login Failed!!!";
  action: string = "Dismiss";
  isLoginMode : boolean = true;
  isLoading : boolean = false;

  constructor(private services: CommonServiceService, private router: Router, private authService : AuthService) { }

  ngOnInit() {

    this.authService.user.pipe(take(1)).subscribe( user => {
      if (!!user){
        this.router.navigate(['/home']);
      }
    }
    )

    // loginForm is structured here and linked with view using binding
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]), // Validators.required will make the field required
      'password': new FormControl(null, Validators.required),
      'name' : new FormControl(null, Validators.required),
      'picUrl' : new FormControl(null),
      'aboutYou' : new FormControl(null)
    })

  }


  switchMode(){
    this.isLoginMode = !this.isLoginMode;
    console.log(this.isLoginMode);
  }

  backtoFeeds() {
    this.router.navigate(['/home'])
  }


  onSubmit(signupMode : boolean): void {
    // in service login function is called to check database   
    
    const email = this.loginForm.value.email;
    const pass = this.loginForm.value.password;
    let obs : Observable<AuthResponseData>;
      if(!signupMode){
         obs = this.authService.login(email,pass);
      }
      else {
         obs = this.authService.signup(email,pass);
         console.log('Signup...')
      }
      console.log(signupMode);
      this.isLoading = true;
      obs.subscribe( data => {
        if(signupMode){
          const name = this.loginForm.controls['name'].value;
          const picUrl = this.loginForm.controls['picUrl'].value;
          const token = data.idToken;
          this.authService.updateProfile(name, picUrl,token).subscribe((res : UpdateProfile) => {
            console.log('Profile', res);
            this.authService.handleAuthentication(data, res.displayName, res.photoUrl );
        }, error => {
            console.log(error)
        });
        }
        this.router.navigate(['/home']);
        this.isLoading = false;
        if (this.isLoginMode){
          this.services.openSnackBar('Login Successful !', 'Ok');
        }
        else {
          this.services.openSnackBar('Signup Successful', 'okay');
        }
      },
      errMsg => {
        this.services.openSnackBar(errMsg, 'Dismiss');
        this.isLoading = false;
        this.loginForm.reset();
      }
      )
  }


}
