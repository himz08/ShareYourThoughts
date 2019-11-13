import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface PostInfo {
  postId : number;
  message : string;
  dateTime : Date;
  title : string;
} 

@Component({
  selector: 'app-post-status',
  templateUrl: './post-status.component.html',
  styleUrls: ['./post-status.component.css']
})
export class PostStatusComponent implements OnInit {


  postForm: FormGroup;
  postInfo: PostInfo;
  submitted: Boolean = false;
  public id = 0;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.postForm = this.formBuilder.group({
      'post': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      'postTittle': ['', [Validators.required, Validators.maxLength(20)]]

    });
  }

  onSubmit() {
    console.log(this.postForm);
    this.submitted = true;
    // stop here if form is invalid
    if (this.postForm.invalid) {
      return false;
    } else {
      this.postInfo = {
        postId : 1,
        message : this.postForm.controls['post'].value,
        dateTime : new Date(),
        title : 'ABC'
      }
      console.log(this.postInfo);
      this.createForm();
      this.submitted = false;
    }

}
}
