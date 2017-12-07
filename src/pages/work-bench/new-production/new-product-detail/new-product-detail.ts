import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController, Events,Slides } from 'ionic-angular';
import { NewProductionService} from './../new-productionService'

/**
 * Generated class for the NewProductDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-product-detail',
  templateUrl: 'new-product-detail.html',
  providers:[NewProductionService],
})
export class NewProductDetailPage {
  item;
  constructor(public navCtrl: NavController, public navParams: NavParams,public newProductionService:NewProductionService) {
    this.item = navParams.get('item')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProductDetailPage');
  }

  clickBom(){
    this.newProductionService.product_bom_stock_move(this.item.id,"bom").then(res => {
      if (res.result && res.result.res_code == 1) {
        console.log(res)
          this.navCtrl.push('BomPage',{
            item:res.result.res_data,
          })
        }
    })
  }

  clickStockMove(){
    this.newProductionService.product_bom_stock_move(this.item.id,"stock_move").then(res => {
      if (res.result && res.result.res_code == 1) {
          this.navCtrl.push('WarehouseMovePage',{
            item:res.result.res_data,
          })
        }
    })
  }

}
