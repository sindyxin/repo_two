import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newProduct: any={};
  errors:string[];
  constructor(
    private _httpService:HttpService,
    private _router:Router,

  ) { }

  ngOnInit() {
  }
  addProduct(){
    this._httpService.postProduct(this.newProduct)
    .subscribe((data:any)=>{
      console.log(data);
      this.errors = [];
      if(data.errors){
        for (var key in data.errors){
          if(key=== "name"){
            this.errors.push("Products must contain a Name and at least 3 characters long");
          }
          if(key === "quantity"){
            this.errors.push("Products must contain a Qty and must be a number greater than or equal to 0");
          }
          if(key === "price"){
            this.errors.push("Products must contain a price and must be a number greater than or equal to 0");
          }
        }
      }else{
        this._router.navigate(['/products']);
      }
    })
  }
  resetData(){
    this.errors=[];
    this.newProduct={};
    this._router.navigate(['/products/new']);
  }
}
