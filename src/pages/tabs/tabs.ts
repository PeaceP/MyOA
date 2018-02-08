import {Tabs} from "ionic-angular";
import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  @ViewChild('mainTabs') tabs:Tabs;
  meRoot :any ='MePage';
  msgRoot:any = 'GongdanPage';
  workRoot :any = 'WorkBenchPage';
  contactRoot  = 'ContactPersonPage';
  need_show_gongdan = false
  need_show_all = false
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public storage:Storage) {
    this.storage.get('user')
      .then(res => {
        if ((new RegExp("若态").test(res.result.res_data.company)) || res.result.res_data.company == "若态"){
            this.need_show_gongdan = true
            this.need_show_all = true
          }
          else
          {
            this.need_show_all = true
          }
      })
  }

  ionViewDidLoad() {
  //  this.tabs.select(1); 
  //  this.navCtrl.parent.select(1);   
  }

}
