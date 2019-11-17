import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PostStatusInfo } from '../Interfaces/interface';
import { MatSnackBar } from '@angular/material';
import { map, take, exhaustMap, retry, catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private http : HttpClient, private snackBar : MatSnackBar , private commonService : CommonServiceService, private authService : AuthService) { }

  newPost = new Subject<null>();

  postStatus(postData : PostStatusInfo){
    console.log('post..', postData)
    this.authService.user.pipe(take(1), exhaustMap( (user)  => {
      
    return  this.http.post('https://shareyourthoughts-4712f.firebaseio.com/posts.json', postData , {
        params : new HttpParams().set('auth', user.token )
      })
    }

    )).subscribe( data => {
      this.newStatusPosted();
      console.log(data);
    },
    error => {
      this.openSnackBar(error.error.error, 'Dismiss')
    })

  }

  updatePost(postId : string, updatedValue : any) {
   return this.authService.user.pipe(take(1), exhaustMap( (user)  => {
      
      return  this.http.patch('https://shareyourthoughts-4712f.firebaseio.com/posts/' + postId + '.json' , updatedValue , {
          params : new HttpParams().set('auth', user.token )
        })
      }
      ))

  }

  fetchPosts() {
    return this.http.get('https://shareyourthoughts-4712f.firebaseio.com/posts.json').pipe(retry(3),map(data => {
      const temp = Object.entries(data);
      let result : PostStatusInfo[] = [];
      temp.forEach(el => {
        el[1].postId = el[0]
        result.push(el[1]);
      })
      return result.sort( (a,b) => <any>new Date(b.dateTime) - <any>new Date(a.dateTime))
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
