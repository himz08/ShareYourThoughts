import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonServiceService } from '../../shared/common-service.service';
import { PostStatusInfo } from '../../Interfaces/interface';
import { AuthService } from 'src/app/auth/auth.service';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-post-status',
  templateUrl: './post-status.component.html',
  styleUrls: ['./post-status.component.css']
})
export class PostStatusComponent implements OnInit {


  postForm: FormGroup;
  postInfo: PostStatusInfo;
  submitted: Boolean = false;
  public id = 0;
  isLoggedIn : boolean = false;

  constructor(private formBuilder: FormBuilder, private commonService : CommonServiceService, private authService : AuthService) { }

  ngOnInit() {
    this.createForm();
    }
  

  createForm() {
    this.postForm = this.formBuilder.group({
      'post': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      'postTittle': ['', [Validators.required, Validators.maxLength(20)]]

    });
  }

  submitPost() {
  if (this.authService.isLoggedIn()){
    console.log(this.postForm);
    this.submitted = true;
    // stop here if form is invalid
    if (this.postForm.invalid) {
      return false;
    } else {
      this.postInfo = {
        userId : 'abc',
        message : this.postForm.controls['post'].value,
        dateTime : new Date(),
        userName : 'Himanshu',
        tittle : this.postForm.controls['postTittle'].value
      }
      this.commonService.postStatus(this.postInfo);
      console.log(this.postInfo);
      this.createForm();
      this.submitted = false;
    }
  }

  else {
    this.commonService.openSnackBar('Please Login to Post the status', 'Dismiss');
  }


}


updateP(){
  this.authService.updateProfile();
}

getD() {
  this.authService.getUserDetails();
}
}