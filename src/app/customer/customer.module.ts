import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { CustomerCreateComponent } from "./customer-create/customer-create.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { AngularMaterialModule } from "../angular-material.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [CustomerCreateComponent, CustomerListComponent],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class CustomerModule {}
