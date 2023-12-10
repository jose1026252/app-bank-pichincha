import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProductComponent } from './register-product.component';
import { ProductService } from '../../services/product.service';
import { RoutingService } from '../../services/routing.service';
import { MpdalService } from '../../services/mpdal.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatorsService } from '../../shared/service/validators.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { of, throwError } from 'rxjs';

describe('RegisterProductComponent', () => {
  let component: RegisterProductComponent;
  let fixture: ComponentFixture<RegisterProductComponent>;
  let compiled: HTMLElement;
  let service: ProductService;
  let httpMock: HttpTestingController;
  let datePipe: DatePipe;
  let formBuilder: FormBuilder;
  let formGroup: FormGroup;

  beforeEach(() => {
    formBuilder = new FormBuilder();
    service = {
      saveProductData: jest.fn(() => of({ status: 200, statusText: 'OK' }))
    } as any;
    datePipe = new DatePipe('en-US');
    TestBed.configureTestingModule({
      declarations: [RegisterProductComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        ProductService,
        ValidatorsService,
        RoutingService,
        MpdalService,
        FormBuilder,
        DatePipe
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(RegisterProductComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
    component.registerProductForm = formBuilder.group({
      idTable: [''],
      idProduct: [''],
      nombreProducto: [''],
      descripcion: [''],
      logo: [''],
      fechaLiberacion: [''],
      fechaReestructuracion: [''],
    });
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should call reloadDateRevision with expected date after functionCapturefecha is called', () => {
    const mockEvent = { target: { value: '2023-01-15' } };
    const reloadDateRevisionSpy = jest.spyOn(component, 'reloadDateRevision');

    component.functionCapturefecha(mockEvent);

    const expectedDate = datePipe.transform(new Date('2024-01-16'), 'yyyy-MM-dd') as string;

    expect(reloadDateRevisionSpy).toHaveBeenCalledWith(expectedDate);
    expect(component.registerProductForm.get('fechaReestructuracion')?.value).toEqual(expectedDate);
  });

  test('should set modalErrorShow to true when modalError is called', () => {
    expect(component.modalErrorShow).toBe(false);

    component.modalError();

    expect(component.modalErrorShow).toBe(true);
  });



});
