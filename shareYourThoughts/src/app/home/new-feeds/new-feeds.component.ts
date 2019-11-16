import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/shared/common-service.service';
import { PostStatusInfo } from '../../Interfaces/interface';

@Component({
  selector: 'app-new-feeds',
  templateUrl: './new-feeds.component.html',
  styleUrls: ['./new-feeds.component.css']
})
export class NewFeedsComponent implements OnInit {

  constructor(private commonService : CommonServiceService) { }
  public posts : PostStatusInfo[];

  ngOnInit() {
        this.commonService.fetchPosts().subscribe(data => {
          this.posts = data;
          console.log(this.posts)
  })
  }

}
