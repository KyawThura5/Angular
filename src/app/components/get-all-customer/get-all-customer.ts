import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomerService, Customer } from '../../service/customer-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-get-all-customer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './get-all-customer.html',
  styleUrls: ['./get-all-customer.css'],
})
export class GetAllCustomer {
  // Use observable directly to avoid manual subscription
  customers$: Observable<Customer[]>;

  constructor(private customerService: CustomerService) {
    this.customers$ = this.customerService.watchAllCustomers();
    console.log('Customer List =========>', this.customers$);
  }
}
