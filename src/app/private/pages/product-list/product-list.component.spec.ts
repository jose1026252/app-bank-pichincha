import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { CookieService } from 'ngx-cookie-service';
import { RoutingService } from '../../services/routing.service';
import { MpdalService } from '../../services/mpdal.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../../shared/pipe/filter.pipe';
import { of } from 'rxjs';

const mockProduct = [
  {
    "idProduct": "idProduct 1",
    "name": "Cuenta Vista",
    "description": "Cuenta de ahorros con rendimientos",
    "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    "date_release": "2023-08-05",
    "date_revision": "2024-07-05",
    "id": "1"
  }
];



describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let compiled: HTMLElement;
  let productServiceMock: any;
  let cookieServiceMock: any;
  let routingServiceMock: any;
  let modalServiceMock: any;

  beforeEach(async  () => {
    productServiceMock = {
      getProductList: jest.fn(() => of([])),
      deleteProductData: jest.fn(() => of({ status: 200, statusText: 'OK' }))
    };
    cookieServiceMock = {
      deleteAll: jest.fn(),
      set: jest.fn()
    };

    routingServiceMock = {
      routingUrlRouter: jest.fn()
    };

    modalServiceMock = {
      $modalClose: of(true),
      $modalCloseError: of(true),
      $modalConfirm: of(true)
    };
    TestBed.configureTestingModule({
      declarations: [ProductListComponent, FilterPipe],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: CookieService, useValue: cookieServiceMock },
        { provide: RoutingService, useValue: routingServiceMock },
        { provide: MpdalService, useValue: modalServiceMock }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should initialize the form properly', () => {
    expect(component.productListForm).toBeDefined();

    expect(component.productListForm.value).toEqual({
      productSearch: '',
      selectRecord: 5,
    });
  });

  test('should call deleteAll on cookieService', () => {
    expect(cookieServiceMock.deleteAll).toHaveBeenCalled();
  });

  test('should call getAllProductsList on ngOnInit', () => {
    expect(productServiceMock.getProductList).toHaveBeenCalled();
  });




});
