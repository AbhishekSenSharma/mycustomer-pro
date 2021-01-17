import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddressService } from "./services/address.service";
import { CheckboxListComponent } from "./components/checkbox-list/checkbox-list.component";
import { AngularMaterialModule } from "../angular-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ErrorComponent } from "./components/error/error.component";
import { ProductsService } from "./services/products.service";

@NgModule({
  declarations: [CheckboxListComponent, ErrorComponent],
  exports: [
    CheckboxListComponent,
    ErrorComponent,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AddressService, ProductsService],
  entryComponents: [ErrorComponent]
})
export class SharedModule {}
