import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GenderPipe } from './pipes/gender.pipe';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HobbyPipe } from './pipes/hobby.pipe';



@NgModule({
  declarations: [
    InvoiceDetailsComponent,
    InvoiceListComponent,
    HomeComponent,
    GenderPipe,
    ProductListComponent,
    HobbyPipe
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    ReactiveFormsModule,
  ]
})
export class InvoiceModule { }
