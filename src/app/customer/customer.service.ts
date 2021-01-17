import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { Customer } from "./customer.model";

const BACKEND_URL = environment.apiUrl + "/customer/";

@Injectable({ providedIn: "root" })
export class CustomerService {
  private posts: Customer[] = [];
  private postsUpdated = new Subject<{ posts: Customer[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}



  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  findCustomers( filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3):  Observable<{ data: Customer[]; metaData: number }> {
      const queryParams = `?pageSize=${pageSize}&pageNumber=${pageNumber}&filter=${filter}&sortOrder=${sortOrder}`;
      let url =  BACKEND_URL + queryParams

    return this.http.get(
      url).pipe(
        map(res => res["data"])
    );
}

  getCustomer(id: string) {
    return this.http.get<Customer>(BACKEND_URL + id);
  }

  addcustomer(data) {
    const postData = new FormData();
    for(let key in data){
      if(key === "image"){
        postData.append("image", data["image"], data["name"]);
      } else {
      postData.append(key, data[key])
      };
    }
    this.http
      .post<{ message: string; post: Customer }>(
        BACKEND_URL,
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  updateCustomer(id: string, data: any) {
    let postData: Customer | FormData;
    if (typeof data.image === "object") {
      const postData = new FormData();
    for(let key in data){
      if(key === "image"){
        postData.append("image", data["image"], data["name"]);
      } else {
      postData.append(key, data[key])
      };
    }
    } else {
      postData = {
       ...data, id:id, products: data.products.toString()
      };
    }
    this.http
      .put(BACKEND_URL + id, postData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deleteCustomer(postId: string) {
    return this.http.delete(BACKEND_URL + postId);
  }
}
