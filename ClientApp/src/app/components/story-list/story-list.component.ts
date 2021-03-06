import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Story } from 'src/app/models/story';
import { StoryService } from 'src/app/services/story.service';

/**
 * The list of stories, with search bar and navigation buttons.
 */
@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {

  constructor(private storyService: StoryService) { }

  // Was having trouble getting rxjs debouncing working with the Prev/Next click, doing manually for now
  private debounceMilliseconds: number = 500;
  private debounceTimer: number | null = null;

  searching: boolean = false;

  page: number = 0;
  numPerPage: number = 20;
  search: string = "";

  totalPages: number = 1;
  stories: Story[];

  // Maintain height during searches.  Uses magic number, can be improved by measuring
  // height of container element after initial pull and using that.
  containerHeight: string = `${this.numPerPage * 19.5}px`;
  
  ngOnInit(): void {
    this.getStories();
  }

  /**
   * Called when anything is typed into the search box.
   */
  onSearchChange(): void {
    // Manual debounce logic
    if(this.debounceTimer !== null) {
      window.clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    this.debounceTimer = window.setTimeout(() => {
      this.debounceTimer = null;
      this.page = 0; // Reset the page when the search changes.
      this.getStories();
    }, this.debounceMilliseconds);
  }

  onPrevClick(): void {
    this.page--;
    this.getStories();
  }
  onNextClick(): void {
    this.page++;
    this.getStories();
  }

  /**
   * Calls the API to retrieve a page of stories, then sets the appropriate
   * local variables so the stories will be displayed.
   */
  getStories(): void {
    this.searching = true;
    this.storyService.getStories(this.page, this.numPerPage, this.search)
        .subscribe(storyResult => {
          this.searching = false;
          this.stories = storyResult.results;
          this.totalPages = storyResult.totalPages;
        });
  }
}
