import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { PrivateRoutingModule } from './private-routing.module';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { SharedModule } from "./shared/shared.module";
import { FormsModule } from '@angular/forms';
import { RegisterProductComponent } from './pages/register-product/register-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { CookieService } from 'ngx-cookie-service';
import { ModalConfirmationComponent } from './components/modal-confirmation/modal-confirmation.component';
import { ModalErrorComponent } from './components/modal-error/modal-error.component';


@NgModule({
    declarations: [
        ProductListComponent,
        RegisterProductComponent,
        EditProductComponent,
        ModalConfirmationComponent,
        ModalErrorComponent
    ],
    imports: [
        CommonModule,
        PrivateRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [ModalConfirmationComponent],
    providers: [
      DatePipe,
      CookieService
    ]
})
export class PrivateModule { }
