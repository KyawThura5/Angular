import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Customer {
  id: any;
  name: string;
  phone: string;
  email: string;
}

const BASE_URL = 'http://localhost:8080/api';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private allCustomers$ = new BehaviorSubject<Customer[]>([]);

  constructor(private http: HttpClient) {
    // Automatically fetch customers when service is created
    this.fetchAllCustomers();
  }

  /** Observable stream of customers */
  watchAllCustomers(): Observable<Customer[]> {
    return this.allCustomers$.asObservable();
  }

  /** Fetch all customers from API with error handling */
  fetchAllCustomers(): void {
    this.http
      .get<Customer[]>(`${BASE_URL}/customers`)
      .pipe(
        tap((customers) => this.allCustomers$.next(customers)),
        catchError((err) => {
          console.error('Failed to fetch customers', err);
          return of([]); // fallback to empty array
        })
      )
      .subscribe();
  }

  /** Add a customer with optimistic update */
  addCustomer(newCustomer: Customer): void {
    const current = this.allCustomers$.value;
    this.http
      .post<Customer>(`${BASE_URL}/customer`, newCustomer)
      .pipe(
        catchError((err) => {
          console.error('Failed to add customer', err);
          this.allCustomers$.next(current); // rollback
          return of(null);
        })
      )
      .subscribe((savedCustomer) => {
        if (savedCustomer) {
          // Replace the optimistic update with actual server data including auto-generated ID
          const updated = [...current, savedCustomer];
          console.log('New Customer List ===========+>', updated);
          this.allCustomers$.next(updated);
        }
      });
  }

  /** Update Customer */
  updateCustomer(id: any, updated: Customer): Observable<Customer> {
    const current = this.allCustomers$.value;

    return this.http.patch<Customer>(`${BASE_URL}/customer/${id}`, updated).pipe(
      tap((savedCustomer) => {
        const updatedList = current.map((c) => (c.id === id ? savedCustomer : c));
        this.allCustomers$.next(updatedList);
      }),
      catchError((err) => {
        console.error('Failed to update customer', err);
        this.allCustomers$.next(current); // rollback
        return of(null as any);
      })
    );
  }

  getCustomerById(id: any): Observable<Customer> {
    return this.http.get<Customer>(`${BASE_URL}/customer/${id}`);
  }

  deleteCustomer(id: any): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/customer/${id}`).pipe(
      tap(() => {
        const current = this.allCustomers$.value;
        const updated = current.filter((c) => c.id !== id);
        this.allCustomers$.next(updated);
      }),
      catchError((err) => {
        console.error('Failed to delete customer', err);
        return of();
      })
    );
  }
}
