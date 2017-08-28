import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateInvoicePage } from './create-invoice';

@NgModule({
  declarations: [
    CreateInvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateInvoicePage),
  ],
  exports: [
    CreateInvoicePage
  ]
})
export class CreateInvoicePageModule {}
