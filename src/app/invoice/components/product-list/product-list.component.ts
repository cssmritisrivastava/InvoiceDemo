import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {

  constructor(private service:MasterService,private router:Router, private activeroute: ActivatedRoute){}

  invoiceData:any;
  invoiceid?: number;


  ngOnInit(): void {
      this.LoadProduct();
      this.invoiceid = Number(this.activeroute.snapshot.paramMap.get('id'));
  }
  LoadProduct(){
    this.service.GetAllProduct().subscribe((res)=>{
      this.invoiceData=res;
      //console.warn("data",res);
      //console.log(this.invoiceData);
      console.log(this.invoiceData.data.items);
      
      
    }) 
  }
}
