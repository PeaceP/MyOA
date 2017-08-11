import { SalesSearvice } from './../salesService';
import { DeliveryPage } from './delivery/delivery';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController, Popover } from 'ionic-angular';

/**
 * Generated class for the SalesDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sales-detail',
  templateUrl: 'sales-detail.html',
  providers: [SalesSearvice]
})
export class SalesDetailPage {
  popover: Popover;
  id: number;
  item: any = "";


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public salesSearvice: SalesSearvice) {
    this.popover = this.popoverCtrl.create(PopoverPage, {
      item: this
    });
    this.id = this.navParams.get('id');
    this.salesSearvice.getSalesOrderDetail(this.id).then((res) => {
      if (res.result && res.result.res_code == 1) {
        this.item = res.result.res_data;
        console.log(this.item)
      }
    })

  }

  ionViewWillLeave() {
    this.popover.dismiss()
  }

  presentPopover(myEvent) {
    this.popover.present({ ev: myEvent })
  }
}


@Component({
  template: `
    <ion-list>
      <button ion-item (click)="close()">编辑</button>
      <button ion-item (click)="close()">联系电话</button>
      <button ion-item (click)="close()">交货</button>
    </ion-list>
  `
})
export class PopoverPage {

  salesDetailPage: any

  constructor(public viewCtrl: ViewController, public navCtrl: NavController,
    public navParams: NavParams) {
    this.salesDetailPage = this.navParams.get("item")
  }

  close() {
    this.salesDetailPage.navCtrl.push(DeliveryPage)
  }

}
