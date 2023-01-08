import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.sass']
})
export class InvoiceListComponent{

  constructor(private service:MasterService,private router:Router){}

  invoiceData:any;

  ngOnInit(): void {
      this.LoadInvoice();
  }
  LoadInvoice(){
    this.service.GetAllInvoice().subscribe((res)=>{
      this.invoiceData=res;
      //console.warn("data",res);
      //console.log(this.invoiceData);
      //console.log(this.invoiceData.data.items);
      
      
    }) 
  }

  DeleteInvoice(invoiceid:any){
    if(confirm('Do you want to remove?')){
      this.service.RemoveInvoice(invoiceid).subscribe(res=>{
        let result:any;
        result=res;
        console.log(result);
        this.LoadInvoice();
      })
    }
  }

  EditInvoice(invoiceid:any){
    this.router.navigateByUrl('invoice/invoice-list/edit/'+invoiceid);
  }

  ShowProduct(invoiceid:any){
    this.router.navigateByUrl('invoice/product-list/'+invoiceid);
  }
}
