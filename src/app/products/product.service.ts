import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import {HttpClient} from '@angular/common/http'
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductService
{
    private productGetUrl = "http://localhost:8080/shopping/PHP_API/API/Product/read.php";
    private productCreateUrl = "http://localhost:8080/shopping/PHP_API/API/Product/create.php";
    private productUpdateUrl = "http://localhost:8080/shopping/PHP_API/API/Product/update.php";
    private productDeleteUrl = "http://localhost:8080/shopping/PHP_API/API/Product/delete.php";

    constructor(private http: HttpClient)
    {}

    getProducts():Observable<IProduct[]> {

        return this.http.get<IProduct[]>(this.productGetUrl);
    }

    createProduct(product: IProduct): Observable<IProduct>
    {
        return this.http.post<IProduct>(this.productCreateUrl, product);
    }

    updateProduct(product: IProduct): Observable<IProduct>
    {
        return this.http.put<IProduct>(this.productUpdateUrl+"?id="+product.id, product);
    }

    deleteProduct(product: IProduct): Observable<IProduct>
    {
        console.log(product);
        return this.http.delete<IProduct>(this.productDeleteUrl+"?id="+product.id);
    }
}