import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewFeedsComponent } from './new-feeds/new-feeds.component';
import { PostStatusComponent } from './post-status/post-status.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { CommentingSectionComponent } from './view-details/commenting-section/commenting-section.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewFeedsComponent,
    PostStatusComponent,
    ViewDetailsComponent,
    CommentingSectionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
