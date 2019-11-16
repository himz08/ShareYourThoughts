import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostStatusInfo } from '../Interfaces/interface';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private http : HttpClient, private snackBar : MatSnackBar) { }

  postStatus(postData : PostStatusInfo){
    this.http.post('https://shareyourthoughts-4712f.firebaseio.com/posts.json', postData).subscribe( data => {
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

}
