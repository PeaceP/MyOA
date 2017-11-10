import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage ,AlertController,ToastController,Platform} from 'ionic-angular';
import { ShenGouService} from './../shengouService'
import { Utils } from './../../../../providers/Utils';
declare let cordova: any; 
/**
 * Generated class for the EditAddShengouPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-add-shengou',
  templateUrl: 'edit-add-shengou.html',
  providers:[ShenGouService]
})
export class EditAddShengouPage {
  amount;
  unit;
  remark;
  productList;
  productIndex;
  production;
  changeItem;
  mShenGoupage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public shenGouService:ShenGouService,
  public alertCtrl:AlertController,public toastCtrl:ToastController,public platform:Platform) {
    this.mShenGoupage = Utils.getViewController("EditNewShengouPage", navCtrl);

    this.shenGouService.get_all_products().then((res) => {
      console.log(res);
      if (res.result.res_code == 1)
      {
        this.productList = res.result.res_data.res_data;
      }
    })
  }

  ionViewWillLeave(){
    if(this.platform.is('ios')){
      cordova.plugins.Keyboard.close();
    }
  }

  panEvent($event){
    if(this.platform.is('ios')){
      cordova.plugins.Keyboard.close();
    }
  }

  ionViewDidEnter() {
    this.changeItem = this.navParams.get("item");
    if (this.changeItem) {
      this.production = this.changeItem;
      this.amount = this.production.price_unit;
      this.remark = this.production.description;
      this.productIndex = this.production.product_id.name;
      this.unit = this.production.quantity;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAddShengouPage');
  }

  goBack() {
    if (this.productIndex || this.amount || this.remark) {
      this.alertCtrl.create({
        title: '提示',
        subTitle: '已输入内容，是否确认返回？',
        buttons: [{ text: '取消' },
        {
          text: '确定',
          handler: () => {
            this.navCtrl.pop();
          }
        }
        ]
      }).present();
    }
    else {
      this.navCtrl.pop();
    }
  }

  save() {
    let mString = "";
    if (!this.productIndex) {
      mString = mString + "   请选择产品"
    }
    if (!this.amount) {
      mString = mString + "   请填写金额"
    }
    if (!this.unit) {
      mString = mString + "   请填写数量"
    }
    if (!this.remark) {
      mString = mString + "   请填写费用说明"
    }
    if (mString != "") {
      Utils.toastButtom(mString, this.toastCtrl)
    } else {
      if (this.productIndex && this.amount && this.remark && this.unit) {
         let intString = "";
        if (parseFloat(this.amount) <= 0)
        {
          intString = intString + "   单价不能为0"
        }
        if (parseFloat(this.unit) <= 0)
        {
          intString = intString + "   数量不能为0"
        }
        if (intString != "") {
          Utils.toastButtom(intString, this.toastCtrl)
        }
        else
        {
          this.production = [];
        for (let item of this.productList) {
          if(item.name == this.productIndex){
            this.production.product_id = {
              id:item.id,
              name:this.productIndex
            };
          }
        }
        this.production.price_unit = this.amount;
        this.production.description = this.remark;
        this.production.quantity = this.unit;

        this.mShenGoupage.data.production = this.production;
        this.mShenGoupage.data.isAdd = true;
        this.mShenGoupage.data.isChange = this.changeItem ? true : false;;
        this.navCtrl.pop();
        }  
      }
    }
  }
}
