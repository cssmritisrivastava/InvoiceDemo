import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }

  GetAllInvoice(){
    return this.http.get('http://localhost:51390/api/v1/Invoice');
  }

  GetInvoiceByCode(invoiceno:any){
    return this.http.get('http://localhost:51390/api/v1/Invoice/'+invoiceno);
  }

  SaveInvoice(invoicedata:any){
    return this.http.post('http://localhost:51390/api/v1/Invoice',invoicedata);
  }

  RemoveInvoice(invoiceno:any){
    return this.http.delete('http://localhost:51390/api/v1/Invoice/'+invoiceno);
  }

  UpdateInvoice(invoiceno:any,invoicedata:any){
    return this.http.put('http://localhost:51390/api/v1/Invoice/'+invoiceno,invoicedata);
  }

  SaveProduct(productdata:any){
    return this.http.post('http://localhost:51390/api/v1/Product',productdata);
  }

  GetAllProduct(){
    return this.http.get('http://localhost:51390/api/v1/Product');
  }

  GetProductByCode(invoiceno:any){
    return this.http.get('http://localhost:51390/api/v1/Product/'+invoiceno);
  }

  UpdateProduct(productno:any,productdata:any){
    return this.http.put('http://localhost:51390/api/v1/Product/'+productno,productdata);
  }
}
