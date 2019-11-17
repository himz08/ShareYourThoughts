import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PostStatusInfo } from 'src/app/Interfaces/interface';
import { CommonServiceService } from 'src/app/shared/common-service.service';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';




@Component({
  selector: 'app-feed-overview',
  templateUrl: './feed-overview.component.html',
  styleUrls: ['./feed-overview.component.css']
})
export class FeedOverviewComponent implements OnInit, OnDestroy {

  constructor(private commonService : CommonServiceService, private authService : AuthService) { }

  posts : PostStatusInfo[];
  currentUser : User;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faComments = faComments;
  faUserCircle = faUserCircle;
  viewCommentsClicked : boolean = false;

  @Input() public postInfo : any = {
    dateTime : null,
    tittle : '',
    message : '',
    picUrl : '',
    userId : '',
    userName : '',
    likes : ['Test'],
    disLikes : ['Test'],
    postId : '',
    liked : false,
    disLiked : false
  };

  userSubscription : Subscription;

  public postInfoCpy : PostStatusInfo;
   dateTime = new Date(this.postInfo.dateTime);

  // dateTime = new Date()
 

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe( user => {
      let isLoggedIn = !!user;
      this.currentUser = user;
      this.likedDislikedStatus(isLoggedIn);
    })
  }

  onLikeDislikeClick(value : string) {
    if(!this.authService.isLoggedIn()) {
      this.commonService.openSnackBar('Please Login First', 'ok')
    }
    else {
      this.postInfoCpy = JSON.parse(JSON.stringify(this.postInfo));
      const likeIndex = this.postInfo.likes.findIndex(el => el == this.currentUser.id);
      const disLikeIndex = this.postInfo.disLikes.findIndex(el => el == this.currentUser.id);
      if(likeIndex == -1 && disLikeIndex == -1){
        if(value == 'like') {
          this.postInfo.likes.push(this.currentUser.id);
          this.postInfo.liked = true;
        }
        else if (value == 'disLike') {
          this.postInfo.disLikes.push(this.currentUser.id);
          this.postInfo.disLiked = true;
        }
      }
      else if( likeIndex != -1 ) {
        if(value == 'like') {
          this.postInfo.likes.splice(likeIndex, 1);
          this.postInfo.liked = false;
        }
        else if (value == 'disLike') {
          this.postInfo.likes.splice(likeIndex, 1);
          this.postInfo.disLikes.push(this.currentUser.id);
          this.postInfo.liked = false;
          this.postInfo.disLiked = true;
        }
      }
      else if( disLikeIndex != -1 ) {
        if(value == 'like') {
          this.postInfo.disLikes.splice(disLikeIndex, 1);
          this.postInfo.likes.push(this.currentUser.id);
          this.postInfo.disLiked = false;
          this.postInfo.liked = true;
        }
        else if (value == 'disLike') {
          this.postInfo.disLikes.splice(disLikeIndex, 1);
          this.postInfo.disLiked = false;
        }
      }
  
      this.commonService.updatePost(this.postInfo.postId, {'likes' : this.postInfo.likes , 'disLikes' : this.postInfo.disLikes} ).subscribe(res => {
  
        this.commonService.openSnackBar('Success', 'Ok');
  
      },
      error => {
          this.postInfo = this.postInfoCpy;
      }
      )
      }
  }

  likedDislikedStatus(isLoggedIn : boolean) {
    console.log('login status', isLoggedIn)
    if(isLoggedIn == true) {
    const likedIndex =  this.postInfo.likes.findIndex( el => {
      return  el === this.currentUser.id;
      })
      const disLikedIndex =  this.postInfo.disLikes.findIndex( el => {
       return el === this.currentUser.id;
      })
      likedIndex != -1 ? this.postInfo.liked = true : this.postInfo.liked = false;
      disLikedIndex != -1 ? this.postInfo.disLiked = true : this.postInfo.disLiked = false;
      console.log(this.postInfo.liked)
    }
    else {
      this.postInfo.liked = false;  // on logout UI has to be changed
      this.postInfo.disLiked = false; 
    }
  }

  viewCommentsClick() {
    this.viewCommentsClicked = !this.viewCommentsClicked;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}

