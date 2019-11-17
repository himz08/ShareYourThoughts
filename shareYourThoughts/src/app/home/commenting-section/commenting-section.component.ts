import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commenting-section',
  templateUrl: './commenting-section.component.html',
  styleUrls: ['./commenting-section.component.css']
})
export class CommentingSectionComponent implements OnInit {

  comments: string;
  count: number;
  constructor() { }

  ngOnInit() {
    this.count = 0;
  }

  receiveComment($event) {
    this.comments = $event;
    this.count = this.comments.length;
    console.log(this.comments.length);
  }

  recieveCount($event) {
    this.comments = $event;
    this.count = this.comments.length;
  }

}
