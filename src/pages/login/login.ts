

import { LoginService } from './loginService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';


import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import {dbBean} from '../../model/dbInfoModel';


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
  providers: [LoginService]
})
export class LoginPage {
  email: string;
  password: string;
  dbs: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loginservice:LoginService, private myHttp: Http) {
       

    }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    // this.dbs = ['a','v'];//res.res_data;
    this.getdbInfo();
  }


  getdbInfo(){
    this.loginservice.getDBInfo().then(res=>{
     console.log(res);
     this.dbs = res.res_data;
    });
    
    
  }


  // 登录
  toLogin() {
  }
  chooseDb(e){
    this.getdbInfo();
  }
}