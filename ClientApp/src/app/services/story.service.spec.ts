import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StoryService } from './story.service';
import { StoryResult } from '../models/story-result';

describe('StoryService', () => {
  let service: StoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(StoryService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });




  it('getStories() should send correct GET to /api/news', () => {

    service.getStories(1, 10, 'Test').subscribe((res) => {
      expect((!!res) &&
             ('results' in res) &&
             ('totalPages' in res)).toBeTrue();
    });

    const req = httpMock.expectOne('api/news?page=1&numPerPage=10&filter=Test');
    expect(req.request.method).toEqual("GET");
    const result: StoryResult = {
      results: [],
      totalPages: 1
    };
    req.flush(result);

    httpMock.verify();
  });

});
