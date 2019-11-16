import { Component, OnInit, Input } from '@angular/core';
import { PostStatusInfo } from 'src/app/Interfaces/interface';
import { CommonServiceService } from 'src/app/shared/common-service.service';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-feed-overview',
  templateUrl: './feed-overview.component.html',
  styleUrls: ['./feed-overview.component.css']
})
export class FeedOverviewComponent implements OnInit {

  constructor(private commonService : CommonServiceService) { }

  posts : PostStatusInfo[];
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faComments = faComments;

  @Input() public postInfo : PostStatusInfo = {
    dateTime : null,
    tittle : '',
    message : '',
    picUrl : '',
    userId : '',
    userName : '',
    likes : 0,
    disLikes : 0
  };
   dateTime = new Date(this.postInfo.dateTime);

  // dateTime = new Date()
 

  ngOnInit() {
  //   this.commonService.fetchPosts().subscribe(data => {
  //     console.log(data);
  // })
  }
}

