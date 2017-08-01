import { OrderPage } from './order/order';
import { InspectionDetailPage } from './inspection-detail/inspection-detail';
import { CardinfoPage } from './cardinfo/cardinfo';
import { IncomingPage} from './incoming/incoming';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SupplierListPage } from './supplier-list/supplier-list';
/**
 * Generated class for the WorkBenchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-work-bench',
  templateUrl: 'work-bench.html',
})
export class WorkBenchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkBenchPage');
  }

  card_info_clicked(){
    this.navCtrl.push(CardinfoPage)
  }

  incoming_clicked(){
    this.navCtrl.push(IncomingPage)
  }
  edit_detail(){
    
  }
  supplier_clicked(){
    this.navCtrl.push(SupplierListPage)
  }

  order_clicked(){
    this.navCtrl.push(OrderPage)
  }

}
