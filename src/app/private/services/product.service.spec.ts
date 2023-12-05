import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ProductData } from '../interfaces/product-data.interface';

const productListMock = [
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
]

const httpClientMock = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}

describe('ProductService', () => {
  let service: ProductService;
  let errorHandleServiceMock: any;

  beforeEach(() => {
    errorHandleServiceMock = {
      handleError: jest.fn()
    };
    TestBed.configureTestingModule({
      imports: [

      ],
      providers: [
        ProductService,
        { provide: HttpClient, useValue: httpClientMock }
      ]
    });
    service = TestBed.inject(ProductService);
    httpClientMock.get.mockReturnValue(productListMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('llamado de error servicio get informacion de los productos del banco', () => {
    const error = new Error('error');
    jest.spyOn(httpClientMock, 'get').mockReturnValue(of(throwError(error)));
    const errorSpy = jest.spyOn(errorHandleServiceMock, 'handleError');
    try {
      service.getAllProducts().subscribe(() => { });
    } catch (e) {
      expect(errorSpy).toHaveBeenCalled();
    }
  })

  test('llamado de error servicio post informacion de los productos del banco', () => {
    const error = new Error('error');
    jest.spyOn(httpClientMock, 'post').mockReturnValue(of(throwError(error)));
    const errorSpy = jest.spyOn(errorHandleServiceMock, 'handleError');
    try {
      const dataProduct = {
        "idProduct": "idProduct 1",
        "name": "Cuenta Vista",
        "description": "Cuenta de ahorros con rendimientos",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2023-08-05",
        "date_revision": "2024-07-05",
        "id": "1"
      }
      service.saveProductData(dataProduct).subscribe(() => { });
    } catch (e) {
      expect(errorSpy).toHaveBeenCalled();
    }
  })

  test('llamado de error servicio put informacion de los productos del banco', () => {
    const error = new Error('error');
    jest.spyOn(httpClientMock, 'put').mockReturnValue(of(throwError(error)));
    const errorSpy = jest.spyOn(errorHandleServiceMock, 'handleError');
    try {
      const dataProduct = {
        "idProduct": "idProduct 1",
        "name": "Cuenta Vista",
        "description": "Cuenta de ahorros con rendimientos",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2023-08-05",
        "date_revision": "2024-07-05",
        "id": "1"
      }
      service.updateProductData('1', dataProduct).subscribe(() => { });
    } catch (e) {
      expect(errorSpy).toHaveBeenCalled();
    }
  })

  test('llamado de error servicio delete informacion de los productos del banco', () => {
    const error = new Error('error');
    jest.spyOn(httpClientMock, 'delete').mockReturnValue(of(throwError(error)));
    const errorSpy = jest.spyOn(errorHandleServiceMock, 'handleError');
    try {
      const dataProduct = {
        "idProduct": "idProduct 1",
        "name": "Cuenta Vista",
        "description": "Cuenta de ahorros con rendimientos",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2023-08-05",
        "date_revision": "2024-07-05",
        "id": "1"
      }
      service.deleteProductData('1').subscribe(() => { });
    } catch (e) {
      expect(errorSpy).toHaveBeenCalled();
    }
  })

  test('llamado de error servicio get informacion de los productos del banco', () => {
    const error = new Error('error');
    jest.spyOn(httpClientMock, 'get').mockReturnValue(of(throwError(error)));
    const errorSpy = jest.spyOn(errorHandleServiceMock, 'handleError');
    try {
      service.getProductList(10).subscribe(() => { });
    } catch (e) {
      expect(errorSpy).toHaveBeenCalled();
    }
  })

  test('llamado metodo que devuelve todos los productos', () => {
    const allProducts: ProductData[] = [];
    const serviceAllProduct = service.getAllProductsValidate();

    expect(serviceAllProduct).toEqual(allProducts);
  })

});
