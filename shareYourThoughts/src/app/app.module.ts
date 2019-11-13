import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewFeedsComponent } from './home/new-feeds/new-feeds.component';
import { PostStatusComponent } from './home/post-status/post-status.component';
import { ViewDetailsComponent } from './home/view-details/view-details.component';
import { CommentingSectionComponent } from './home/view-details/commenting-section/commenting-section.component';
import { MaterialModuleBundle } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeedOverviewComponent } from './home/new-feeds/feed-overview/feed-overview.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewFeedsComponent,
    FeedOverviewComponent,
    PostStatusComponent,
    ViewDetailsComponent,
    CommentingSectionComponent
  ],
  imports: [
    BrowserModule,
    MaterialModuleBundle,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
