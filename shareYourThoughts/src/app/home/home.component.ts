import { Component, OnInit, OnDestroy , ChangeDetectorRef} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { CommonServiceService } from '../shared/common-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  faUserCircle = faUserCircle;
  mobileQuery: MediaQueryList;
  isLoggedIn : boolean = false;
  isPicAvailable : boolean = true;
 public user : {
    displayName : string,
    photoUrl : string
    
  } = {
    displayName : 'Guest',
    photoUrl : ''
  }

  constructor( media: MediaMatcher,
    private cdr: ChangeDetectorRef,
    private autService : AuthService,
    private route : Router,
    private commonService : CommonServiceService
    ) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => cdr.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener)
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.autService.user.subscribe(user => {
      this.isPicAvailable = false;
      console.log('Called', user)
      this.isLoggedIn = !!user;
      if(user) {
        this.user.displayName = user.displayName;
        if(user.photoUrl){
          this.user.photoUrl = user.photoUrl;
          this.isPicAvailable = true;
          console.log('userr',this.user)
        }
      }
      else {
        this.user.displayName = 'Guest';
        this.user.photoUrl = '';
        this.isPicAvailable = false;
      }
    })
  }

  onLoginLogoutClick(id : number){
    if(id == 1){
      this.autService.logout();
      this.commonService.openSnackBar('Logout Successful', 'Dismiss')
    }
    else if (id == 2) {
      console.log('Hi')
      this.route.navigate(['/auth']);
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
