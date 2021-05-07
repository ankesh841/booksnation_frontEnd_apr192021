import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPageWithDetailsComponent } from './post-page-with-details.component';

describe('PostPageWithDetailsComponent', () => {
  let component: PostPageWithDetailsComponent;
  let fixture: ComponentFixture<PostPageWithDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPageWithDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPageWithDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
