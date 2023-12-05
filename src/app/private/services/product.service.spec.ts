import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // test('Debe traer informacion de los productos del banco', (done) => {
  //   service.getAllProducts().subscribe(products => {
  //     expect(products[0].id).toBe(1)

  //     done();
  //   })
  // })

});
