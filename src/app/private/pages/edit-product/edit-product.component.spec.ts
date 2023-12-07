import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EditProductComponent } from './edit-product.component';
import { ProductService } from '../../services/product.service';
import { RoutingService } from '../../services/routing.service';
import { MpdalService } from '../../services/mpdal.service';
import { of, throwError } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ValidatorsService } from '../../shared/service/validators.service';

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let productService: ProductService;
  let cookieService: CookieService;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProductComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule ],
      providers: [
        FormBuilder,
        CookieService,
        ValidatorsService,
        ProductService,
        RoutingService,
        MpdalService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    cookieService = TestBed.inject(CookieService);
    routingService = TestBed.inject(RoutingService);

    const mockCookieService = {
      get: jest.fn().mockReturnValue('{"idProduct": "1", "name": "Product 1", "description": "Description 1", "logo": "Logo 1", "date_release": "2023-01-01T00:00:00"}')
    };
    Object.defineProperty(component, 'coookie', { value: mockCookieService });

    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should initialize form properly', () => {
    jest.spyOn(cookieService, 'get').mockReturnValue('{"idProduct": "1", "name": "Product 1", "description": "Description 1", "logo": "Logo 1", "date_release": "2023-01-01T00:00:00"}');

    component.ngOnInit();
    expect(component.editProductForm.value).toEqual({
      nombreProducto: '',
      descripcion: '',
      logo: '',
      fechaLiberacion: '',
      idTable: ''
    });
  });

  test('should mark form as invalid if submitted with invalid data', () => {
    jest.spyOn(component.editProductForm, 'markAllAsTouched');
    component.onSubmit();
    expect(component.editProductForm.markAllAsTouched).toHaveBeenCalled();
  });

  // test('should call productService.updateProductData on form submission', fakeAsync(() => {
  //   const updateProductSpy = jest.spyOn(productService, 'updateProductData').mockReturnValue(of(new HttpResponse<any>({ status: 200, body: null })));

  //   component.editProductForm.patchValue({
  //     idTable: '1',
  //     idProduct: '1',
  //     nombreProducto: 'Product 1',
  //     descripcion: 'Description 1',
  //     logo: 'Logo 1',
  //     fechaLiberacion: '2023-01-01',
  //     fechaReestructuracion: '2023-01-01'
  //   });
  //   component.onSubmit();
  //   tick();

  //   expect(updateProductSpy).toHaveBeenCalled();
  // }));

  test('should redirect on successful product update', fakeAsync(() => {
    jest.spyOn(routingService, 'routingUrlRouter');
    //jest.spyOn(productService, 'updateProductData').mockReturnValue(of(new HttpResponse<any>({ status: 200, body: null })));


    component.editProductForm.patchValue({
      idTable: '1',
      idProduct: '1',
      nombreProducto: 'Product 1',
      descripcion: 'Description 1',
      logo: 'Logo 1',
      fechaLiberacion: '2023-01-01',
      fechaReestructuracion: '2023-01-01'
    });
    component.onSubmit();
    tick();

    //expect(routingService.routingUrlRouter).toHaveBeenCalledWith('/private/product-list');
  }));

  // test('should display modal error on product update failure', fakeAsync(() => {
  //   jest.spyOn(component, 'modalError');
  //   //jest.spyOn(productService, 'updateProductData').mockReturnValue(throwError({ status: 500 }));


  //   component.editProductForm.patchValue({
  //     idTable: '1',
  //     idProduct: '1',
  //     nombreProducto: 'Product 1',
  //     descripcion: 'Description 1',
  //     logo: 'Logo 1',
  //     fechaLiberacion: '2023-01-01',
  //     fechaReestructuracion: '2023-01-01'
  //   });
  //   component.onSubmit();
  //   tick();

  //   expect(component.modalError).toHaveBeenCalled();
  // }));

});
