import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { CookieService } from 'ngx-cookie-service';
import { RoutingService } from '../../services/routing.service';
import { MpdalService } from '../../services/mpdal.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../../shared/pipe/filter.pipe';



describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let compiled: HTMLElement;
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent, FilterPipe],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        ProductService,
        CookieService,
        RoutingService,
        MpdalService,
        FormBuilder
      ],
    });
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  // test('debe cargar la lista de productos', () => {
  //   const dummyProduct = {
  //     "idProduct": "idProduct 1",
  //     "name": "Cuenta Vista",
  //     "description": "Cuenta de ahorros con rendimientos",
  //     "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
  //     "date_release": "2023-08-05",
  //     "date_revision": "2024-07-05",
  //     "id": "1"
  //   }

  //   const request = httpMock.expectOne('https://65693a67de53105b0dd6d125.mockapi.io/ipf-msa-productosfinancieros/bp/products');
  //   request.flush(dummyProduct);
  //   fixture.detectChanges();

  //   expect(request.request.method).toBe('GET');

  // });




});
