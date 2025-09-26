import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer, CustomerService } from '../../service/customer-service';

@Component({
  selector: 'app-update-customer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-customer.html',
  styleUrl: './update-customer.css',
})
export class UpdateCustomer implements OnInit {
  customerForm!: FormGroup;
  customerId!: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerId = +this.route.snapshot.paramMap.get('id')!;
    console.log('Selected Customer ID ===>', this.customerId);
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });

    this.customerService.getCustomerById(this.customerId).subscribe((customer: Customer) => {
      if (customer) {
        console.log('Selected Customer ==========>', customer);
        this.customerForm.patchValue(customer);
      }
    });
  }
  onSubmit(): void {
    if (this.customerForm.valid) {
      this.customerService
        .updateCustomer(this.customerId, this.customerForm.value)
        .subscribe(() => {
          console.log('Customer updated successfully');
          this.router.navigate(['/customers']);
        });
    }
  }
}
