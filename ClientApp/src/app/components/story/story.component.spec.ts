import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StoryComponent } from './story.component';

describe('StoryComponent', () => {
  let component: StoryComponent;
  let fixture: ComponentFixture<StoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });




  
  it('should render link and not span if URL exists', () => {
    component.story = {
      id: 0,
      text: "",
      title: "",
      url: "http://reddit.com/"
    };
    component.ngOnInit();
    fixture.detectChanges();
    const linkElement = fixture.debugElement.query(By.css('a.link'));
    const spanElement = fixture.debugElement.query(By.css('span.link'));
    expect((!!linkElement) && (!spanElement)).toBeTrue();
  });

  it('should render span and not link if URL does not', () => {
    component.story = {
      id: 0,
      text: "",
      title: "",
      url: ""
    };
    component.ngOnInit();
    fixture.detectChanges();
    const linkElement = fixture.debugElement.query(By.css('a.link'));
    const spanElement = fixture.debugElement.query(By.css('span.link'));
    expect((!linkElement) && (!!spanElement)).toBeTrue();
  });

  it('should render website if URL is present', () => {
    component.story = {
      id: 0,
      text: "",
      title: "",
      url: "http://reddit.com/"
    };
    component.ngOnInit();
    fixture.detectChanges();
    const websiteElement = fixture.debugElement.query(By.css('.website'));
    expect(websiteElement).toBeTruthy();
  });

  it('should not render website if URL is not present', () => {
    component.story = {
      id: 0,
      text: "",
      title: "",
      url: ""
    };
    component.ngOnInit();
    fixture.detectChanges();
    const websiteElement = fixture.debugElement.query(By.css('.website'));
    expect(websiteElement).toBeFalsy();
  });

  it('should strip protocol from URL', () => {
    component.story = {
      id: 0,
      text: "",
      title: "",
      url: "http://reddit.com/"
    };
    expect(component.extractWebsite()).toBe("reddit.com");
  });

  it('should strip path from URL', () => {
    component.story = {
      id: 0,
      text: "",
      title: "",
      url: "https://reddit.com/r/technology/"
    };
    expect(component.extractWebsite()).toBe("reddit.com");
  });

  it('should strip www from URL', () => {
    component.story = {
      id: 0,
      text: "",
      title: "",
      url: "https://www.google.com/"
    };
    expect(component.extractWebsite()).toBe("google.com");
  });

});
