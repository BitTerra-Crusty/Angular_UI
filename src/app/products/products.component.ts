import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { FormBuilder, FormGroup, FormControl  } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

   products: IProduct[] = [];
   productData !: FormGroup;
   product = {} as IProduct;

  constructor(private productService: ProductService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => this.products = products
    });

    this.productData = this.formBuilder.group({
      id: [''],
      name: [''],
      description: [''],
      price: [''],
      quantity: ['']
    });
  }

  getAllProducts()
  {
    this.productService.getProducts().subscribe({
      next: products => this.products = products
    });
  }
  createProduct():void
  {
    this.product.name = this.productData.value.name;
    this.product.description = this.productData.value.description;
    this.product.price = this.productData.value.price;
    this.product.quantity = this.productData.value.quantity;

    this.productService.createProduct(this.product).subscribe(result => {
      console.log(this.product);
    }, err => {
      console.log(err);
    })

    this.getAllProducts();
    let dismissbtn = document.getElementById("createClose");
    dismissbtn?.click();
  }

  clearProduct(): void
  {
    this.productData.controls['id'].setValue("");
    this.productData.controls['name'].setValue("");
    this.productData.controls['description'].setValue("");
    this.productData.controls['price'].setValue("");
    this.productData.controls['quantity'].setValue("");
  }

  editProduct(product: IProduct):void
  {
    this.productData.controls['id'].setValue(product.id);
    this.productData.controls['name'].setValue(product.name);
    this.productData.controls['description'].setValue(product.description);
    this.productData.controls['price'].setValue(product.price);
    this.productData.controls['quantity'].setValue(product.quantity);
  }

  updateProduct():void
  {
    this.product.id = this.productData.value.id;
    this.product.name = this.productData.value.name;
    this.product.description = this.productData.value.description;
    this.product.price = this.productData.value.price;
    this.product.quantity = this.productData.value.quantity;

    this.productService.updateProduct(this.product).subscribe(result => {
      console.log(result);
      this.getAllProducts();
    }, err => {
      console.log(err);
    })
    let dismissbtn = document.getElementById("updateClose");
    dismissbtn?.click();

  }

  deleteProduct(product: IProduct):void{
    this.productService.deleteProduct(product).subscribe(result => {
      console.log(result);
      this.getAllProducts();
    }, err => {
      console.log(err);
    })
  }

}
