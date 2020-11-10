import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { StoryResult } from '../models/story-result';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private http: HttpClient) { }

  private newsUrl = 'api/news';

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
    ).pipe(
      catchError((err: any, caught: Observable<any>) => {
        // Return a single "result" with no link that will function as the error message
        return of({
          results: [{
            id: 0,
            text: "",
            url: "",
            title: "Error fetching data"
          }],
          totalPages: 1
        });
      })
    );
  }
}
