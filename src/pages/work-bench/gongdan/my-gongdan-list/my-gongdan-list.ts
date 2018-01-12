import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { GongDanService } from '../gongdanService';
import { HttpService } from '../../../../providers/HttpService';

/**
 * Generated class for the MyGongdanListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-gongdan-list',
  templateUrl: 'my-gongdan-list.html',
  providers:[GongDanService]
})
export class MyGongdanListPage {
  gongdanList ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public gongdanService :GongDanService) {
      let body = JSON.stringify({
        uid:HttpService.user_id,
        create_uid :HttpService.user_id
      });
      this.gongdanService.work_order_search(body).then(res=>{
        if(res.result&&res.result.res_code==1){
          this.gongdanList = res.result.res_data
          console.log(this.gongdanList)
        }
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyGongdanListPage');
  }

  toDetail(item){
    this.gongdanService.getGongdanDetail(item.work_order_id).then(res=>{
      console.log(res)
    })
  }

  changePriority(priority){
    if(priority=="1"){
      return "低"
    }else if(priority=="2"){
      return "中"
    }else if(priority=="3"){
      return "高"
    }
  }

  changeState(state){
    if(state="unaccept"){
      return "未设置受理人"
    }else if(state="unassign"){
      return "未指派"
    }else if(state="process"){
      return "处理中"
    }else if(state="check"){
      return "待审核"
    }
  }


}
