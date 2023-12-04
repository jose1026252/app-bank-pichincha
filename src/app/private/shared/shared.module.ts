import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { FilterPipe } from './pipe/filter.pipe';



@NgModule({
  declarations: [
    SearchBoxComponent,
    FilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchBoxComponent,
    FilterPipe
  ]
})
export class SharedModule { }
