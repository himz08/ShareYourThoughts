import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { AuthResponseData } from '../Interfaces/interface'
import { environment } from '../../environments/environment'



@Injectable({
    providedIn : 'root'
})
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer : any;

    constructor(private http : HttpClient, private route : Router){
    }

    signup(email : string, pass : string){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAADF8jrmWmBY38pSvAXfv01AF4FJU-MQc',{
            email : email,
            password : pass,
            returnSecureToken : true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData);
        }))

    }

    login(email : string, pass : string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAADF8jrmWmBY38pSvAXfv01AF4FJU-MQc',{
            email : email,
            password : pass,
            returnSecureToken : true
        }).pipe(catchError(this.handleError) , tap(resData => {
            this.handleAuthentication(resData);
        }))
    }

    updateProfile(name : string, picUrl : string){
        const loadedUser = this.fetchUserFromLocalStorage();
        if(loadedUser){
            this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + environment.API_KEY ,{
                idToken : loadedUser.token,
                displayName : name,
                photoUrl : picUrl,
                deleteAttribute : [],
                returnSecureToken : true
             }).subscribe(data => {
                 console.log('Profile', data)
             }, error => {
                 console.log(error)
             })
        }

        else {
            console.log('Errrrro');
        }


    }

    getUserDetails() {
        const loadedUser = this.fetchUserFromLocalStorage();
        this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + environment.API_KEY, {
            idToken : loadedUser.token
        }).subscribe(data => {
            console.log('DEtails', data)
        })
    }

    isLoggedIn() {
        const user : {
            email : string,
            id : string,
            _token : string,
            _tokenExpirationDate : string
        } = JSON.parse(localStorage.getItem('user'));
        if(!user){
            return false;
        }
        else {
            return true;
        }
    }

    autoLogin() {
        const user : {
            email : string,
            id : string,
            _token : string,
            _tokenExpirationDate : string
        } = JSON.parse(localStorage.getItem('user'));
        if(!user){
            return;
        }
        const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));
        this.user.next(loadedUser);
        const remainingExpirationTime = new Date(user._tokenExpirationDate).getTime() - (new Date().getTime())
        this.autoLogout(remainingExpirationTime);
    }

    private handleError(errorRes : HttpErrorResponse){
        let errMsg = 'An unknown error occured';
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errMsg)
        }
        else {
            switch (errorRes.error.error.message){
                case "EMAIL_EXISTS" :
                errMsg = 'This email is already exists.'
                break;
                case 'EMAIL_NOT_FOUND' :
                    errMsg = 'Email is not registered'
                    break;
            }
            return throwError(errMsg)
        }
     }

     private handleAuthentication(resposneData : AuthResponseData){
         const expirationTime = new Date( new Date().getTime() + (+resposneData.expiresIn * 1000));
         const user = new User(resposneData.email , resposneData.localId , resposneData.idToken, expirationTime); 
         console.log(user);
         this.user.next(user);
         this.autoLogout(+resposneData.expiresIn * 1000)
         localStorage.setItem('user', JSON.stringify(user));
     }

     private fetchUserFromLocalStorage() : User{
        const user : {
            email : string,
            id : string,
            _token : string,
            _tokenExpirationDate : string
        } = JSON.parse(localStorage.getItem('user'));
        if(!!user){
            return new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));
        }
        else {
            return null;
        }
     }

     logout(){
         this.user.next(null);
         localStorage.clear();
        // this.commonService.openSnackBar('Logout Successful', 'Dismiss')
        //  this.route.navigate(['/auth']);
         if(this.tokenExpirationTimer){
                clearTimeout(this.tokenExpirationTimer)       
            }
            this.tokenExpirationTimer = null;
   }
    

     autoLogout(expirationTime){
       this.tokenExpirationTimer =  setTimeout(() =>{
             this.logout();
         },expirationTime)
     }
}
