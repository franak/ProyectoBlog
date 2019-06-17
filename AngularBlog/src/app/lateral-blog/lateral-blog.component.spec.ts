import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LateralBlogComponent } from './lateral-blog.component';

describe('LateralBlogComponent', () => {
  let component: LateralBlogComponent;
  let fixture: ComponentFixture<LateralBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LateralBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LateralBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
