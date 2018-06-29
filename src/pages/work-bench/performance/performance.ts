import { PersonService } from './performance-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage'; 

/**
 * Generated class for the PerformancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-performance',
  templateUrl: 'performance.html',
  providers: [PersonService],
})
export class PerformancePage {
  isMine = true;
  isOther = false;
  num1;
  num2;
  uid;
  lists=[];
  listMine=[];
  listOther=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public statusBar:StatusBar,
              public servicePerformance: PersonService, public storage: Storage) {
                
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PerformancePage');
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
    this.storage.get('user')
    .then(res => {
      this.uid = res.result.res_data.user_id;
      let body = {
        uid: this.uid,
      }
      this.servicePerformance.get_performance_list(body).then(res =>{
        if(res.result.res_code==1 && res.result){
          console.log(res)
          this.listMine = res.result.res_data.dataMine
          this.listOther = res.result.res_data.dataOther
          this.num1 = res.result.res_data.lenghthMine
          this.num2 = res.result.res_data.lenghthOther
          if(this.isMine){
            this.lists = res.result.res_data.dataMine
          }else if(this.isOther){
            this.lists = res.result.res_data.dataOther
          }
        }
      })
    })
  }

  mine(){
    this.isMine = true
    this.isOther = false
    this.lists = this.listMine
  }

  others(){
    this.isMine = false
    this.isOther = true
    this.lists = this.listOther
  }

  goBack(){
    this.statusBar.backgroundColorByHexString("#f8f8f8");
    this.statusBar.styleDefault();
    this.navCtrl.pop();
  }

  itemSelected0(event){
    let type;
    let search_text;
    if (event.id == 1) {
      type = "name";
      search_text = event.name.replace("搜 标题:", "")
    }
    else if (event.id == 2) {
      type = "content";
      search_text = event.name.replace("搜 正文:", "")
    } 
    else if (event.id == 3) {
      type = "create_uid";
      search_text = event.name.replace("搜 发布人:", "")
    }
    console.log(search_text);
  }

  startPerformance(item){
    console.log("???="+item)
    if(this.isMine){
      this.navCtrl.push('PerformanceStartPage',{
        'item': item.performanceDetail
      })
    }else if(this.isOther){
      this.navCtrl.push('PerformanceStartPage',{
        'item': item
      })
    }
  }

  lookPerformance(item){
    this.navCtrl.push('PerformanceResultPage',{
      'id': item.id
    })
  }

  changeStr(num){
    let str
    if (num=="1"){
      str = "考核中"
    }else if(num=="0"){
      str = "草稿"
    }else{
      str = "完成"
    }
    return str
  }
}
