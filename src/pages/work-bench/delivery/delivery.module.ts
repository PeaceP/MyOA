import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryPage } from './delivery';

@NgModule({
  declarations: [
    DeliveryPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryPage),
  ],
  exports: [
    DeliveryPage
  ]
})
export class DeliveryPageModule {}
