import { Routes } from '@angular/router';
import { PostCustomer } from './components/post-customer/post-customer';
import { GetAllCustomer } from './components/get-all-customer/get-all-customer';
import { UpdateCustomer } from './components/update-customer/update-customer';

export const routes: Routes = [
  { path: 'customer', component: PostCustomer },
  { path: 'customers', component: GetAllCustomer },
  { path: 'edit-customer/:id', component: UpdateCustomer },
];
