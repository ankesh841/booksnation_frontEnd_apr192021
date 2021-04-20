import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedBooksComponent } from './posted-books.component';

describe('PostedBooksComponent', () => {
  let component: PostedBooksComponent;
  let fixture: ComponentFixture<PostedBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostedBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
