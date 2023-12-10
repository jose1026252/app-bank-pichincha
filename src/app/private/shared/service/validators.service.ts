import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ProductData } from '../../interfaces/product-data.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor(

  ) { }

  public isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public validateDate(dateInit: string, field: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {

      const fieldValue1 = dateInit
      const fieldValue2 = formGroup.get(field)?.value;

      if (Date.parse(fieldValue2) < Date.parse(fieldValue1)) {
        formGroup.get(field)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }

      formGroup.get(field)?.setErrors(null);
      return null;
    }

  }

  public validateDiferentDate(field1: string, field2: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      const fechaLib = +new Date(fieldValue1);
      const fechaRest = +new Date(fieldValue2);

      const time = Math.ceil(Math.abs(fechaLib - fechaRest) / (1000 * 60 * 60 * 24));

      if (time < 365) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }

  }

  public validateId(field1: string, dataProducts: ProductData[]) {

    return (formGroup: AbstractControl): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const filterId = dataProducts.filter(p => p.idProduct === fieldValue1);

      if (filterId.length > 0) {
        formGroup.get(field1)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }

      formGroup.get(field1)?.setErrors(null);
      return null;
    }

  }

}
