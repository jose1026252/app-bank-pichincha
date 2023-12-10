import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { CookieService } from 'ngx-cookie-service';
import { RoutingService } from '../../services/routing.service';
import { MpdalService } from '../../services/mpdal.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../../shared/pipe/filter.pipe';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductData } from '../../interfaces/product-data.interface';

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

const mockProductuniq: ProductData = {
  "idProduct": "idProduct 1",
  "name": "Cuenta Vista",
  "description": "Cuenta de ahorros con rendimientos",
  "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
  "date_release": "2023-08-05",
  "date_revision": "2024-07-05",
  "id": "1"
};



describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let compiled: HTMLElement;
  let productServiceMock: any;
  let cookieServiceMock: any;
  let routingServiceMock: any;
  let modalServiceMock: any;
  let service: ProductService;
  let routingeService: RoutingService;
  let modalService: MpdalService;

  beforeEach(async  () => {
    modalService = {
      $modalConfirm: of(true),
      modalError: jest.fn()
    } as any;

    productServiceMock = {
      getProductList: jest.fn(() => of([])),
      deleteProductData: jest.fn(() => of({ status: 200, statusText: 'OK' }))
    };
    cookieServiceMock = {
      deleteAll: jest.fn(),
      set: jest.fn()
    } as any;

    routingServiceMock = {
      routingUrlRouter: jest.fn()
    } as any;

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
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: CookieService, useValue: cookieServiceMock },
        { provide: RoutingService, useValue: routingServiceMock },
        { provide: MpdalService, useValue: modalServiceMock }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    compiled = fixture.nativeElement;
    service = fixture.debugElement.injector.get(ProductService);
    routingeService = fixture.debugElement.injector.get(RoutingService);
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

  test('should call method change records table', () => {
    const spy1 = jest.spyOn(component, 'onSelectOptionRecord')
    expect(spy1).not.toHaveBeenCalled();

  });

  test('should call method btnAddProduct', () => {
    const initFormSpy = jest.spyOn(component, 'initForm');
    const getAllProductsListSpy = jest.spyOn(component, 'getAllProductsList');

    component.reloadPage();

    expect(initFormSpy).toHaveBeenCalled();
    expect(getAllProductsListSpy).toHaveBeenCalled();

  });

  test('should call method onSelectOptionRecord', () => {
    const mockEvent = { target: { value: '5' } };

    component.onSelectOptionRecord(mockEvent);

    expect(component.record).toEqual('5');
    expect(component.result).toEqual('5');

  });

  test('should set method modal error', () => {

    component.modalError();

    expect(component.modalErrorShow).toBe(true);

  });


  test('should call method routing ', () => {
    const routingSpy = jest.spyOn(routingeService, 'routingUrlRouter');
    component.btnAddProduct();
    expect(routingSpy).toHaveBeenCalledWith('/private/register');
  });

  test('should update products when getProductList returns a non-empty response', () => {
    service.getProductList = jest.fn(() => of(mockProduct));

    component.getAllProductsList();

    expect(component.products).toEqual(mockProduct);
  });

  test('should not update products when getProductList returns an empty response', () => {
    const mockEmptyProducts: ProductData[] = [];

    service.getProductList = jest.fn(() => of(mockEmptyProducts));

    component.getAllProductsList();

    expect(component.products).toEqual([]);
  });


  test('should set messageModal and modalShow when butonRemove is called', () => {
    component.butonRemove(mockProductuniq);

    expect(component.messageModal.type).toEqual('R');
    expect(component.messageModal.message).toEqual('¿Estas seguro de eliminar el producto Cuenta Vista');
    expect(component.modalShow).toBe(false);
  });

  test('should delete product and reload page when deleteProduct is successful', () => {
    const mockProductID = '1';

    component.deleteProduct(mockProductID);

    expect(service.deleteProductData).toHaveBeenCalledWith(mockProductID);
    expect(component.modalShow).toBe(false);
  });

  it('should set cookie and route to edit-product when butonEdit is called', () => {
    component.butonEdit(mockProductuniq);

    expect(cookieServiceMock.set).toHaveBeenCalledWith('product', JSON.stringify(mockProductuniq));

    expect(routingServiceMock.routingUrlRouter).toHaveBeenCalledWith('/private/edit-product');
  });

});
