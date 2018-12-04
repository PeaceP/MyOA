// import { Storage } from '@ionic/storage';
// import { NativeService } from './../providers/NativeService';
// import { TabsPage } from './../pages/tabs/tabs';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
// import { AppVersion } from '@ionic-native/app-version';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { JPushPlugin } from '@ionic-native/jpush';

// import { HttpService } from '../providers/HttpService'
import { JPush } from '../providers/JPush'
import { CodePush, InstallMode } from '@ionic-native/code-push';

// import { HttpModule } from "@angular/http";
// import { FirService } from './FirService';
// import { InAppBrowser } from '@ionic-native/in-app-browser';
declare let cordova: any;
@Component({
  templateUrl: 'app.html',
  providers: [ CodePush,JPush]
})
export class MyApp {
  rootPage: any = 'LoginPage';
  version: any;
  user_env: any;
  constructor(public platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen, public codePush:CodePush,public jpush:JPush) {

    platform.ready().then(() => {
      statusBar.overlaysWebView(false);
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString('#f8f8f8');
      splashScreen.hide();
      this.checkCodePush()
      this.jpush.initJpush();
      // storage.get('user')
      //   .then(res => {
      //     this.user_env = res.result.res_data;
      //      this.jpush.setAlias(res.result.res_data.user_id);
      //   });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      

      
    });
  }

  checkCodePush() {
    
     this.codePush.sync({
      // updateDialog: {
      //  appendReleaseDescription: true,
      //  descriptionPrefix: "\n\nChange log:\n"   
      // },
      installMode: InstallMode.IMMEDIATE
   }).subscribe(
     (data) => {
      console.log('CODE PUSH SUCCESSFUL: ' + data);
      
     },
     (err) => {
      console.log('CODE PUSH ERROR: ' + err);
      
     }
   );
  }
  // getVersionNumber(): Promise<string> {
  //   return new Promise((resolve) => {
  //     this.appVersion.getVersionCode().then((value: string) => {
  //       resolve(value);
  //       this.version = value;
  //       console.log(this.version)
  //       this.nativeService.detectionUpgrade(this.version);
  //     }).catch(err => {
  //     });
  //   });
  // }

  // jPushInit(){
  //   //初始化极光
  //   this.jpush.init().then(res => { console.log(res) });
  // }

    //收到通知时会触发该事件。
  //   document.addEventListener("jpush.receiveNotification", function (event) {
  //       alert( JSON.stringify( event ) );
  //   }, false);
  // }

}

