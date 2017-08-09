import { ReturnOrderDetailPage } from './../return-order-detail/return-order-detail';
import { OrderDetailPage } from './../order-detail/order-detail';
import { orderService } from './orderService';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Segment } from "ionic-angular";
/**
 * Generated class for the OrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
  providers: [orderService]
})
export class OrderPage {
  pet: string = "1";
  incomingOrder: any;
  orderMRP: any;
  priceOrder: any;
  returnOrder: any;
  limit = 20;
  offset = 0;
  isMoreData1 = true;
  isMoreData2 = true;
  isMoreData3 = true;
  isMoreData4 = true;
  searchName: any;
  returnOrderSearchName: any;

  // @ViewChild('mainSegment') mainSegment: Segment;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public orderService: orderService,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
    // this.mainSegment.setValue('1')
    this.clickOne()
  }

  clickOne() {
    this.orderService.requestMakeOrderByMRP(0, 20)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.orderMRP = res.result.res_data
          console.log(this.orderMRP)
        }
      })
  }

  doRefresh1(refresh) {
    this.isMoreData1 = true;
    this.limit = 20;
    this.offset = 0;
    this.orderService.requestMakeOrderByMRP(0, 20).then((res) => {
      console.log(res)
      refresh.complete();
      this.orderMRP = res.result.res_data;
    })
  }


  doInfinite1(infiniteScroll) {
    if (this.isMoreData1 == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.orderService.requestMakeOrderByMRP(this.offset, this.limit).then((res) => {
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
            this.orderMRP.push(item);
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
    this.orderService.requestPriceOrder(0, 20)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.priceOrder = res.result.res_data
          console.log(this.priceOrder)
        }
      })

  }

  doRefresh2(refresh) {
    this.isMoreData2 = true;
    this.limit = 20;
    this.offset = 0;
    this.orderService.requestPriceOrder(0, 20).then((res) => {
      console.log(res)
      refresh.complete();
      this.priceOrder = res.result.res_data;
    })
  }


  doInfinite2(infiniteScroll) {
    if (this.isMoreData2 == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.orderService.requestMakeOrderByMRP(this.offset, this.limit).then((res) => {
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
            this.priceOrder.push(item);
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
    this.orderService.requestIncomingOrder(0, 20)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.incomingOrder = res.result.res_data
          console.log(this.incomingOrder)
        }
      })
  }
  doRefresh3(refresh) {
    this.isMoreData3 = true;
    this.limit = 20;
    this.offset = 0;
    this.orderService.requestIncomingOrder(0, 20).then((res) => {
      console.log(res)
      refresh.complete();
      this.incomingOrder = res.result.res_data;
    })
  }


  doInfinite3(infiniteScroll) {
    if (this.isMoreData3 == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.orderService.requestMakeOrderByMRP(this.offset, this.limit).then((res) => {
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
            this.incomingOrder.push(item);
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


  clickFour() {
    this.orderService.requestReturnOrder(0, 20)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.returnOrder = res.result.res_data
          console.log(this.returnOrder)
        }
      })

  }

  doRefresh4(refresh) {
    this.isMoreData4 = true;
    this.limit = 20;
    this.offset = 0;
    this.orderService.requestReturnOrder(0, 20).then((res) => {
      console.log(res)
      refresh.complete();
      this.returnOrder = res.result.res_data;
    })
  }


  doInfinite4(infiniteScroll) {
    if (this.isMoreData4 == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.orderService.requestReturnOrder(this.offset, this.limit).then((res) => {
        console.log(this.offset)
        console.log(this.limit)
        let item_data = [];
        if (res.result.res_data) {
          item_data = res.result.res_data;
          if (item_data.length == 20) {
            this.isMoreData4 = true;
          }
          else {
            this.isMoreData4 = false;
          }
          for (let item of item_data) {
            this.returnOrder.push(item);
          }
        }
        else {
          this.isMoreData4 = false;
        }
        infiniteScroll.complete();
      })
    } else {
      infiniteScroll.complete();
    }
  }

  orderDetail(id) {
    this.orderService.requestOrderDetail(id)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.navCtrl.push(OrderDetailPage, {
            item: res.result,
            showNumber :false 
          })
        }
      })
  }

  // 显示开单数量和已接收
   orderDetailShowNumber(id) {
    this.orderService.requestOrderDetail(id)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.navCtrl.push(OrderDetailPage, {
            item: res.result,
            showNumber :true 
          })
        }
      })
  }

  returnOrderDetail(id) {
    this.orderService.requestReturnOrderDetail(id)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.navCtrl.push(ReturnOrderDetailPage, {
            item: res.result,
            id:id,
          })
        }
      })
  }

  searchClick1() {
    this.isMoreData1=false ;
    this.orderService.orderSearchByPO(this.searchName)
      .then(res => {
        this.orderMRP = res.result.res_data
      })
  }

  searchClick2() {
     this.isMoreData2=false ;
    this.orderService.orderSearchByPO(this.searchName)
      .then(res => {
        this.priceOrder = res.result.res_data
      })

  }

  searchClick3() {
     this.isMoreData3=false ;
    this.orderService.orderSearchByPO(this.searchName)
      .then(res => {
        this.incomingOrder = res.result.res_data
      })

  }

  returnOrderSearchClick() {
     this.isMoreData4=false ;
    this.orderService.returnOrderSearchByPO(this.returnOrderSearchName)
      .then(res => {
        this.returnOrder = res.result.res_data
      })
  }
}
