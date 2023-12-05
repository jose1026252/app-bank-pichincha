import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { EnvironmentParamsService } from './environment-params.service';
import { ProductData } from '../interfaces/product-data.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit {

  private allProducts: ProductData[] = [];

  constructor(
    private readonly httpClient: HttpClient,
    private readonly environment: EnvironmentParamsService
  ) {

  }
  ngOnInit(): void {
    this.getAllProducts().subscribe( (resp) => { this.allProducts = resp});
  }

  //alternativa por no tener un metodo en el mockup que me consulte por id y me devuelva si esta o no esta
  getAllProducts() {
    const environment_params = this.environment.getEnvironment();
    const url = environment_params.apiProduct + `bp/products`;

    return this.httpClient.get<ProductData[]>(url);
  }

  getAllProductsValidate() {
    return this.allProducts;
  }

  getProductList(limit?: number) {

    const environment_params = this.environment.getEnvironment();
    const url = environment_params.apiProduct + `bp/products`;
    let queryParams = new HttpParams();

    if (limit as number > 0) {
      queryParams = queryParams.append('complet', false);
      queryParams = queryParams.append('page', 1);
      queryParams = queryParams.append('limit', limit!);
    }


    return this.httpClient.get<ProductData[]>(url, {params: queryParams});
  }

  updateProductData(idTable: string, product: ProductData) {
    const environment_params = this.environment.getEnvironment();
    const url = environment_params.apiProduct + `bp/products/${idTable}`;

    return this.httpClient.put<any>(url, product, {observe: 'response'});
  }

  deleteProductData(idTable: string) {
    const environment_params = this.environment.getEnvironment();
    const url = environment_params.apiProduct + `bp/products/${idTable}`;

    return this.httpClient.delete<any>(url, {observe: 'response'});
  }

  saveProductData(product: ProductData) {
    const environment_params = this.environment.getEnvironment();
    const url = environment_params.apiProduct + `bp/products`;

    return this.httpClient.post<any>(url, product, {observe: 'response'});
  }


}
