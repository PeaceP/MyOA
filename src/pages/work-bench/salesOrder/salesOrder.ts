import { CreateQuotesPage } from './create-quotes/create-quotes';
import { Storage } from '@ionic/storage';
import { SalesDetailPage } from './sales-detail/sales-detail';
import { SalesSearvice } from './salesService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { PurchaseBackOrderPage } from './sales-detail/purchase-back-order/purchase-back-order';
/**
 * Generated class for the SalesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-salesOrder',
  templateUrl: 'salesOrder.html',
  providers: [SalesSearvice]
})
export class SalesOrderPage {
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
  userId: number;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public salesSearvice: SalesSearvice, private storage: Storage) {
    let self = this;
    this.storage.get('user')
      .then(res => {
        self.userId = res.result.res_data.user_id;
        console.log(res);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesPage');
  }

  ionViewDidEnter() {
    this.clickOne()
  }
  clickOne() {
    this.salesSearvice.getQuotesList(0, 20, this.userId)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.quotesOrder = res.result.res_data
          console.log(this.quotesOrder)
        }
      })
  }

  doRefresh1(refresh) {
    this.isMoreData1 = true;
    this.limit = 20;
    this.offset = 0;
    this.salesSearvice.getQuotesList(0, 20, this.userId).then((res) => {
      console.log(res)
      refresh.complete();
      this.quotesOrder = res.result.res_data;
    })
  }


  doInfinite1(infiniteScroll) {
    if (this.isMoreData1 == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.salesSearvice.getQuotesList(this.offset, this.limit, this.userId).then((res) => {
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
    this.salesSearvice.getSalesOrder(0, 20, this.userId)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          let list = res.result.res_data
          for (let item of list) {
            item.amount_total = item.amount_total.toFixed(2)
          }
          this.salesOrder = list
          console.log(this.salesOrder)
        }
      })
  }

  doRefresh2(refresh) {
    this.isMoreData2 = true;
    this.limit = 20;
    this.offset = 0;
    this.salesSearvice.getSalesOrder(0, 20, this.userId).then((res) => {
      console.log(res)
      refresh.complete();
      let list = res.result.res_data
      for (let item of list) {
        item.amount_total = item.amount_total.toFixed(2)
      }
      this.salesOrder = list
    })
  }


  doInfinite2(infiniteScroll) {
    if (this.isMoreData2 == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.salesSearvice.getSalesOrder(this.offset, this.limit, this.userId).then((res) => {
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
            item.amount_total = item.amount_total.toFixed(2)
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
    this.salesSearvice.getSalesReturn(0, 20, this.userId)
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
    this.salesSearvice.getSalesReturn(0, 20, this.userId).then((res) => {
      console.log(res)
      refresh.complete();
       if (res.result && res.result.res_code == 1) {
          this.salesReturnOrder = res.result.res_data
          console.log(this.salesReturnOrder)
        }
    })
  }


  doInfinite3(infiniteScroll) {
    if (this.isMoreData3 == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.salesSearvice.getSalesReturn(this.offset, this.limit, this.userId).then((res) => {
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
    this.isMoreData1 = false;
    this.salesSearvice.searchQuotesList(this.searchName1)
      .then(res => {
        this.quotesOrder = res.result.res_data
      })
  }

  searchClick2() {
    this.isMoreData2 = false;
    this.salesSearvice.searchSalesList(this.searchName2)
      .then(res => {
        let list = res.result.res_data
        for (let item of list) {
          item.amount_total = item.amount_total.toFixed(2)
        }
        this.salesOrder = list
      })
  }


  searchClick3() {
    this.isMoreData3 = false;
    this.salesSearvice.searchSalesReturnList(this.searchName3)
      .then(res => {
        this.salesReturnOrder = res.result.res_data
      })
  }

  orderDetail1(mid) {
    this.navCtrl.push(SalesDetailPage, {
      id: mid, type: "quotesOrder"
    })
  }

  orderDetail2(mid) {
    this.navCtrl.push(SalesDetailPage, {
      id: mid, type: "salesOrder"
    })

  }

  orderDetail3(mid) {
    this.salesSearvice.getSalesReturnOrderDetail(mid).then((res) => {
      console.log(res);
      this.navCtrl.push(PurchaseBackOrderPage, {
        items: res.result.res_data
      })
    })
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
        // {
        //   text: '销售退货',
        //   handler: () => {
        //     console.log('Archive clicked');
        //     this.createSalesReturn();
        //  }
        // },
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
    this.navCtrl.push(CreateQuotesPage)
  }
  // 销售退货
  createSalesReturn() {

  }


}
