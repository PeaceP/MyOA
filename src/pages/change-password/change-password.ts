import { LoginService } from './../login/loginService';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController, IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
  providers: [LoginService,]
})
export class ChangePasswordPage {
  confirm_pwd;
  new_password;
  old_pwd;

  constructor(public navCtrl: NavController,public statusBar: StatusBar, public navParams: NavParams,private loginservice: LoginService) {
  }

  ionViewDidLoad() {
    this.statusBar.backgroundColorByHexString('#f8f8f8');
    console.log('ionViewDidLoad ChangePasswordPage');
  }


  finish(){
    this.loginservice.change_password(this.old_pwd,this.new_password,this.confirm_pwd).then(res=>{
      console.log(res)
    })
  }

  goBack(){
    this.navCtrl.pop()
  }
}
