import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { Product } from "../models/product.model";

const BACKEND_URL = environment.apiUrl + "/product/";

@Injectable({ providedIn: "root" })
export class ProductsService {


  constructor(private http: HttpClient, private router: Router) {}

  getProducts(){
    return this.http.get<Product[]>(BACKEND_URL)
  }
  getProductCustomers(){
    return this.http.get<Product[]>(BACKEND_URL + 'customers' )
  }
  //customers
}
