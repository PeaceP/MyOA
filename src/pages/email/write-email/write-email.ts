import { NativeService } from './../../../providers/NativeService';
import { HttpService } from './../../../providers/HttpService';
import { FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
///<reference path="../../../services/jquery.d.ts"/>  
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController, ActionSheetController, Platform } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Component, ViewChild } from '@angular/core';
import { File } from '@ionic-native/file';
import { EmailService } from '../emailService';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
/**
 * Generated class for the WriteEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-write-email',
  templateUrl: 'write-email.html',
  providers: [EmailService, FileChooser, File, FilePath]
})
export class WriteEmailPage {
  // datass = {
  //   'id': 2,
  //   'file_size': '22kb',
  //   'mimetype': '2222',
  //   'name': 'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasd'
  // }
  // datasss = {
  //   'id': 2,
  //   'file_size': '22qwkb',
  //   'mimetype': '2222',
  //   'name': 'asdsdasdasdasd'
  // }
  // attachment_list = [this.datass,this.datasss,this.datass];
  attachment_list = [];
  isShow = false
  account_id;
  account_list;
  account_email;
  email_to;
  email_cc;
  email_bcc;
  subject;
  body;
  user_id;
  contact_list = [];
  contact_email_to_list = []
  contact_email_cc_list = []
  contact_email_bcc_list = []
  chooseEmailTo = [];
  chooseEmailcc = [];
  chooseEmailbcc = [];

  @ViewChild('input_email_to') input_email_to;
  constructor(public navCtrl: NavController,
    public emailService: EmailService,
    public alert: AlertController,
    public fileChooser: FileChooser,
    public platform: Platform,
    private nativeService: NativeService,
    private filePath: FilePath, public file: File,
    private transfer: FileTransferObject,
    public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
    this.account_id = this.navParams.get('id')
    this.user_id = this.navParams.get('uid')
    this.account_list = this.navParams.get('account_list')
    this.get_contact_list()
    for (let i = 0; i < this.account_list.length; i++) {
      if (this.account_list[i].id == this.account_id) {
        this.account_email = this.account_list[i].email
      }
    }

  }

  ionViewDidLoad() {
    let self = this
    $("#input_email_to").bind("input propertychange", function (event) {
      console.log(self.email_to)
      self.contact_email_to_list = []
      if (self.email_to) {
        for (let item of self.contact_list) {
          if ((new RegExp(self.email_to).test(item.email))) {
            self.contact_email_to_list.push(item);
          }
        }
      }
    });
    $("#input_email_to").blur(function (event) {
      let value = $.trim($('#input_email_to').val())
      if (self.contact_email_to_list.length == 0 && value) {
        $("#input_email_to").val('')
        for (let i = 0; i < self.chooseEmailTo.length; i++) {
          if (value == self.chooseEmailTo[i].email) {
            return
          }
        }
        self.chooseEmailTo.push({
          'name': value,
          'email': value,
        })
        $('#input_email_to').attr('placeholder', '')
      }
    });
  }


  ionViewDidEnter() {
    setTimeout(() => {
      $("#input_email_to").focus()
    }, 300)
  }

  get_contact_list() {
    this.emailService.get_contact_list(this.user_id).then(res => {
      console.log(res.result)
      this.contact_list = res.result.res_data
    })
  }


  // 收件人
  choose_contact_email_to(item) {
    this.contact_email_to_list = []
    this.email_to = ''
    $("#input_email_to").focus()
    $("#input_email_to").val('')
    for (let i = 0; i < this.chooseEmailTo.length; i++) {
      if (item.email == this.chooseEmailTo[i].email) {
        return
      }
    }
    // 隐藏提示
    $('#input_email_to').attr('placeholder', '')
    this.chooseEmailTo.push(item)

  }

  closeEmailTo(index) {
    this.chooseEmailTo.splice(index, 1)
    if (this.chooseEmailTo.length == 0) {
      $('#input_email_to').attr('placeholder', '收件人:')
    }
  }

  // 抄送
  choose_contact_email_cc(item) {
    this.contact_email_cc_list = []
    this.email_cc = ''
    $("#input_email_cc").focus()
    $("#input_email_cc").val('')
    for (let i = 0; i < this.chooseEmailcc.length; i++) {
      if (item.email == this.chooseEmailcc[i].email) {
        return
      }
    }
    $('#input_email_cc').attr('placeholder', '')
    this.chooseEmailcc.push(item)

  }

  closeEmailcc(index) {
    this.chooseEmailcc.splice(index, 1)
    if (this.chooseEmailcc.length == 0) {
      $('#input_email_cc').attr('placeholder', '抄送:')
    }
  }

  // 密送
  choose_contact_email_bcc(item) {
    this.contact_email_bcc_list = []
    this.email_bcc = ''
    $("#input_email_bcc").focus()
    $("#input_email_bcc").val('')
    for (let i = 0; i < this.chooseEmailbcc.length; i++) {
      if (item.email == this.chooseEmailbcc[i].email) {
        return
      }
    }
    $('#input_email_bcc').attr('placeholder', '')
    this.chooseEmailbcc.push(item)
  }

  closeEmailbcc(index) {
    this.chooseEmailbcc.splice(index, 1)
    if (this.chooseEmailbcc.length == 0) {
      $('#input_email_bcc').attr('placeholder', '密送:')
    }
  }




  chooseAttach() {
    console.log('chooseAttach')
    if (this.platform.is('ios')) {
    // if (this.platform.is('android')) {
      this.changeHeardImg()
    }
    else if (this.platform.is('android')) {
      this.fileChooser.open().then(uri => {
        console.log(uri)
        this.resolveUri(uri).then(path => {
          this.uploadAttachment(path);
        })
      }).catch(e => {
        // reject(e);
      })
    }
  }

  changeHeardImg() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: '拍照',
          //  role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.getPicture(1);
          }
        },
        {
          text: '从手机相册选择',
          handler: () => {
            console.log('Archive clicked');
            this.getPicture(0);
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  getPicture(type) {//1拍照,0从图库选择
    let options = {
      allowEdit: false,
      quality: 6,//图像质量，范围为0 - 100
      circle: true
    };
    if (type == 1) {
      this.nativeService.getPictureByCamera(options).subscribe(img_url => {
        this.getPictureSuccess(img_url);
      });
    } else {
      this.nativeService.getPictureByPhotoLibrary(options).subscribe(img_url => {
        this.getPictureSuccess(img_url);
      });
    }
  }

  private getPictureSuccess(img) {
    this.emailService.uploadAttachment(this.user_id, 'IMG_PHOTO', img).then(res => {
      console.log(res)
      if (res.result.res_code == 1) {
        this.attachment_list.push(res.result.res_data)
      }
    })
  }





  delete_attachment(index, id) {
    this.attachment_list.splice(index, 1)
    this.emailService.delete_attachment(id)
  }

  uploadAttachment(path) {
    console.log(path)
    console.log('genggail')
    let file_name = path.substring(path.lastIndexOf("/") + 1, path.length)
    let file_path = path.substring(0, path.lastIndexOf("/") + 1)
    this.file.readAsDataURL(file_path, file_name).then(res => {
      console.log('上传attachment')
      this.emailService.uploadAttachment(this.user_id, file_name, res).then(res => {
        console.log(res)
        if (res.result.res_code == 1) {
          this.attachment_list.push(res.result.res_data)
        }
      })
    }).catch(e => {
      console.log(e)
    })

  }


  /**
   * 解析uri
   * @param uri 
   */
  resolveUri(uri: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.filePath.resolveNativePath(uri).then(filePath => {
        resolve(filePath);
      }).catch(err => {
        reject(err);
      });
    })

  }







  cancel() {
    if (this.chooseEmailTo.length != 0 || this.chooseEmailcc.length != 0 || this.chooseEmailbcc.length != 0 ||
      this.attachment_list.length != 0
      || this.subject || this.body) {
      let actionSheet = this.actionSheetCtrl.create({
        title: '',
        buttons: [
          {
            text: '保存草稿',
            handler: () => {
              this.save()
            }
          },
          {
            text: '删除草稿',
            handler: () => {
              this.navCtrl.pop()
            }
          },
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      actionSheet.present();
    } else {
      this.navCtrl.pop()
    }
  }


  showEmailCC() {
    this.isShow = true
    let self = this
    setTimeout(() => {
      $("#input_email_cc").bind("input propertychange", function (event) {
        self.contact_email_cc_list = []
        if (self.email_cc) {
          for (let item of self.contact_list) {
            if ((new RegExp(self.email_cc).test(item.email))) {
              self.contact_email_cc_list.push(item);
            }
          }
        }
      });
      $("#input_email_bcc").bind("input propertychange", function (event) {
        self.contact_email_bcc_list = []
        if (self.email_bcc) {
          for (let item of self.contact_list) {
            if ((new RegExp(self.email_bcc).test(item.email))) {
              self.contact_email_bcc_list.push(item);
            }
          }
        }
      });
      // 输入框失交事件.
      $("#input_email_cc").blur(function (event) {
        let value = $.trim($('#input_email_cc').val())
        if (self.contact_email_cc_list.length == 0 && value) {
          $("#input_email_cc").val('')
          for (let i = 0; i < self.chooseEmailcc.length; i++) {
            if (value == self.chooseEmailcc[i].email) {
              return
            }
          }
          self.chooseEmailcc.push({
            'name': value,
            'email': value,
          })
          $('#input_email_cc').attr('placeholder', '')
        }
        self.contact_email_to_list = []
      });
      $("#input_email_bcc").blur(function (event) {
        let value = $.trim($('#input_email_bcc').val())
        if (self.contact_email_bcc_list.length == 0 && value) {
          $("#input_email_bcc").val('')
          for (let i = 0; i < self.chooseEmailbcc.length; i++) {
            if (value == self.chooseEmailbcc[i].email) {
              return
            }
          }
          self.chooseEmailbcc.push({
            'name': value,
            'email': value,
          })
          $('#input_email_bcc').attr('placeholder', '')
        }
        self.contact_email_to_list = []
      });
    }, 100)
  }

  save() {
    this.send_mail(true)
  }

  testEmail(email) {
    //验证邮箱的正则
    var regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    let testEmail = false
    if (email) {
      let lists = email.split(';')
      for (let i = 0; i < lists.length; i++) {
        if (lists[i]) {
          if (!regex.test(lists[i])) {
            testEmail = true
          }
        }
      }
    }
    return testEmail
  }

  email_list_to_string(item_list) {
    let email_string = '';
    if (item_list.length > 0) {
      for (let i = 0; i < item_list.length; i++) {
        email_string = email_string + item_list[i].email + ((i == item_list.length - 1) ? '' : ';')
      }
    }
    return email_string
  }

  send() {
    //验证邮箱的正则
    if (this.testEmail(this.email_list_to_string(this.chooseEmailTo)) || this.testEmail(this.email_list_to_string(this.chooseEmailcc)) || this.testEmail(this.email_list_to_string(this.chooseEmailbcc))) {
      this.alert.create({
        title: '某些电子邮件地址无效',
        buttons: [{ text: '确定' },]
      }).present();
      return;
    }

    if (this.chooseEmailTo.length == 0) {
      this.alert.create({
        title: '请输入收件人',
        buttons: [{ text: '确定' },]
      }).present();
      return;
    }
    if (!this.subject) {
      this.alert.create({
        title: '空主题',
        subTitle: '邮箱没有主题，您仍要发送吗?',
        buttons: [{ text: '取消' },
        {
          text: '发送',
          handler: () => {
            this.send_mail(false)
          }
        }
        ]
      }).present();
      return;
    }
    this.send_mail(false)
  }

  send_mail(is_draft) {
    let draft = ''
    if (is_draft) {
      draft = 'true'
    }
    let attach_list = []
    for (let i = 0; i < this.attachment_list.length; i++) {
      attach_list.push(this.attachment_list[i].id)
    }
    this.emailService.send_mail(this.user_id, this.account_id, this.email_list_to_string(this.chooseEmailTo),
      this.email_list_to_string(this.chooseEmailcc), this.email_list_to_string(this.chooseEmailbcc), this.subject, this.body, attach_list, draft)
      .then(res => {
        console.log(res)
        if (res.result == '发送成功' || res.result == "保存成功") {
          this.alert.create({
            title: res.result,
            enableBackdropDismiss: false,
            buttons: [
              {
                text: '确定',
                handler: () => {
                  this.navCtrl.pop()
                }
              }
            ]
          }).present();

        }
      })
  }

}



