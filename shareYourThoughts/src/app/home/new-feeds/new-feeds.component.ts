import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/shared/common-service.service';
import { PostStatusInfo } from '../../Interfaces/interface';

@Component({
  selector: 'app-new-feeds',
  templateUrl: './new-feeds.component.html',
  styleUrls: ['./new-feeds.component.css']
})
export class NewFeedsComponent implements OnInit {

  constructor(private commonService: CommonServiceService) { }
  public posts: PostStatusInfo[];
  public isLoading: boolean = false;
  public isError: string = null;

  ngOnInit() {
    this.fetchPosts();
    this.commonService.newPost.subscribe(data => {
      setTimeout(() => {
        this.fetchPosts();
      },1500)
    })
  }

  private fetchPosts() {
    this.isError = null;
    this.isLoading = true;
    this.commonService.fetchPosts().subscribe(data => {
      this.isLoading = false;
      this.posts = data;
      console.log(this.posts);
    },
      error => {
        this.isError = error.error.error || 'An unknown error occured ! Please refresh.';
      })
  }

}
