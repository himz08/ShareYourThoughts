import { Component, OnInit, OnDestroy , ChangeDetectorRef} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  faUserCircle = faUserCircle;
  userName : string;
  mobileQuery: MediaQueryList;
  isLoggedIn : boolean = false;

  constructor( media: MediaMatcher,
    private cdr: ChangeDetectorRef,
    private autService : AuthService,
    private route : Router
    ) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => cdr.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener)
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.autService.user.subscribe(user => {
      console.log('Called', user)
      this.isLoggedIn = !!user;
    })
  }

  onLoginLogoutClick(id : number){
    if(id == 1){
      this.autService.logout();
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
