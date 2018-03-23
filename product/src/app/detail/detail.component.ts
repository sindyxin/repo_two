import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id:any;
  product:any={}
  error:any;
  quantity:any;
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
      this.quantity = this.product.quantity;
      console.log("get one form server", data);
    })
  }
  onDelete(id){
    if(this.quantity != 0){
      this.error = "To delete a product, the Qty must be 0."
      
    }else{
      this._httpService.deleteProduct(id)
      .subscribe((data)=>{
        console.log(id);
        this._router.navigate(['/products']);
      })

    }

  }
}
