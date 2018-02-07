import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { HttpService } from './../../../providers/HttpService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { GongDanService } from './gongdanService';
import { DatePipe } from '@angular/common';
import { DatePicker } from '@ionic-native/date-picker';
import { Utils } from '../../../providers/Utils';
import { MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the GongdanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gongdan',
  templateUrl: 'gongdan.html',
  providers: [GongDanService, DatePipe]
})
export class GongdanPage {
  canvas: any;
  ctx: any;
  boHeight: any;
  posHeight: any;
  step: any;
  lines: any;
  show_type;
  processNumber;
  unassignNumber;
  unacceptTitle = "待受理";
  unassignTitle = "待验收";
  processTitle = "受理中";
  dataList = [];
  doneTongji = 0;
  checkTongji = 0;
  unacceptTongji = 0;
  processTongji = 0;
  is_android;
  page_issue_state;
  startDate;
  startDate_gongdan = this.datePipe.transform('2018-01-01', 'yyyy-MM-dd');
  endDate;
  endDate_gongdan = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  total_number = 0;
  more_48_number = 0;
  searchAtMeNumber = 0;
  biaoqianList = []
  biaoqian_select_ids = [];
  tag_ids = []
  inner_type
  department = false;
  brand_ids = []
  area_ids = []
  category_ids = []
  user_id
  constructor(public navCtrl: NavController, public navParams: NavParams, public statusbar: StatusBar,
    public gongdanService: GongDanService, public platform: Platform, private datePipe: DatePipe,
    private datePicker: DatePicker, private toastCtrl: ToastController,
    public menu: MenuController,public storage: Storage,public alertCtrl:AlertController) {
    this.inner_type = "all"
    this.is_android = this.platform.is('android')
    
    this.storage.get('user')
      .then(res => {
        console.log(res)
        if (res.result.res_data.department)
        {
          this.user_id = res.result.res_data.user_id
          this.department = true;
          console.log(11111+res.result.res_data.user_id)
          this.click_gongdan()
        }
      })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GongdanPage');
    
    // this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
  }

  ionViewWillEnter(){
    this.statusbar.backgroundColorByHexString("#2597ec");
    this.statusbar.styleLightContent();
  }

  ionViewDidEnter() {
    console.log(this.navParams.get('need_fresh'))
    if (this.navParams.get('need_fresh') == true) {
      this.navParams.data.need_fresh = false;
      // this.reload_statics()
      this.getDataList(this.page_issue_state)
    }
    // console.log(this.navParams.get('select_ids') )
    // if (this.navParams.get('select_ids')&&(this.navParams.get('select_ids').length || this.navParams.get('select_ids').length == 0)) {
    //   this.biaoqian_select_ids = this.navParams.data.select_ids
    //   this.navParams.data.select_ids = [];
    //   this.reload_statics()
    //   this.getDataList(this.page_issue_state)
    // }
    let need_load = false
    if (this.navParams.get('brand_list') && (this.navParams.get('brand_list').length || this.navParams.get('brand_list').length == 0)){
      this.brand_ids = this.navParams.get('brand_list')
      this.navParams.data.brand_list = false;
      need_load = true
    }
    if (this.navParams.get('area_list') && (this.navParams.get('area_list').length || this.navParams.get('area_list').length == 0)){
      this.area_ids = this.navParams.get('area_list')
      this.navParams.data.area_list = false;
      need_load = true
    }
    if (this.navParams.get('category_list') && (this.navParams.get('category_list').length || this.navParams.get('category_list').length == 0)){
      this.category_ids = this.navParams.get('category_list')
      this.navParams.data.category_list = false;
      need_load = true
    }
    if(need_load)
    {
      this.getDataList(this.page_issue_state)
    }
      


    if (this.show_type == "me") {
      this.click_me()
    }
  }


  ionViewWillLeave() {
    this.statusbar.backgroundColorByHexString("#ffffff");
    this.statusbar.styleDefault();
  }

  click_me() {
    // this.looper(this.canvas);
    this.show_type = "me"
    this.gongdanService.my_work_order_statistics().then(res => {
      if (res.result && res.result.res_code == 1 && res.result.res_data) {
        this.processNumber = res.result.res_data.process
        this.unassignNumber = res.result.res_data.check
      }
      console.log(res)
    })
    this.searchAtMeNumberFunction()
  }





  click_gongdan() {
    this.endDate_gongdan = this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    this.startDate_gongdan = this.datePipe.transform('2018-01-01', 'yyyy-MM-dd')
    this.dataList = []
    this.show_type = "gongdan"
    this.inner_type = "all"
    this.getDataList(null)
  }

  click_tongji() {
    this.show_type = "tongji"
    this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    this.startDate =  new Date().getFullYear()+'-01-01'
    this.dateChanged();
  }



  looper(canvas) {

    let ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 100;
    //如果浏览器支持requestAnimFrame则使用requestAnimFrame否则使用setTimeout  
    function requestAnimFrame(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
    // 波浪大小
    var boHeight = canvas.height / 10;
    var posHeight = canvas.height / 1.2;
    //初始角度为0  
    var step = 0;
    //定义三条不同波浪的颜色  
    var lines = [
      "rgba(0,255,255, 0.2)",
      "rgba(200,236,253, 0.2)"];
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      step++;
      //画3个不同颜色的矩形  
      for (var j = lines.length - 1; j >= 0; j--) {
        ctx.fillStyle = lines[j];
        //每个矩形的角度都不同，每个之间相差45度  
        var angle = (step + j * 50) * Math.PI / 180;
        var deltaHeight = Math.sin(angle) * boHeight;
        var deltaHeightRight = Math.cos(angle) * boHeight;
        ctx.beginPath();
        ctx.moveTo(0, posHeight + deltaHeight);
        ctx.bezierCurveTo(canvas.width / 2, posHeight + deltaHeight - boHeight, canvas.width / 2, posHeight + deltaHeightRight - boHeight, canvas.width, posHeight + deltaHeightRight);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.lineTo(0, posHeight + deltaHeight);
        ctx.closePath();
        ctx.fill();
      }
      requestAnimFrame(loop);
    }
    loop();
  }
  goBack() {
    this.navCtrl.pop();
    this.statusbar.backgroundColorByHexString("#ffffff");
    this.statusbar.styleDefault();

  }

  click_detail() {
    this.navCtrl.push('GongdanDetailPage')
  }



  // 我提交的工单  xd
  mySubmitList() {
    let body = JSON.stringify({
      uid: HttpService.user_id,
      create_uid: HttpService.user_id,
      contantDraft :true
    });
    this.requestWorkOrderSearch(body, "我提交的")
  }

  // 我受理中的
  myProcessList() {
    let body = JSON.stringify({
      uid: HttpService.user_id,
      assign_uid: HttpService.user_id,
      issue_state: "process",
    });
    this.requestWorkOrderSearch(body, "我受理中的")
  }

  // 待他人验收
  waitOtherAssign() {
    let body = JSON.stringify({
      uid: HttpService.user_id,
      assign_uid: HttpService.user_id,
      issue_state: "check",
    });
    this.requestWorkOrderSearch(body, '待他人验收的')
  }

  // 我已完成的
  myFinished() {
    let body = JSON.stringify({
      uid: HttpService.user_id,
      assign_uid: HttpService.user_id,
      issue_state: "done",
    });
    this.requestWorkOrderSearch(body, "我已完成的")
  }

  // 我回复过的
  myReply() {
    let body = JSON.stringify({
      isSearchOrder: true,
      uid: HttpService.user_id,
      create_uid: HttpService.user_id,
      record_type: 'reply'
    });
    this.requestWorkOrderSearch(body, "我回复过的")
  }



  // 我指派过的
  myAssigned() {
    let body = JSON.stringify({
      isSearchOrder: true,
      uid: HttpService.user_id,
      create_uid: HttpService.user_id,
      record_type: 'assign'
    });
    this.requestWorkOrderSearch(body, "我指派过的")
  }



  searchAtMe() {
    this.navCtrl.push("AtMeListPage")
  }

  searchAtMeNumberFunction() {
    let body = JSON.stringify({
      uid: HttpService.user_id,
      assign: HttpService.user_id,
      reply: HttpService.user_id,
      isSearchOrder: true,
      isRead: false,
      isNumber :true 
    });
    this.gongdanService.searchAtMe(body).then(res => {
      console.log(res)
      if (res.result && res.result.res_code == 1 && res.result.res_data) {
        this.searchAtMeNumber = res.result.res_data.length
      } else {
        this.searchAtMeNumber = 0
      }
    })
  }



  more48Hour() {
    let body = JSON.stringify({
      uid: HttpService.user_id,
      start_date: this.startDate,
      end_date: this.datePipe.transform(new Date(new Date().getTime() - 3600000 * 48), 'yyyy-MM-dd'),
      issue_state: 'unaccept'
    });
    console.log(this.datePipe.transform(new Date(), 'yyyy-MM-dd'))
    console.log(body)
    this.requestWorkOrderSearch(body,'超过48小时未受理')
  }


  moreThan_48_Hour_number() {
    let body = JSON.stringify({
      uid: HttpService.user_id,
      start_date: this.startDate,
      end_date: this.datePipe.transform(new Date(new Date().getTime() - 3600000 * 48), 'yyyy-MM-dd'),
      issue_state: 'unaccept'
    });
    this.gongdanService.work_order_searchNoLoading(body).then(res => {
      if (res.result && res.result.res_code == 1 ) {
        if(res.result.res_data){
          this.more_48_number = res.result.res_data.length;
        }else{
          this.more_48_number = 0;
        }
      }
    })
  }


  chooseStartDate() {
    this.datePicker.show({
      date: new Date(this.startDate),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      cancelButtonLabel: "取消",
      cancelText: "取消",
      doneButtonLabel: "确定",
      locale: "zh-Hans",
    }).then(
      date => {
        if (this.endDate >= this.datePipe.transform(date, 'yyyy-MM-dd')) {
          this.startDate = this.datePipe.transform(date, 'yyyy-MM-dd')
          this.dateChanged();
        } else {
          Utils.toastButtom("请选择正确的日期", this.toastCtrl)
        }
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  chooseStartDate_gongdan() {
    this.datePicker.show({
      date: new Date(this.startDate_gongdan),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      cancelButtonLabel: "取消",
      cancelText: "取消",
      doneButtonLabel: "确定",
      locale: "zh-Hans",
    }).then(
      date => {
        if (this.endDate_gongdan >= this.datePipe.transform(date, 'yyyy-MM-dd')) {
          this.startDate_gongdan = this.datePipe.transform(date, 'yyyy-MM-dd')
          // this.reload_statics()
    this.getDataList(this.page_issue_state)
  
        } else {
          Utils.toastButtom("请选择正确的日期", this.toastCtrl)
        }
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  chooseEndDate() {
    this.datePicker.show({
      date: new Date(this.endDate),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      cancelButtonLabel: "取消",
      cancelText: "取消",
      doneButtonLabel: "确定",
      locale: "zh-Hans",
    }).then(
      date => {
        if (this.datePipe.transform(date, 'yyyy-MM-dd') >= this.startDate) {
          this.endDate = this.datePipe.transform(new Date(new Date(date).getTime()), 'yyyy-MM-dd')
          this.dateChanged();
        } else {
          Utils.toastButtom("请选择正确的日期", this.toastCtrl)
        }
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  chooseEndDate_gongdan() {
    this.datePicker.show({
      date: new Date(this.endDate_gongdan),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      cancelButtonLabel: "取消",
      cancelText: "取消",
      doneButtonLabel: "确定",
      locale: "zh-Hans",
    }).then(
      date => {
        if (this.datePipe.transform(date, 'yyyy-MM-dd') >= this.startDate_gongdan) {
          this.endDate_gongdan = this.datePipe.transform(date, 'yyyy-MM-dd')
          // this.reload_statics()
    this.getDataList(this.page_issue_state)
        } else {
          Utils.toastButtom("请选择正确的日期", this.toastCtrl)
        }
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  dateChanged() {
    this.gongdanService.work_order_statisticsWithTime(this.startDate,this.datePipe.transform(new Date(new Date(this.endDate).getTime() + 3600000 * 24), 'yyyy-MM-dd')).then(res => {
      console.log(res)
      if (res.result && res.result.res_code == 1 && res.result.res_data) {
        this.processTongji = res.result.res_data.process ? parseInt(res.result.res_data.process) : 0
        this.unacceptTongji = res.result.res_data.unaccept ? parseInt(res.result.res_data.unaccept) : 0
        this.checkTongji = res.result.res_data.check ? parseInt(res.result.res_data.check) : 0
        this.doneTongji = res.result.res_data.done ? parseInt(res.result.res_data.done) : 0
        let total = this.processTongji + this.checkTongji + this.doneTongji + this.unacceptTongji
        this.total_number = total
        if (total == 0) {
          this.drawRings(0, 0, 0, 1)
        } else {
          this.drawRings(this.processTongji / total, this.unacceptTongji / total, this.checkTongji / total, this.doneTongji / total)
        }
      }
    })
    this.moreThan_48_Hour_number();

  }



  requestWorkOrderSearch(body, title = "") {
    this.gongdanService.work_order_search(body).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.navCtrl.push("MyGongdanListPage", { gongdanList: res.result.res_data, title: title })
      }
    })
  }


  processTongjiWithTime() {
    let body = JSON.stringify({
      uid: HttpService.user_id,
      start_date: this.startDate,
      end_date: this.endDate,
      issue_state: 'process'
    });
    this.requestWorkOrderSearch(body);
  }


  doneTongjiWithTime() {
    let body = JSON.stringify({
      uid: HttpService.user_id,
      start_date: this.startDate,
      end_date: this.endDate,
      issue_state: 'done'
    });
    this.requestWorkOrderSearch(body);
  }
  checkTongjiWithTime() {
    let body = JSON.stringify({
      uid: HttpService.user_id,
      start_date: this.startDate,
      end_date: this.endDate,
      issue_state: 'check'
    });
    this.requestWorkOrderSearch(body);
  }
  unacceptTongjiWithTime() {
    let body = JSON.stringify({
      uid: HttpService.user_id,
      start_date: this.startDate,
      end_date: this.endDate,
      issue_state: 'unaccept'
    });
    this.requestWorkOrderSearch(body);
  }






  createGongdan() {
    if (this.department)
    {
      this.navCtrl.push("CreateGongdanPage")
    }
    else
  {
    let ctrl = this.alertCtrl;
    ctrl.create({
              title: '提示',
              subTitle: "该用户没有设置员工,请联系管理员",
              buttons: [{
                text: '确定',
                handler: () => {
                 
                }
              }
              ]
            }).present();
  }
    
  }

  drawRings(a, b, c, d) {
    var data = [a, b, c, d];//五个扇形的占比

    var dataColor = ["#1897f2", '#faa619', '#fce63a', '#c3e369'];//五个扇形的颜色

    var angleStart = 0, angleEnd, angle;

    var Q3Canvas = <HTMLCanvasElement>document.getElementById('rings');

    Q3Canvas.width = 200;
    Q3Canvas.height = 200;

    var ctx = Q3Canvas.getContext("2d");

    for (var i = 0; i < data.length; i++) {

      angle = 2 * Math.PI * data[i];

      angleEnd = angleStart + angle;

      ctx.beginPath();

      ctx.fillStyle = dataColor[i];


      ctx.arc(Q3Canvas.width / 2, Q3Canvas.height / 2, Q3Canvas.width / 2, angleStart, angleEnd);

      ctx.lineTo(Q3Canvas.width / 2, Q3Canvas.height / 2);

      ctx.closePath();

      ctx.fill();

      angleStart = angleEnd;//设置画下一个扇形的起点位置

    };
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.arc(Q3Canvas.width / 2, Q3Canvas.height / 2, Q3Canvas.width / 4, 0, 360);
    ctx.closePath();
    ctx.fill();



  }

  changeState(item) {
    let state_str = "";
    if (item == "unaccept") {
      state_str = "待受理"
    }
    else if (item == "process") {
      state_str = "受理中"
    }
    else if (item == "check") {
      state_str = "待验收"
    }
    else if (item == "done") {
      state_str = "已完成"
    }
    else if (item == "draft") {
      state_str = "草稿"
    }
    return state_str
  }

  unacceptClick() {
    this.getDataList("unaccept")
  }

  processClick() {
    this.getDataList("process")
  }

  unassignClick() {
    this.getDataList("check")
  }

  allClick(){
    this.getDataList(null)
  }

  getDataList(state) {
    this.dataList = [];
    this.page_issue_state = state;
    this.gongdanService.work_order_search(JSON.stringify({
      start_date: this.startDate_gongdan,
      end_date: this.datePipe.transform(new Date(new Date(this.endDate_gongdan).getTime() + 3600000 * 24), 'yyyy-MM-dd'),//          
      uid: this.user_id,
      issue_state: state,
      category_ids: this.category_ids,
      brand_ids:this.brand_ids,
      area_ids:this.area_ids,
    })).then(res => {
      console.log(res)
      if (res.result.res_data) {
        for (let item of res.result.res_data) {
          this.dataList.push(item)
        }
      }
    })

    this.reload_statics()
  }

  gongdanDetail(item) {
    this.gongdanService.getGongdanDetail(item.work_order_id).then(res => {
      console.log(res)
      if (res.result.res_data && res.result.res_code == 1) {
        this.navCtrl.push('GongdanDetailPage', {
          items: res.result.res_data,
          biaoqian_list: this.biaoqianList,
        })
      }
    })
  }

  search_gongdan() {
    this.navCtrl.push("GongdanSearchPage")


  }

  clickMenu() {
    this.navCtrl.push('GongdanBiaoqianPage',{
      brand_ids:this.brand_ids,
      area_ids:this.area_ids,
      category_ids:this.category_ids,
    })
    // this.menu.open()
    // this.gongdanService.get_all_biaoqian().then(res => {
    //   console.log(res)
    //   if (res.result.res_data && res.result.res_code == 1) {
    //     this.biaoqianList = res.result.res_data.res_data;
    //   }
    // })
  }


  changeDate(date) {
    if(date){
      let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
      return new_date;
    }
  }


  reload_statics(){
    this.gongdanService.work_order_statistics(this.startDate_gongdan,this.datePipe.transform(new Date(new Date(this.endDate_gongdan).getTime() + 3600000*24), 'yyyy-MM-dd'),this.brand_ids,this.area_ids,this.category_ids,this.user_id).then(res => {
      if (res.result.res_data) {
        if (res.result.res_data.unaccept) {
          this.unacceptTitle = "待受理" + " (" + res.result.res_data.unaccept + ")";
        }
        else {
          this.unacceptTitle = "待受理"
        }
        if (res.result.res_data.check) {
          this.unassignTitle = "待验收" + " (" + res.result.res_data.check + ")";
        }
        else {
          this.unassignTitle = "待验收"
        }
        if (res.result.res_data.process) {
          this.processTitle = "受理中" + " (" + res.result.res_data.process + ")";
        }
        else {
          this.processTitle = "受理中"
        }
      }
      else
      {
        this.unacceptTitle = "待受理"
        this.unassignTitle = "待验收"
        this.processTitle = "受理中"
      }
    })
  }

  click_all(){
    this.inner_type = "all"
    this.allClick()
  }

  click_one(){
    this.inner_type = "first"
    this.unacceptClick()
  }

  click_two(){
    this.inner_type = "second"
    this.processClick()
  }

  click_three(){
    this.inner_type = "third"
    this.unassignClick()
  }

  changeSelectStartDate(event){
    if (this.endDate_gongdan >= this.datePipe.transform(event, 'yyyy-MM-dd')) {
          this.startDate_gongdan = this.datePipe.transform(event, 'yyyy-MM-dd')
          this.reload_statics()
    this.getDataList(this.page_issue_state)
  
        } else {
          Utils.toastButtom("请选择正确的日期", this.toastCtrl)
        }
  }
  changeSelectEndDate(event){
    if (this.datePipe.transform(event, 'yyyy-MM-dd') >= this.startDate_gongdan) {
          this.endDate_gongdan = this.datePipe.transform(event, 'yyyy-MM-dd')
          this.reload_statics()
    this.getDataList(this.page_issue_state)
        } else {
          Utils.toastButtom("请选择正确的日期", this.toastCtrl)
        }
  }
}
