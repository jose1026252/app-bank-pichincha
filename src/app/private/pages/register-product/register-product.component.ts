import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../shared/service/validators.service';
import { ProductService } from '../../services/product.service';
import { RoutingService } from '../../services/routing.service';
import { ProductData } from '../../interfaces/product-data.interface';
import { MpdalService } from '../../services/mpdal.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent {
  public registerProductForm: FormGroup = new FormGroup({});
  private allProducts: ProductData[] = [];
  public modalErrorShow: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly validatorServic: ValidatorsService,
    private readonly productService: ProductService,
    private readonly routing: RoutingService,
    private readonly modalService: MpdalService,
  ) {
    this.allProducts = this.productService.getAllProductsValidate();

  }
  ngOnInit(): void {
    this.modalService.$modalCloseError.subscribe((responseModalError: any) => {this.modalErrorShow = responseModalError});
    this.initForm();
  }



  initForm() {
    this.registerProductForm = this.fb.group({
      idProduct: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      nombreProducto: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      fechaLiberacion: ['', [Validators.required]],
      fechaReestructuracion: ['', [Validators.required]],
    }, {
      validators: [
        this.validatorServic.validateDiferentDate('fechaLiberacion', 'fechaReestructuracion'),
        this.validatorServic.validateId('idProduct', this.allProducts),
      ]
    });
  }

  cleanForm() {
    this.registerProductForm.reset();
  }

  isValidField(field: string) {
    const valid = this.validatorServic.isValidField(this.registerProductForm, field);

    return valid;
  }

  onSubmit() {
    if (this.registerProductForm.invalid) {
      this.registerProductForm.markAllAsTouched();
      return;
    }
    const dataSave: ProductData = {
      idProduct: this.registerProductForm.get('idProduct')?.value,
      name: this.registerProductForm.get('nombreProducto')?.value,
      description: this.registerProductForm.get('descripcion')?.value,
      logo: this.registerProductForm.get('logo')?.value,
      date_release: this.registerProductForm.get('fechaLiberacion')?.value,
      date_revision: this.registerProductForm.get('fechaReestructuracion')?.value,
      id: '',
    }

    this.productService.saveProductData(dataSave).subscribe({
      next: (dataResponseSave) => {
        console.log('dataResponseUpdate', dataResponseSave);
        if (dataResponseSave.status === 200 || dataResponseSave.status === 201) {
          this.routing.routingUrlRouter('/private/product-list');
        }else {
          this.modalError();
        }
      },
      error: (err) => {
        this.modalError();
      }
    });
  }

  modalError() {
    this.modalErrorShow = true;
  }

}
