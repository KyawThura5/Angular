import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllCustomer } from './get-all-customer';

describe('GetAllCustomer', () => {
  let component: GetAllCustomer;
  let fixture: ComponentFixture<GetAllCustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllCustomer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllCustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
