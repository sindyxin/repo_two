import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id:any;
  errors:string[];
  product:any={};
  constructor(
    private _httpService:HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    this._route.paramMap.subscribe((params)=>{
      console.log("edit get id", params.get('id'));
      this.id = params.get('id');
    })
    this.getOneProduct();
  }
  getOneProduct(){
    this._httpService.showOneProduct(this.id)
    .subscribe((data)=>{
      console.log("get special product from server", data);
      this.product = data;
      console.log("get one form server", data);
    })
  }
  editProduct(){
    this._httpService.updateProduct(this.product)
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
          // this.errors.push(data.errors[key].message);
        }
      }else{
        this._router.navigate(['/products']);
      }
    })
  }
  resetData(){
    this.errors=[];
    this.getOneProduct();
  }

}
