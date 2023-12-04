import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProductComponent } from './register-product.component';
import { ProductService } from '../../services/product.service';
import { RoutingService } from '../../services/routing.service';
import { MpdalService } from '../../services/mpdal.service';
import { FormBuilder } from '@angular/forms';
import { ValidatorsService } from '../../shared/service/validators.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RegisterProductComponent', () => {
  let component: RegisterProductComponent;
  let fixture: ComponentFixture<RegisterProductComponent>;
  let compiled: HTMLElement;
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterProductComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ProductService,
        ValidatorsService,
        RoutingService,
        MpdalService,
        FormBuilder
      ],
    });
    fixture = TestBed.createComponent(RegisterProductComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
