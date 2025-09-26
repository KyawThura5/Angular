import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
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

  constructor(private customerService: CustomerService, private router: Router) {
    this.customers$ = this.customerService.watchAllCustomers();
    console.log('Customer List =========>', this.customers$);
  }

  editCustomer(customer: Customer) {
    this.router.navigate(['/edit-customer', customer.id]);
  }

  deleteCustomer(id: any) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => console.log(`Customer ${id} deleted successfully`),
        error: () => alert('Failed to delete customer, please try again'),
      });
    }
  }
}
