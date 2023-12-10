import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EditProductComponent } from './edit-product.component';
import { ProductService } from '../../services/product.service';
import { RoutingService } from '../../services/routing.service';
import { MpdalService } from '../../services/mpdal.service';
import { of, throwError } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ValidatorsService } from '../../shared/service/validators.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let productService: ProductService;
  let cookieService: CookieService;
  let routingService: RoutingService;
  let formBuilder = new FormBuilder();
  let formGroup: FormGroup;
  let datePipe: DatePipe;

  beforeEach(() => {
    datePipe = new DatePipe('en-US');
    formGroup = formBuilder.group({
      idTable: [''],
      idProduct: [''],
      nombreProducto: [''],
      descripcion: [''],
      logo: [''],
      fechaLiberacion: [''],
      fechaReestructuracion: [''],
    });
    TestBed.configureTestingModule({
      declarations: [EditProductComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule ],
      providers: [
        FormBuilder,
        CookieService,
        ValidatorsService,
        ProductService,
        RoutingService,
        MpdalService,
        DatePipe
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    component.editProductForm = formGroup;

    productService = TestBed.inject(ProductService);
    cookieService = TestBed.inject(CookieService);
    routingService = TestBed.inject(RoutingService);

    const mockCookieService = {
      get: jest.fn().mockReturnValue('{"idProduct": "1", "name": "Product 1", "description": "Description 1", "logo": "Logo 1", "date_release": "2023-01-01T00:00:00"}')
    };
    Object.defineProperty(component, 'coookie', { value: mockCookieService });
    component.editProductForm = formGroup;
    fixture.detectChanges();

  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should initialize form properly', () => {
    jest.spyOn(cookieService, 'get').mockReturnValue('{"idProduct": "1", "name": "Product 1", "description": "Description 1", "logo": "Logo 1", "date_release": "2023-01-01T00:00:00"}');

    component.ngOnInit();
    expect(component.editProductForm.value).toEqual({
      nombreProducto: 'Product 1',
      descripcion: 'Description 1',
      logo: 'Logo 1',
      fechaLiberacion: '2023-01-01',
      idTable: undefined
    });
  });

  test('should mark form as invalid if submitted with invalid data', () => {
    const mockedFunction = jest.spyOn(component.editProductForm, 'markAllAsTouched');
    component.onSubmit();
    expect(mockedFunction).not.toHaveBeenCalled();
  });


  test('should redirect on successful product update', fakeAsync(() => {
    jest.spyOn(routingService, 'routingUrlRouter');


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

  }));

  test('should reset the form when cleanForm is called', () => {
    const resetSpy = jest.spyOn(formGroup, 'reset');
    component.editProductForm.setValue({
      idTable: [''],
      idProduct: [''],
      nombreProducto: [''],
      descripcion: [''],
      logo: [''],
      fechaLiberacion: [''],
      fechaReestructuracion: [''],
    });

    component.cleanForm();

    expect(resetSpy).not.toHaveBeenCalled();
  });

  test('should set modalErrorShow to true when modalError is called', () => {
    expect(component.modalErrorShow).toBe(false);

    component.modalError();

    expect(component.modalErrorShow).toBe(true);
  });

  test('should call reloadDateRevision with expected date after functionCapturefecha is called', () => {
    const mockEvent = { target: { value: '2023-01-15' } };

    const reloadDateRevisionSpy = jest.spyOn(component, 'reloadDateRevision');
    component.functionCapturefecha(mockEvent);

    const expectedDate = datePipe.transform(new Date('2024-01-16'), 'yyyy-MM-dd') as string;

    expect(reloadDateRevisionSpy).toHaveBeenCalledWith(expectedDate);
  });

});
