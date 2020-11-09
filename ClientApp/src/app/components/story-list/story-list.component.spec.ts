import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { StoryListComponent } from './story-list.component';

describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryListComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });





  it('should call getStories only once in quick succession of onSearchChange calls', async () => {
    spyOn(component, "getStories");
    for(let i = 0; i < 5; i++) {
      component.onSearchChange();
      await sleep(100);
    }
    await sleep(1000) // debounce
    expect(component.getStories).toHaveBeenCalledTimes(1);
  });
  
  it('should call getStories twice if debounce timer expired between onSearchChange calls', async () => {
    spyOn(component, "getStories");
    for(let i = 0; i < 5; i++) {
      component.onSearchChange();
      await sleep(100);
    }
    await sleep(1000)
    for(let i = 0; i < 5; i++) {
      component.onSearchChange();
      await sleep(100);
    }
    await sleep(1000)
    expect(component.getStories).toHaveBeenCalledTimes(2);
  });
  
});

function sleep(millis: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, millis));
}

