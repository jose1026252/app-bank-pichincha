import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductData } from '../../interfaces/product-data.interface';
import { RecordList } from '../../interfaces/record.interface';
import { CookieService } from 'ngx-cookie-service';
import { RoutingService } from '../../services/routing.service';
import { MpdalService } from '../../services/mpdal.service';
import { MessageModal } from '../../interfaces/message-modal.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public productListForm: FormGroup = this.fb.group({
    productSearch: [''],
    selectRecord: [''],
  });
  public products: ProductData[] = [];
  public productSearch: string = '';
  public listRecords: RecordList[] = [
    {
      value: 5
    },
    {
      value: 10
    },
    {
      value: 20
    },
  ];

  public result: string = '5';

  public logoBank: string = './assets/img/logo_banco.png'

  public modalShow: boolean = false;
  public modalErrorShow: boolean = false;
  public messageModal: MessageModal = {} as MessageModal;
  public record: number = 5;



  constructor(
    private readonly productService: ProductService,
    private readonly coookie: CookieService,
    private readonly routing: RoutingService,
    private readonly modalService: MpdalService,
    private readonly fb: FormBuilder,
  )
  {

  }

  ngOnInit(): void {
    this.modalService.$modalClose.subscribe((responseModal: any) => {this.modalShow = responseModal});
    this.modalService.$modalCloseError.subscribe((responseModalError: any) => {this.modalErrorShow = responseModalError});
    this.coookie.deleteAll();
    this.getAllProductsList();
    this.initForm();
  }




  initForm() {
    this.productListForm.patchValue({
      productSearch: '',
      selectRecord: '5'
    })
  }

  getAllProductsList() {
    this.productService.getProductList().subscribe({
      next: (responseProducts) => {
        if (responseProducts.length > 0) {
          this.products = responseProducts;
        }
      }
    });
  }

  butonEdit(product: ProductData) {
    this.coookie.set('product', JSON.stringify(product));
    this.routing.routingUrlRouter('/private/edit-product');
  }

  butonRemove(product: ProductData) {
    this.messageModal = {
      type: 'R',
      message: '¿Estas seguro de eliminar el producto ' + product.name
    }
    this.modalShow = true;
    this.modalService.$modalConfirm.subscribe(confirmDelete => {
      if (confirmDelete) {
        this.deleteProduct(product.id);
      }
    });
  }

  deleteProduct(idTable: string) {
    this.productService.deleteProductData(idTable).subscribe({
      next: (responseDelete) => {
        if (responseDelete.status  === 200 && responseDelete.statusText === 'OK') {
          this.reloadPage();
          this.modalShow = false;
        }else {
          this.modalShow = false;
          this.modalError();
        }
      },
      error: (err) => {
        this.modalShow = false;
        this.modalError();
      }
    });
  }

  reloadPage() {
    this.initForm();
    this.getAllProductsList();
  }

  onSelectOptionRecord(event: any) {
    this.record = event.target.value;
    this.result = this.record.toString();
  }

  btnAddProduct() {
    this.routing.routingUrlRouter('/private/register');
  }

  modalError() {
    this.modalErrorShow = true;
  }

}
