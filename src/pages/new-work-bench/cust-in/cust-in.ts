import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Utils } from './../../../providers/Utils';
import { CustService } from './custService'

import { CustAutoService } from './custAutoService'

/**
 * Generated class for the CustInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cust-in',
  templateUrl: 'cust-in.html',
  providers: [CustService, CustAutoService],
})
export class CustInPage {
  // data_arr = []
  type = 'confirm'

  wait_arr = []
  done_arr = []
  limit = 20
  offset = 0
  isMoreData = true

  user_id

  cust_in_num = 0
  constructor(public navCtrl: NavController, public navParams: NavParams, public custService: CustService,
    public custAutoService: CustAutoService, public storage: Storage) {
      this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustInPage');
    this.reload_data()
  }

  ionViewWillEnter(){
    if (this.navParams.get('need_refresh') == true) {
      this.navParams.data.need_refresh = false;
      this.reload_data()
    }
    this.custService.get_total_cust_in({}).then(res => {
      if (res.result.res_data && res.result.res_code == 1){
        this.cust_in_num = res.result.res_data
      }
    })

  }

  goBack() {
    this.navCtrl.pop()
  }

  click_wait() {
    this.type = 'confirm'
    this.reload_data()
  }

  click_done() {
    this.type = 'done'
    this.reload_data()
  }

  itemSelected(event) {
    let type;
    let search_text;
    if (event.id == 1) {
      type = "name";
      search_text = event.name.replace("搜 单号：", "")
    }
    else if (event.id == 2) {
      type = "partner_id";
      search_text = event.name.replace("搜 客户：", "")
    }
    else if (event.id == 3) {
      type = "journal_id";
      search_text = event.name.replace("搜 账号：", "")
    }
    let body = {
      'type': type,
      'search_text': search_text,
      'state': this.type,
    }
    this.wait_arr = []
    this.done_arr = []
    this.isMoreData = false
    this.custService.search_cust_in_with_domain(body).then(res => {
      if (res.result.res_code == 1 && res.result.res_data){
        if (this.type == 'confirm'){
          this.wait_arr = res.result.res_data
        }
        else{
          this.done_arr = res.result.res_data
        }
      }
    })
  }

  itemClearSelected(event) {
    this.reload_data()
  }

  reload_data() {
    this.done_arr = []
    this.wait_arr = []
    this.isMoreData = true;
    this.limit = 20
    this.offset = 0
    let body = {
      'limit': this.limit,
      'offset': this.offset,
      'type': this.type,
    }
    this.custService.get_total_account_payment(body).then(res => {
      if (res.result.res_code == 1 && res.result.res_data) {
        if (this.type == 'confirm') {
          this.wait_arr = res.result.res_data
        }
        else {
          this.done_arr = res.result.res_data
        }
      }
    })
  }

  doRefresh(refresh) {
    this.reload_data()
    refresh.complete();
  }

  doInfinite(infiniteScroll) {
    if (this.isMoreData == true) {
      this.offset = this.offset + 20;
      this.custService.get_total_account_payment({ 'limit': this.limit, 'offset': this.offset, 'type': this.type }).then((res) => {
        let item_data = [];
        if (res.result.res_data) {
          item_data = res.result.res_data;
          if (item_data.length == 20) {
            this.isMoreData = true;
          }
          else {
            this.isMoreData = false;
          }
          for (let item of item_data) {
            if (this.type == 'confirm') {
              this.wait_arr.push(item)
            }
            else {
              this.done_arr.push(item)
            }

          }

        }
        else {
          this.isMoreData = false;
        }
        infiniteScroll.complete();
      })
    } else {
      infiniteScroll.complete();
    }
  }

  payment_detail(item){
    this.navCtrl.push('CustInDetailPage', {
      user_id: this.user_id,
      item: item,
    })
  }

  cal_num(cust_num){
    if (cust_num <= 99){
      return 99
    }
    else{
      return '99+'
    }
  }

}
