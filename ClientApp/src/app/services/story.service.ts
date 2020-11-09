import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StoryResult } from '../models/story-result';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private http: HttpClient) { }

  private newsUrl = 'api/news';

  //todo: error handling
  getStories(page: number, num: number, filter: string): Observable<StoryResult> {
    return this.http.get<StoryResult>(
      this.newsUrl,
      {
        params: {
          page: page.toString(),
          numPerPage: num.toString(),
          filter: filter
        }
      }
    );
  }

}
