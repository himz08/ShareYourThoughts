import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedOverviewComponent } from './feed-overview.component';

describe('FeedOverviewComponent', () => {
  let component: FeedOverviewComponent;
  let fixture: ComponentFixture<FeedOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
