import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCustomer } from './post-customer';

describe('PostCustomer', () => {
  let component: PostCustomer;
  let fixture: ComponentFixture<PostCustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCustomer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
