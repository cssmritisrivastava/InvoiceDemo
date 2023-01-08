import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path:'invoice-list',component:InvoiceListComponent},
      {path:'invoice-list/add/:id',component:InvoiceDetailsComponent},
      {path:'invoice-list/edit/:id',component:InvoiceDetailsComponent},
      {path:'product-list/:id',component:ProductListComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
