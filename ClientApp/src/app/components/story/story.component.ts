import { Component, Input, OnInit } from '@angular/core';
import { Story } from 'src/app/models/story';

/**
 * Displays a link to a single story.
 */
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

  /**
   * Pull the first part out of the URL so it can be displayed next to the link.
   */
  extractWebsite(): string {
    let website: string = "";
    try {
      const split = this.story.url.split("/");
      if(split.length >= 3) {
        website = split[2];
        if(website.startsWith("www.")) {
          website = website.substring(4);
        }
      }
    } catch(ex) {
      // don't display a website if URL is ill-formatted
    }
    return website;
  }

}
