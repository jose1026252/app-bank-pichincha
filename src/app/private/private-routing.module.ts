import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalConfirmationComponent } from './components/modal-confirmation/modal-confirmation.component';
const routes: Routes = [
  {
    path:'product-list',
    loadChildren: () => import('./pages/product-list/product-list.module').then(m => m.ProductListModule)
  },
  {
    path:'edit-product',
    loadChildren: () => import('./pages/edit-product/edit-product.module').then(m => m.EditProductModule)
  },
  {
    path:'register',
    loadChildren: () => import('./pages/register-product/register-product.module').then(m => m.RegisterProductModule)
  },
  {
    path: '',
    redirectTo: 'product-list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
