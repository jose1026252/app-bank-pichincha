import { TestBed } from '@angular/core/testing';

import { ValidatorsService } from './validators.service';
import { ProductData } from '../../interfaces/product-data.interface';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

describe('ValidatorsService', () => {
  let service: ValidatorsService;
  let productData: ProductData[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidatorsService]
    });
    service = TestBed.inject(ValidatorsService);
    productData = [
      {
        "idProduct": "idProduct 1",
        "name": "Cuenta Vista",
        "description": "Cuenta de ahorros con rendimientos",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2023-08-05",
        "date_revision": "2024-07-05",
        "id": "1"
      },
      {
        "idProduct": "idProduct 2",
        "name": "Cuenta ahorro a la mano",
        "description": "cuenta sin iva",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2023-12-22",
        "date_revision": "2024-03-21",
        "id": "2"
      },
      {
        "idProduct": "idProduct 3",
        "name": "name 3",
        "description": "description 3",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2023-05-02T22:47:11.215Z",
        "date_revision": "2023-12-20T06:43:45.224Z",
        "id": "3"
      },
      {
        "idProduct": "idProduct 4",
        "name": "name 4",
        "description": "description 4",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2023-06-03T10:56:42.987Z",
        "date_revision": "2024-08-13T20:00:58.244Z",
        "id": "4"
      },
      {
        "idProduct": "idProduct 5",
        "name": "name 5",
        "description": "description 5",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2023-12-02T13:49:33.519Z",
        "date_revision": "2023-12-18T10:07:37.805Z",
        "id": "5"
      },
      {
        "idProduct": "idProduct 6",
        "name": "name 6",
        "description": "description 6",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2023-08-13T17:34:12.877Z",
        "date_revision": "2024-03-26T15:40:57.949Z",
        "id": "6"
      },
      {
        "idProduct": "idProduct 7",
        "name": "name 7",
        "description": "description 7",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2023-05-13T17:37:10.152Z",
        "date_revision": "2023-12-29T09:27:06.132Z",
        "id": "7"
      },
      {
        "idProduct": "idProduct 8",
        "name": "name 8",
        "description": "description 8",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2023-04-16T09:42:31.839Z",
        "date_revision": "2024-08-22T13:02:31.920Z",
        "id": "8"
      },
      {
        "idProduct": "idProduct 9",
        "name": "name 9",
        "description": "description 9",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2023-07-17T03:56:47.979Z",
        "date_revision": "2024-02-17T19:14:26.745Z",
        "id": "9"
      },
      {
        "idProduct": "idProduct 12",
        "name": "name 12",
        "description": "description 12",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2023-10-07T18:35:23.737Z",
        "date_revision": "2023-12-31T22:51:00.908Z",
        "id": "12"
      },
      {
        "idProduct": "CDT PLUS",
        "name": "CDT mas rendimiento",
        "description": "cdt con mayor rendimiento anual (5%)",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2023-12-04",
        "date_revision": "2025-01-15",
        "id": "15"
      },
      {
        "idProduct": "CUENTA +",
        "name": "Cuenta Plus",
        "description": "cuenta con devolución de iva",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2023-12-28",
        "date_revision": "2024-12-29",
        "id": "16"
      },
      {
        "idProduct": "Cuenta mas lucas",
        "name": "cuenta mas lucas",
        "description": "cuenta con mas cantidad de transacciones en el mes",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2024-01-10",
        "date_revision": "2025-10-21",
        "id": "17"
      },
      {
        "idProduct": "tarjeta plus",
        "name": "tarjeta plus",
        "description": "tarjeta plus",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2023-12-04",
        "date_revision": "2025-07-29",
        "id": "18"
      }
    ];
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });


  test('should validate date comparison correctly', () => {
    const dateInit = '2023-01-01';
    const field = 'endDate';
    const form = new FormGroup({
      endDate: new FormControl('', [])
    });

    const endDate = form.controls['endDate'].setValue('2023-01-05'); // Puedes ajustar las fechas para las pruebas
    const validator = service.validateDate(dateInit, field);
    const result = validator(form);

    expect(result).toBeNull();
  });

  test('should validate different dates correctly', () => {
    const field1 = 'startDate';
    const field2 = 'endDate';
    const form = new FormGroup({
      startDate: new FormControl('', []),
      endDate: new FormControl('', [])
    });

    const starDate = form.controls['startDate'].setValue('2023-01-01');
    const endDate = form.controls['endDate'].setValue('2024-07-01');
    const validator = service.validateDiferentDate(field1, field2);
    const result = validator(form);

    expect(result).toBeNull(); // Cambia esto según tu lógica de validación
  });

  test('should set errors when fieldValue2 is less than fieldValue1', () => {
    const dateInit = '2023-01-01';
    const field = 'fechaReestructuracion';

    const formGroup = new FormGroup({
      fechaReestructuracion: new FormControl('2022-01-01') // Simula un campo de fecha con valor anterior
    });

    const validationFunction = service.validateDate(dateInit, field);
    const validationResult: ValidationErrors | null = validationFunction(formGroup);

    expect(validationResult).toEqual({ notEqual: true });
    expect(formGroup.get(field)?.hasError('notEqual')).toBe(true);
  });

  test('should set errors when time difference between fields is less than 365 days', () => {
    const field1 = 'startDate';
    const field2 = 'endDate';

    const formGroup = new FormGroup({
      startDate: new FormControl('2022-01-01'), // Simula un campo de fecha de inicio
      endDate: new FormControl('2022-01-15') // Simula un campo de fecha de finalización, menos de 365 días después
    });

    const validationFunction = service.validateDiferentDate(field1, field2);
    const validationResult: ValidationErrors | null = validationFunction(formGroup);

    expect(validationResult).toEqual({ notEqual: true });
    expect(formGroup.get(field2)?.hasError('notEqual')).toBe(true);
  });



});
