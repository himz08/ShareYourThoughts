import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentingSectionComponent } from './commenting-section.component';

describe('CommentingSectionComponent', () => {
  let component: CommentingSectionComponent;
  let fixture: ComponentFixture<CommentingSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentingSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
