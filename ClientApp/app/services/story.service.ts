import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { StoryResult } from '../models/story-result';
import { Http } from '@angular/http';

@Injectable()
export class StoryService {

  constructor(private http: Http) { }

  private newsUrl = 'api/news';

  //todo: error handling
  getStories(page: number, num: number, filter: string): Observable<StoryResult> {
    return this.http.get(
      this.newsUrl,
      {
        params: {
          page: page.toString(),
          numPerPage: num.toString(),
          filter: filter
        }
      }
    ).map((value, index) => {
      const res: StoryResult = value.json();
      return res;
    });

    // return this.http.get<StoryResult>(
    //   this.newsUrl,
    //   {
    //     params: {
    //       page: page.toString(),
    //       numPerPage: num.toString(),
    //       filter: filter
    //     }
    //   }
    // );
  }

}
