import { dbBean } from './../../model/dbInfoModel';
import { Storage } from '@ionic/storage';

import { JPush} from '../../providers/JPush'

import { LoginService } from './loginService';
import { Component, ErrorHandler } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';


import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { AppVersion } from '@ionic-native/app-version';
import { Platform } from 'ionic-angular';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService,JPush]
})
export class LoginPage {
  email: string;
  password: string;
  dbs: any;
  employee: string;
  resUser: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loginservice: LoginService, private myHttp: Http, private storage: Storage, public platform: Platform, public appVersion: AppVersion,
    public jpush:JPush) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');


    this.storage.get('user')
      .then(res => {
        console.log(res);
        if (res != null) {
          window.localStorage.setItem("id",res.result.res_data.user_id)
          this.navCtrl.setRoot('TabsPage');
          this.storage.get('user_psd').then(res => {
            console.log(res)
              this.loginservice.toLogin(res.user_email, res.user_psd, res.db_name)
            .then(res => {
              console.log(res);
              if (res.result && res.result.res_code == 1) {
                this.storage.set("user", res).then(() => {
                });
              }
            })
          })
          
        } else {
          this.getdbInfo();
        }
      });
  }

  getdbInfo() {
    this.loginservice.getDBInfo().then(res => {
      console.log(res)
      this.dbs = res.res_data;
    });
  }

  // 登录
  toLogin() {
    if (this.employee == null) {
      alert("请选择数据库")
      return
    }
    this.loginservice.toLogin(this.email, this.password, this.employee)
      .then(res => {
        console.log(res);
        if (res.result && res.result.res_code == 1) {
        this.storage.set("user_psd",{
          user_email:this.email,
          user_psd:this.password,
          db_name:this.employee,
        })
          this.storage.set("user", res).then(() => {
            this.jpush.setAlias(res.result.res_data.user_id);
            this.navCtrl.setRoot('TabsPage');
          });
        }
        else if (res.result && res.result.res_code == -1) {
          alert(res.result.res_data.error);
        }
      })
  }

  chooseDb(e) {
    this.getdbInfo();
  }
}