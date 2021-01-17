import { NgModule } from "@angular/core";
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatTableModule,
  MatSortModule,
  MatIconModule,
  MatCheckboxModule,
  MatListModule,
  MatGridListModule
} from "@angular/material";
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatListModule,
    MatGridListModule


  ]
})
export class AngularMaterialModule {}
