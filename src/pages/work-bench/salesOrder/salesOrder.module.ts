import { AutoCompleteModule } from 'ionic2-auto-complete';
import { CreateInvoicePage } from './sales-detail/create-invoice/create-invoice';
import { CustomerListPage } from './create-quotes/customer-list/customer-list';
import { SalesInfoPage } from './create-quotes/improve-quotation/sales-info/sales-info';
import { DeliveryInfoPage } from './create-quotes/improve-quotation/delivery-info/delivery-info';
import { BillingInfoPage } from './create-quotes/improve-quotation/billing-info/billing-info';
import { ProductionListPage } from './create-quotes/production-list/production-list';
import { AddProductionPage } from './create-quotes/add-production/add-production';
import { ImproveQuotationPage } from './create-quotes/improve-quotation/improve-quotation';
import { CreateQuotesPage } from './create-quotes/create-quotes';
import { DeliveryPage } from './sales-detail/delivery/delivery';
import { SalesOrderPage } from './salesOrder';
import { SalesDetailPage } from './sales-detail/sales-detail';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    SalesOrderPage,
    // SalesDetailPage,PopoverPage,DeliveryPage,CreateQuotesPage,ImproveQuotationPage
    // ,AddProductionPage,ProductionListPage,BillingInfoPage,DeliveryInfoPage,SalesInfoPage
    // ,CustomerListPage,CreateInvoicePage
  ],
  imports: [
    IonicPageModule.forChild(SalesOrderPage),AutoCompleteModule
  ],
  entryComponents:[
  //   SalesDetailPage,PopoverPage,DeliveryPage,CreateQuotesPage,ImproveQuotationPage
  // ,AddProductionPage,ProductionListPage,BillingInfoPage,DeliveryInfoPage,SalesInfoPage
  // ,CustomerListPage,CreateInvoicePage
  ],
  exports: [
    SalesOrderPage,
  ]
})
export class SalesOrderPageModule {}
