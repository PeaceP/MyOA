import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

/**
 * Generated class for the SalaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-salary',
  templateUrl: 'salary.html',
})
export class SalaryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalaryPage');
  }

  click_tax_deduct(){
    this.navCtrl.push('TaxDeductPage')
  }

  goBack(){
    this.navCtrl.pop()
  }

}