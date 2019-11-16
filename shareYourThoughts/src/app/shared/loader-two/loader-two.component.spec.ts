import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderTwoComponent } from './loader-two.component';

describe('LoaderTwoComponent', () => {
  let component: LoaderTwoComponent;
  let fixture: ComponentFixture<LoaderTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
