import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostStatusInfo } from '../Interfaces/interface';
import { MatSnackBar } from '@angular/material';
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
      console.log('Error',error)
    })
  }

  fetchPosts() {

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

}
