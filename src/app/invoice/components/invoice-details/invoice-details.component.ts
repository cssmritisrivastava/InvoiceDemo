import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.sass']
})
export class InvoiceDetailsComponent implements OnInit{

  constructor(private builder:FormBuilder,  private router:Router, private service:MasterService, private activeroute: ActivatedRoute){}

  pagetitle = "Create Invoice"
  invoicedetail ?: FormArray<any>;
  invoiceproduct ?: FormArray<any>;
  masterinvoice:any;
  editinvoiceid?: number;
  invoicedet: any;

  ngOnInit(): void {
    this.editinvoiceid = Number(this.activeroute.snapshot.paramMap.get('id'));
    console.log(this.editinvoiceid);
    if (this.editinvoiceid != 0) {
      this.pagetitle = "Edit Invoice";
      this.SetEditInfo(this.editinvoiceid);
    }
  }

  Hobbies: Array<any> = [
    { name: 'singing', value: 'Singing' },
    { name: 'dancing', value: 'Dancing' }, 
  ];
  
  invoiceForm=this.builder.group({
    invoiceDate:this.builder.control('', Validators.required),
    name:this.builder.control('', Validators.required),
    email:this.builder.control('', [Validators.required, Validators.email]),
    phone:this.builder.control('',[ Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    gender:this.builder.control('', Validators.required),
    
    addressLine1:this.builder.control(''),
    total:this.builder.control(0),
    details: this.builder.array([]),
    hobbies: this.builder.group({
      singing: false,
      dancing: false,
    })
  })

  onInvoiceSubmit(){
    let { hobbies, ...invoice } = this.invoiceForm.value;
    let strhob = '';
    let s: any;
    Object.keys(this.invoiceForm.controls['hobbies'].controls).forEach(
      (key) => {
        s = this.invoiceForm.controls['hobbies'].get(key);
        strhob += s.value ? 1 : 0;
      }
    );
    invoice=Object.assign(invoice,{hobbies:strhob});

    
    if(this.editinvoiceid==0){
      this.service.SaveInvoice(invoice).subscribe({
        next: (v: any) => {
          const invoiceId = v.data.id;
          if( this.invoiceForm.value.details)
          this.invoiceForm.value.details.forEach((product:any) => {
            product.invoiceId = invoiceId;
            this.service.SaveProduct(product).subscribe({
              next: (v: any) => console.log(v),
              error: (e) => console.error(e),
              complete: () => {
                //this.router.navigateByUrl('invoice-list');
              }
            });
          })
        },
        error: (e) => console.error(e),
        complete: () => console.info('invoice created')
      });
      this.router.navigateByUrl('invoice/invoice-list');
    }
    else{
      invoice=Object.assign(invoice,{id:this.editinvoiceid});
      console.log(invoice);
      this.service.UpdateInvoice(this.editinvoiceid, invoice).subscribe({
        next: (v: any) => {
          const invoiceId = v.data.id;
          // if( this.invoiceForm.value.details)
          // this.invoiceForm.value.details.forEach((product:any) => {
          //   product.invoiceId = invoiceId;
          //   this.service.UpdateProduct(product.id,product).subscribe({
          //     next: (v: any) => console.log(v),
          //     error: (e) => console.error(e),
          //     complete: () => {
          //       //this.router.navigateByUrl('invoice-list');
          //     }
          //   });
          // })
        },
        error: (e) => console.error(e),
        complete: () => console.info('invoice updated')
      });
      this.router.navigateByUrl('invoice/invoice-list');
    }
  }

  Generaterow() {
    return this.builder.group({
      invoiceId:this.builder.control(1),
      name: this.builder.control(''),
      Quantity: this.builder.control(1),
      rate: this.builder.control(0),
      amount: this.builder.control({ value: 0, disabled: true })
    });
  }

  GenerateNewrow(product: any) {
    console.log(product);
    return this.builder.group({
      InvoiceId: this.builder.control(product.InvoiceId),
      name: this.builder.control(product.name),
      Quantity: this.builder.control(product.quantity),
      rate: this.builder.control(product.rate),
      amount: this.builder.control({
        value: product.quantity * product.rate,
        disabled: true,
      }),
    });
  }
 
  SetEditInfo(invoiceid: any) {
    this.service.GetInvoiceByCode(invoiceid).subscribe(res => {
      let editdata: any;
      editdata = res;
      
      this.service.GetProductByCode(this.editinvoiceid).subscribe({
        next: (res: any) => {
          this.invoicedet = res;
          this.invoicedet = this.invoicedet.data.items;
          this.invoicedet.forEach((element: any, index: number) => {
            console.log(element);
            this.addUpdatedProduct(element);
          });
        },
      });
      this.invoiceForm.patchValue({
        name:editdata.data.name,
        invoiceDate:(editdata.data.invoiceDate),
        email:editdata.data.email,
        phone:editdata.data.phone,
        gender:editdata.data.gender,
        addressLine1:editdata.data.addressLine1,
        hobbies:editdata.data.hobbies,
        total:editdata.data.total
      })
      let hobby = editdata.data.hobbies;
      console.log(hobby);
      for (let i = 0; i < hobby.length; i++) {
        let name = this.Hobbies[i].name;
        console.log(name);
        let control = this.invoiceForm.controls['hobbies'].get(name);
        console.log(control);
        hobby[i] == '1' ? control?.setValue(true) : control?.setValue(false);
      }
    });
  }

  addNewProduct(){ 
    this.invoicedetail=this.invoiceForm.get("details") as FormArray;
    this.invoicedetail.push(this.Generaterow());
  }

  addUpdatedProduct(product: any) {
    this.invoicedetail = this.invoiceForm.get("details") as FormArray;
    console.log(this.invoicedetail);
    this.invoicedetail.push(this.GenerateNewrow(product));
  }
    
  itemCalculation(index: any) {
    this.invoicedetail = this.invoiceForm.get("details") as FormArray;
    this.invoiceproduct = this.invoicedetail.at(index) as FormArray;
    let Quantity = this.invoiceproduct.get("Quantity")?.value;
    let price = this.invoiceproduct.get("rate")?.value;
    let amount = Quantity * price;
    console.log(amount);
    this.invoiceproduct.get("amount")?.setValue(amount);
    this.totalCalculation();
  }

  totalCalculation(){
    let arr = this.invoiceForm.getRawValue().details;
    let sumtotal=0
    arr.forEach((x:any)=>{
      sumtotal=sumtotal+x.amount;
    });

    this.invoiceForm.get("total")?.setValue(sumtotal);
  }

  removeProduct(index: any){
    if(confirm('Do you want to remove?') && this.invoiceForm.value.details){
      this.invoiceForm.controls['details'].removeAt(index);
      this.totalCalculation();
      this.invoiceForm.value.details
    }
  }

  get invoiceFormControl() {
    return this.invoiceForm.controls;
  }

  get invoiceproducts() {
    return this.invoiceForm.get("details") as FormArray;
  }
}