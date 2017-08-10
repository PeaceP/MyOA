import { SalesDetailPage } from './sales-detail/sales-detail';
import { SalesSearvice } from './salesService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the SalesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sales',
  templateUrl: 'sales.html',
  providers: [SalesSearvice]
})
export class SalesPage {
  pet: string = "1";
  searchName1: string;
  searchName2: string;
  searchName3: string;
  limit = 20;
  offset = 0;
  isMoreData1 = true;
  isMoreData2 = true;
  isMoreData3 = true;
  isMoreData4 = true;
  quotesOrder: any;
  salesOrder: any;
  salesReturnOrder: any;



  constructor(public navCtrl: NavController, public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public salesSearvice: SalesSearvice) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesPage');
  }

  clickOne() {
    this.salesSearvice.getQuotesList(0, 20)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.quotesOrder = res.result.res_data
          console.log(this.quotesOrder)
        }
      })
  }

  doRefresh1(refresh) {
    this.isMoreData2 = true;
    this.limit = 20;
    this.offset = 0;
    this.salesSearvice.getQuotesList(0, 20).then((res) => {
      console.log(res)
      refresh.complete();
      this.quotesOrder = res.result.res_data;
    })
  }


  doInfinite1(infiniteScroll) {
    if (this.isMoreData1 == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.salesSearvice.getQuotesList(this.offset, this.limit).then((res) => {
        console.log(this.offset)
        console.log(this.limit)
        let item_data = [];
        if (res.result.res_data) {
          item_data = res.result.res_data;
          if (item_data.length == 20) {
            this.isMoreData1 = true;
          }
          else {
            this.isMoreData1 = false;
          }
          for (let item of item_data) {
            this.quotesOrder.push(item);
          }
        }
        else {
          this.isMoreData1 = false;
        }
        infiniteScroll.complete();
      })
    } else {
      infiniteScroll.complete();
    }
  }


  clickTwo() {
    this.salesSearvice.getSalesOrder(0, 20)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.salesOrder = res.result.res_data
          console.log(this.salesOrder)
        }
      })
  }

  doRefresh2(refresh) {
    this.isMoreData2 = true;
    this.limit = 20;
    this.offset = 0;
    this.salesSearvice.getSalesOrder(0, 20).then((res) => {
      console.log(res)
      refresh.complete();
      this.salesOrder = res.result.res_data;
    })
  }


  doInfinite2(infiniteScroll) {
    if (this.isMoreData2 == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.salesSearvice.getSalesOrder(this.offset, this.limit).then((res) => {
        console.log(this.offset)
        console.log(this.limit)
        let item_data = [];
        if (res.result.res_data) {
          item_data = res.result.res_data;
          if (item_data.length == 20) {
            this.isMoreData2 = true;
          }
          else {
            this.isMoreData2 = false;
          }
          for (let item of item_data) {
            this.salesOrder.push(item);
          }
        }
        else {
          this.isMoreData2 = false;
        }
        infiniteScroll.complete();
      })
    } else {
      infiniteScroll.complete();
    }
  }


  clickThree() {
    this.salesSearvice.getSalesReturn(0, 20)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.salesReturnOrder = res.result.res_data
          console.log(this.salesReturnOrder)
        }
      })
  }

  doRefresh3(refresh) {
    this.isMoreData3 = true;
    this.limit = 20;
    this.offset = 0;
    this.salesSearvice.getSalesReturn(0, 20).then((res) => {
      console.log(res)
      refresh.complete();
      this.salesOrder = res.result.res_data;
    })
  }


  doInfinite3(infiniteScroll) {
    if (this.isMoreData3 == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.salesSearvice.getSalesReturn(this.offset, this.limit).then((res) => {
        console.log(this.offset)
        console.log(this.limit)
        let item_data = [];
        if (res.result.res_data) {
          item_data = res.result.res_data;
          if (item_data.length == 20) {
            this.isMoreData3 = true;
          }
          else {
            this.isMoreData3 = false;
          }
          for (let item of item_data) {
            this.salesReturnOrder.push(item);
          }
        }
        else {
          this.isMoreData3 = false;
        }
        infiniteScroll.complete();
      })
    } else {
      infiniteScroll.complete();
    }
  }

  searchClick1() {

  }

  searchClick2() {

  }


  searchClick3() {

  }

  orderDetail1() {
    this.navCtrl.push(SalesDetailPage)

  }

  orderDetail2() {

  }

  orderDetail3() {

  }



  //点击创建
  create() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '请选择订单类型',
      buttons: [
        {
          text: '报价单',
          //  role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.createQuotes();
          }
        },
        {
          text: '销售退货',
          handler: () => {
            console.log('Archive clicked');
            this.createSalesReturn();
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  // 报价单
  createQuotes() {

  }
  // 销售退货
  createSalesReturn() {

  }


}
