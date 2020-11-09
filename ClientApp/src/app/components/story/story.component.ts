import { Component, Input, OnInit } from '@angular/core';
import { Story } from 'src/app/models/story';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  constructor() { }

  @Input() story: Story;

  website: string;

  ngOnInit(): void {
    this.website = this.extractWebsite();
  }

  extractWebsite(): string {
    let website: string = "";
    try {
      website = this.story.url;
      website = website.substring(website.indexOf("//") + 2);
      website = website.substring(0, website.indexOf("/"));
      if(website.startsWith("www")) {
        website = website.substring(4);
      }
    } catch(ex) {
      // don't display a website if URL is ill-formatted
    }
    return website;
  }

}
