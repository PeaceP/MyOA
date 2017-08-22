import { DatePicker } from '@ionic-native/date-picker';
import { SalesSearvice } from './../../salesService';
import { BillingInfoPage } from './billing-info/billing-info';
import { SalesInfoPage } from './sales-info/sales-info';
import { DeliveryInfoPage } from './delivery-info/delivery-info';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ImproveQuotationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-improve-quotation',
  templateUrl: 'improve-quotation.html',
  providers:[SalesSearvice]
})
export class ImproveQuotationPage {
  remarks :any ;
  myDate :any ;
  PINumber ;
  customer ;
  seleteDate ;
  paymentList :any ;
  payment :any ;
  taxList ;
  tax ;
  deliveryRuls ;
  deliveryRulsList ;
  invoiceAddress ;
  invoiceAddressList ;
  deliveryAddress ;
  deliveryAddressList ;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private salesSearvice :SalesSearvice,
    private datePicker :DatePicker) {
      this.salesSearvice.getPaymentTermList().then(res=>{
        console.log(res)
        this.paymentList= res.result.res_data
      })
      this.salesSearvice.getTaxList().then(res=>{
        console.log(res)
        this.taxList= res.result.res_data
      })
      this.salesSearvice.getDeliveryList().then(res=>{
        console.log(res)
        this.deliveryRulsList= res.result.res_data
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImproveQuotationPage');
  }

  chooseDate(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
    }).then(
      date =>this.seleteDate = date,
      err => console.log('Error occurred while getting date: ', err)
    );
  }


  clickDeliveryInfo(){
    this.navCtrl.push(DeliveryInfoPage)
  }

  clickSalesInfo(){
    this.navCtrl.push(SalesInfoPage)

  }

  seleteCustomer(){
    



  }



  save(){

  }



  // clickBillingInfo(){
  //   this.navCtrl.push(BillingInfoPage)
  // }


}
