import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController ,ViewController,Events} from 'ionic-angular';

/**
 * Generated class for the LoginPopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login-popover',
  templateUrl: 'login-popover.html',
})
export class LoginPopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPopoverPage');
  }

}
