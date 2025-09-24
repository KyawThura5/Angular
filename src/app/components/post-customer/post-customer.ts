import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService, Customer } from '../../service/customer-service';

@Component({
  selector: 'app-post-customer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-customer.html',
  styleUrls: ['./post-customer.css'],
})
export class PostCustomer {
  postCustomerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.postCustomerForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  postCustomer() {
    if (this.postCustomerForm.invalid) return;

    const newCustomer: Customer = this.postCustomerForm.value;
    console.log('New Customer Value =================> ', newCustomer);
    this.customerService.addCustomer(newCustomer);

    // Navigate to list; list will auto-refresh
    this.router.navigateByUrl('/customers');
  }
}
