import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewFeedsComponent } from './home/new-feeds/new-feeds.component';
import { PostStatusComponent } from './home/post-status/post-status.component';
import { MaterialModuleBundle } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeedOverviewComponent } from './home/new-feeds/feed-overview/feed-overview.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app.routing.module';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderTwoComponent } from './shared/loader-two/loader-two.component';
import { CommentingSectionComponent } from './home/commenting-section/commenting-section.component';
import { DatacontainerDirective, CommentsComponent } from './home/commenting-section/comments/comments.component';
import { CommentboxComponent } from './home/commenting-section/commentbox/commentbox.component';
import { ChildboxComponent } from './home/commenting-section/childbox/childbox.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewFeedsComponent,
    FeedOverviewComponent,
    PostStatusComponent,
    AuthComponent,
    LoaderComponent,
    LoaderTwoComponent,
    CommentingSectionComponent,
    DatacontainerDirective,
    CommentsComponent,
    CommentboxComponent,
    ChildboxComponent
    
  ],
  imports: [
    BrowserModule,
    MaterialModuleBundle,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  entryComponents: [ChildboxComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
