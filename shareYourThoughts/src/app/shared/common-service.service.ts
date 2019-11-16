import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PostStatusInfo } from '../Interfaces/interface';
import { MatSnackBar } from '@angular/material';
import { map, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private http : HttpClient, private snackBar : MatSnackBar , private authService : AuthService) { }

  newPost = new Subject<null>();

  postStatus(postData : PostStatusInfo){

    this.authService.user.pipe(take(1), exhaustMap( (user)  => {
      
    return  this.http.post('https://shareyourthoughts-4712f.firebaseio.com/posts.json', postData , {
        params : new HttpParams().set('auth', user.token )
      })
    }

    )).subscribe( data => {
      console.log(data);
    },
    error => {
      this.openSnackBar(error.error.error, 'Dismiss')
    })

  }

  fetchPosts() {
    return this.http.get('https://shareyourthoughts-4712f.firebaseio.com/posts.json').pipe(map(data => {
      return Object.values(data).sort( (a,b) => <any>new Date(b.dateTime) - <any>new Date(a.dateTime))
    }))
  }

  newStatusPosted() {
    this.newPost.next();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

}
