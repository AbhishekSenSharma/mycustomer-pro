import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../shared/services/products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  Customers;

  constructor(
    private productsService:ProductsService
  ) { }

  ngOnInit() {
    this.getCustomerProducts();
  }

  getCustomerProducts() {
    this.productsService.getProductCustomers().subscribe(x=>{
      this.Customers =x;
    });
  }

}
