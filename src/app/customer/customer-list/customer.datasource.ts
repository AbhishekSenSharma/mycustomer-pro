
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of, Subject} from "rxjs";
import { Customer } from "../customer.model";

import { CustomerService } from "../customer.service";
import {catchError, finalize} from "rxjs/operators";



export class CustomerDataSource implements DataSource<Customer> {
  private customersSubject = new BehaviorSubject<Customer[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public postsUpdated = new Subject<{ customers: Customer[]; count: any }>();

  constructor(private customerService: CustomerService) {}

  loadCustomers(
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.loadingSubject.next(true);
    this.customerService
      .findCustomers(filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((payload: { data: Customer[], metaData: any }) => {
        this.postsUpdated.next({
          customers: payload.data,
          count:  payload.metaData.length? payload.metaData[0].total:0
        });
        this.customersSubject.next(payload.data);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<Customer[]> {
    return this.customersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.customersSubject.complete();
    this.loadingSubject.complete();
  }
}
