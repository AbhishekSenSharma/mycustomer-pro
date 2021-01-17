import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerListComponent } from "./customer/customer-list/customer-list.component";
import { CustomerCreateComponent } from "./customer/customer-create/customer-create.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: "", component: CustomerListComponent, canActivate: [AuthGuard] },
  { path: "create", component: CustomerCreateComponent, canActivate: [AuthGuard] },
  { path: "edit/:postId", component: CustomerCreateComponent, canActivate: [AuthGuard] },
  { path: "auth", loadChildren: "./auth/auth.module#AuthModule"},
  { path: 'products', loadChildren: './products/products.module#ProductsModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
