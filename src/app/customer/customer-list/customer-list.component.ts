import { MatDialog, MatDialogRef, PageEvent } from "@angular/material";
import { Subscription } from "rxjs";

import { Customer } from "../customer.model";
import { CustomerService } from "../customer.service";
import { AuthService } from "../../auth/auth.service";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
  TemplateRef,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { CustomerDataSource } from "./customer.datasource";
import {
  debounceTime,
  distinctUntilChanged,
  tap
} from "rxjs/operators";
import { merge, fromEvent } from "rxjs";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.css"],
})
export class CustomerListComponent implements OnInit, OnDestroy, AfterViewInit {
  customers: Customer[] = [];
  isLoading = false;
  totalCustomers = 0;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private customerSub: Subscription;
  private authStatusSub: Subscription;

  displayedColumns = [
    "name",
    "description",
    "city",
    "state",
    "country",
    "action",
  ];
  dataSource: CustomerDataSource;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("input", { static: false }) input: ElementRef;
  dialogRef: MatDialogRef<any>;
  customerId: string;

  constructor(
    public customerService: CustomerService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initializeDataSource();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    fromEvent(this.input.nativeElement, "keyup")
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadCustomersPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadCustomersPage()))
      .subscribe();
  }

  initializeDataSource() {
    this.dataSource = new CustomerDataSource(this.customerService);

    this.dataSource.loadCustomers("", "asc", 0, 3);
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.customerSub = this.dataSource.postsUpdated.subscribe(
      (postData: { customers: Customer[]; count: number }) => {
        this.totalCustomers = postData.count;
        this.customers = postData.customers;
      }
    );
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  loadCustomersPage() {
    this.dataSource.loadCustomers(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  deletePermanent(customerId: string, templateRef: TemplateRef<any>) {
    this.dialogRef = this.dialog.open(templateRef);
    this.customerId = customerId;
  }

  onDelete() {
    this.isLoading = true;
    this.dialogRef.close();
    this.customerService.deleteCustomer(this.customerId).subscribe(
      () => {
        this.loadCustomersPage();
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.customerSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
