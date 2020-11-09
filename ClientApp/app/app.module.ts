import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoryListComponent } from './components/story-list/story-list.component';
import { StoryComponent } from './components/story/story.component';
import { AppComponent } from './components/app/app.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryListComponent,
    StoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
