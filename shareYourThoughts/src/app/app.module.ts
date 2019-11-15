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
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';
import { LoaderComponent } from './shared/loader/loader.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewFeedsComponent,
    FeedOverviewComponent,
    PostStatusComponent,
    AuthComponent,
    ViewDetailsComponent,
    CommentingSectionComponent,
    LoaderComponent
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
  bootstrap: [AppComponent]
})
export class AppModule { }
