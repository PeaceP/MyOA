import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Utils } from './../../../providers/Utils';
import { HttpService } from './../../../providers/HttpService';
import { DomSanitizer } from '@angular/platform-browser';
import { EmailService } from './../emailService';
import { NavController, IonicPage, NavParams, ToastController, Events, Gesture } from 'ionic-angular';
import { Component } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
///<reference path="../../../services/jquery.d.ts"/>  
import Hammer from 'hammerjs';



/**
 * Generated class for the EmailDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-email-detail',
  templateUrl: 'email-detail.html',
  providers: [EmailService, File, FileTransfer, FileOpener]
})
export class EmailDetailPage {
  id;
  email_detail;
  body_html;
  subject;
  email_from;
  frontPage;
  need_show_choose = false;
  email_to; date; attachment_list = []; email_cc; email_bcc;
  movePageInfo;
  email_flag;
  uid; account_id;
  label_list;
  front_page_refresh = false;
  account_list;
  originW; originH;
  constructor(private sanitizer: DomSanitizer,
    public transfer: FileTransfer,
    public file: File,
    public fileOpener: FileOpener,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams, public emailService: EmailService) {
    this.id = this.navParams.get('id')
    this.uid = this.navParams.get('uid')
    this.account_id = this.navParams.get('account_id')
    this.account_list = this.navParams.get('account_list')
    this.frontPage = Utils.getViewController("EmailPage", this.navCtrl)
    this.emailService.get_email_detail(this.id).then(res => {
      console.log(res.result.res_data)
      this.email_detail = res.result.res_data
      this.body_html = this.email_detail.body_html
      this.subject = this.email_detail.subject
      this.email_from = this.email_detail.email_from
      this.email_to = this.email_detail.email_to
      this.email_cc = this.email_detail.email_cc
      this.email_bcc = this.email_detail.email_bcc
      this.date = this.email_detail.date
      this.email_flag = this.email_detail.is_flag
      this.label_list = this.email_detail.label_list
      this.attachment_list = this.transAttachUrl(this.email_detail.attachment_list)
      console.log(this.attachment_list)
    })

  }




  transAttachUrl(attachment_list) {
    for (let i = 0; i < attachment_list.length; i++) {
      let icon_src = "assets/img/attach_icon/attachment_icon.jpeg"
      if (attachment_list[i].mimetype.indexOf('jpeg') > 0) {
        icon_src = "assets/img/attach_icon/jpg.png"
      } else if (attachment_list[i].mimetype.indexOf('excel') > 0) {
        icon_src = "assets/img/attach_icon/xls.png"
        // preview_str = ''
      } else if (attachment_list[i].mimetype.indexOf('png') > 0) {
        icon_src = "assets/img/attach_icon/png.png"
      } else if (attachment_list[i].mimetype.indexOf('pdf') > 0) {
        icon_src = "assets/img/attach_icon/pdf.png"
      } else if (attachment_list[i].mimetype.indexOf('video') > 0) {
        icon_src = "assets/img/attach_icon/video.png"
      } else if (attachment_list[i].mimetype.indexOf('gif') > 0) {
        icon_src = "assets/img/attach_icon/gif.png"
      }
      if(attachment_list[i].mimetype=='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
        icon_src = "assets/img/attach_icon/xls.png"
      }
      attachment_list[i].icon_src = icon_src
    }
    return attachment_list
  }

  ionViewWillEnter() {
    if (this.navParams.get('movePageInfo')) {
      this.movePageInfo = this.navParams.data.movePageInfo
      var ids = [this.id]
      this.emailService.move(ids, this.movePageInfo.state, this.movePageInfo.email_state).then(res => {
        if (res.result && res.result.res_code == 1) {
          Utils.toastButtom('移动成功', this.toastCtrl)
        }
      })
      this.navParams.data.movePageInfo = ''
    } else if (this.navParams.get('signPageInfo')) {
      var sign_id = this.navParams.data.signPageInfo.sign_id
      this.emailService.label(this.id, sign_id).then(res => {
        if (res.result && res.result.res_code == 1) {
          this.label_list = res.result.res_data
        }
      })
    }
  }

  ionViewWillLeave() {
    if (this.need_show_choose) {
      this.changeShowTop()
    }
  }

  assembleHTML(strHTML) {
    console.log("assembleHtml() 方法执行了")
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }

  ionViewDidLoad() {
    this.originW = $("#testimg").width();
    let element2 = document.getElementById('testimg');
    var hammertime = new Hammer(element2);
    this.initPinch(hammertime)
  }
  initPinch(hammertime) {
    console.log('ionViewDidLoad EmailDetailPage');
   
    hammertime.on("pinchin pinchout", function (ev) {
      console.log(ev.type + " gesture detected.");
    });
    hammertime.get('pinch').set({ enable: true });
    hammertime.add(new Hammer.Pinch());
    var self = this
    //捏开
    hammertime.on("pinchout", function (e) {
      console.log(">>>>>>>>>>>>>>>>");
      var H = $("#testimg").height();
      var W = $("#testimg").width();
      $('#testimg').height(H + e.distance);
      $('#testimg').width(W + e.distance * (W / H));
      // var scale = 2;
      // //var mouseX=e.pageX;//鼠标
      // //var mouseY=e.pageY;
      // var mouseX = e.center.x;//捏开点
      // var mouseY = e.center.y;

      // if ($("#test").attr("data-scale") == 1) {
      //   var translateX = 0;
      //   var translateY = 0;
      //   //计算当前点击点相对于图片的偏移比例
      //   var posX = mouseX / W;
      //   var posY = mouseY / H;
      //   translateX = (W * posX / scale) * -1;
      //   translateY = (H * posY / scale) * -1;

      //   console.log("###[" + translateX + "]###");
      //   $("#test").css("transformOrigin", "0% 0%");
      //   $("#test").css("transform", "scale(2,2) translate(" + translateX + "px, " + translateY + "px)");
      //   $("#test").attr("data-x", translateX);
      //   $("#test").attr("data-y", translateY);
      console.log(e.distance)
      // console.log("点击点的百分比>>>   " + posX + "," + posY + "                  ");
      // console.log("偏移>>>   " + translateX + "," + translateY + "                  ");
      //console.log("鼠标："+mouseX+","+mouseY+"                  ");
      //console.log("捏开开开开>>>>  " + e.center.x + "," + e.center.y+"                  ");
      //console.log("x————————"+ $("#test").attr("data-x") );
      //onsole.log("y————————"+ $("#test").attr("data-y") );
      // }

    });
    //捏合
    hammertime.on("pinchin", function (e) {
      // $("#test").css("transformOrigin", "scale(1,1)");
      // $("#test").css("transform", "scale(1,1) translate(0px,0px)");
      // $("#test").attr("data-x", 0);
      // $("#test").attr("data-y", 0);
      var H = $("#testimg").height();
      var W = $("#testimg").width();
      console.log(H)
      console.log(e.distance)
      console.log(self.originW)
      if (W - e.distance < self.originW) {
        return
      }
      $('#testimg').height(H - e.distance);
      $('#testimg').width(W - e.distance * (W / H));
      // console.log("捏合合合合>>              ");
    });
   
  }


  toSignPage() {
    this.navCtrl.push('SignPage', {
      'account_id': this.account_id,
      'user_id': this.uid
    })
    this.front_page_refresh = true
  }


  clickAttach(id, mimeType) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = HttpService.appUrl + "web/content/" + id + "?download=true";
    fileTransfer.download(url, this.file.dataDirectory + id).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.fileOpener.open(entry.nativeURL, mimeType)
        .then(() => {
          console.log('打开成功');
        })
        .catch(() => {
          console.log('打开失败');
        });
    }, (error) => {
      console.log(error)
    });
  }




  goBack() {
    this.frontPage.data.needRefresh = true
    this.navCtrl.popTo(this.frontPage)
  }


  changeShowTop() {
    this.need_show_choose = !this.need_show_choose
    if (this.need_show_choose) {
      setTimeout(() => {
        var bac_div = document.getElementById('email_backdrop')
        bac_div.style.height = document.getElementsByClassName('scroll-content')[document.getElementsByClassName('scroll-content').length - 1].scrollHeight + "px"
      }, 1)
    }
  }

  hide_email_backdrop() {
    this.changeShowTop()
  }


  move() {
    this.navCtrl.push('EmailMovePage', {
      'emailDetail': true,
      'account_id': this.account_id,
      'user_id': this.uid
    })
    this.front_page_refresh = true
  }

  flag(state) {
    this.emailService.flag([this.id], state).then(res => {
      if (res.result && res.result && res.result.res_code == 1) {
        this.email_detail.is_flag = state
        this.email_flag = state
        if (state) {
          Utils.toastButtom('已固定', this.toastCtrl)
        } else {
          Utils.toastButtom('已取消固定', this.toastCtrl)
        }
      }
    })
    this.front_page_refresh = true
  }


  reply() {
    this.navCtrl.push('WriteEmailPage', {
      'email_detail': this.email_detail,
      'id': this.account_id,
      'uid': this.uid,
      'account_list': this.navParams.get('account_list'),
      'type': 'reply'
    })
  }

  replyAll() {
    this.navCtrl.push('WriteEmailPage', {
      'email_detail': this.email_detail,
      'id': this.account_id,
      'uid': this.uid,
      'account_list': this.navParams.get('account_list'),
      'type': 'replyAll'
    })
  }

  transfer_mail() {
    this.navCtrl.push('WriteEmailPage', {
      'email_detail': this.email_detail,
      'id': this.account_id,
      'uid': this.uid,
      'account_list': this.navParams.get('account_list'),
      'type': 'transfer'
    })
  }


  delete() {
    this.alertCtrl.create({
      title: '提示',
      subTitle: '确定删除要此邮件？',
      buttons: [{ text: '取消' },
      {
        text: '确定',
        handler: () => {
          this.emailService.delete([this.id]).then(res => {
            if (res.result && res.result.res_code == 1) {
              this.navCtrl.pop()
            }
          })
        }
      }
      ]
    }).present();

  }


}


