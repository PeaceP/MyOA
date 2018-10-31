import { Storage } from '@ionic/storage';
import { FirstShowService } from './first_service';
import { IonicPage, NavController, NavParams , FabContainer} from 'ionic-angular';
import { Component, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the FirstShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-first-show',
  templateUrl: 'first-show.html',
  providers: [DatePipe, FirstShowService]
})
export class FirstShowPage {
  @ViewChild('fab')fab : FabContainer;
  isDay = true
  isShen = false
  isMessage = false
  user_heard: string;
  currentWeek = 1;//当前第几周
  currentDate_date ;//当前年月日
  currentDayList = []
  allDayList = []
  currentDay = 0;
  currentMonth = 0;
  currentYear = 0;
  items_day = []
  currentDate;
  currentDate_day;
  showIcon = true;//显示日历向下按钮
  uid;
  itemList=[];//待办事项列表
  notSureList=[]//没有确定日期的待办事项
  lateList=[]//预期的待办事项
  dateNow = "今天"
  showLate = false//显示逾期
  lateNum = 0
  haveThing = []//有事件的list
  need_fresh = false;
  subNum;//是否显示没有添加日程
  recoup_num//补卡销卡数目
  vacation_num//休假单数目
  bx_num//报销
  sg_num//申购
  yf_num//预付
  jk_num//借款
  isShowApprovalPoint = false
  all_approval = 0//审批总和
  type_id;//会议的类型
  event_list
  isShowBac = false
  un_read_list = []
  constructor(public navCtrl: NavController, public navParams: NavParams,private datePipe: DatePipe,
              private firshowService: FirstShowService,public storage:Storage,
              public statusBar:StatusBar) {
        this.storage.get('user').then(res => {
        this.user_heard = res.result.res_data.user_ava;
        this.uid = res.result.res_data.user_id;
        this.getDayData(this.datePipe.transform(new Date(), 'yyyy-MM-dd'))
        this.get_backlog_identify(this.currentYear, this.currentMonth)
        this.get_approval_num()
        this.getType()
      })
  }
  showback(){
    if(this.isShowBac){
      this.isShowBac = false
    }else{
      this.isShowBac = true
    }
  }
  //获取所有的待办类型
  getType(){
    let body = {
      'uid':this.uid
    }
    this.firshowService.get_event_type(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.event_list = res.result.res_data
      }
    })
  }

  ionViewWillEnter(){
    this.un_read_list = []
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
    this.storage.get('user').then(res => {
        this.uid = res.result.res_data.user_id
        this.get_approval_num()
        this.firshowService.get_un_read_reply({'uid':this.uid}).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.un_read_list = res.result.res_data
      }
    })
    this.need_fresh =this.navParams.get('need_fresh')
    if(this.need_fresh){
      this.getDayData(this.datePipe.transform((this.currentYear+'-'+this.currentMonth+'-'+this.currentDay), 'yyyy-MM-dd'))
      this.get_backlog_identify(this.currentYear, this.currentMonth)
    }
     })
  }


  //获取某一天的数据
  getDayData(date){
    let body = {
      'uid': this.uid,
      'date': date
    }
    this.firshowService.get_schedule_list(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.subNum = res.result.res_data.subNum
        this.itemList = res.result.res_data.wait
        this.notSureList = res.result.res_data.notSure
        this.lateList = res.result.res_data.late
        this.type_id = res.result.res_data.type_id
        if(this.dateNow=='今天' && res.result.res_data.num!=0){
          this.showLate = true
          this.lateNum = res.result.res_data.num
        }else{
          this.showLate = false
        }
      }
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstShowPage');
    var Y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();
    this.currentDate_date = new Date(Y + "/" + m + "/" + d)
    //日
    this.currentDay = this.currentDate_date.getDate()
    //月
    this.currentMonth = this.currentDate_date.getMonth() + 1
    //年
    this.currentYear = this.currentDate_date.getFullYear()
    //月
    this.currentDate = this.currentDate_date.getFullYear()+'年'+(this.currentDate_date.getMonth() + 1) + '月'
  //   console.log("currentDate_date="+this.currentDate_date+"  this.currentDate="+this.currentDate+"   this.currentDay="+this.currentDay
  // +"    this.currentMonth="+this.currentMonth+"  this.currentYear="+this.currentYear)
    this.setSchedule(this.currentDate_date)
    for(var i=0;i<this.currentDayList.length;i++){
      if(this.currentDayList[i].d==this.currentDay && this.currentDayList[i].m==this.currentMonth){
       this.currentWeek = Math.ceil((i+1)/7)
       break
      }
    }
    if(this.showIcon){
      this.currentDayList = this.currentDayList.slice((this.currentWeek-1)*7,this.currentWeek*7)
    }else{
      this.currentDayList = this.allDayList
    }
  }

  //控制按钮是否显示
  changeCalendar(){
    this.showIcon = false
    if(this.haveThing.length!=0){
      for(var j=0;j<this.allDayList.length;j++){
        for(var a=0;a<this.haveThing.length;a++){
          if (this.haveThing[a]
          ==this.allDayList[j].y+'-'+this.allDayList[j].m+'-'+this.allDayList[j].d){
            this.allDayList[j].s = true
            break
          }
        }
      }
    }
    this.currentDayList = this.allDayList
  }

  changeCalendarAll(){
    this.showIcon=true
        for(var i=0;i<this.currentDayList.length;i++){
          if(this.currentDayList[i].d==this.currentDay){
           this.currentWeek = Math.ceil((i+1)/7)
          }
        }
    this.currentDayList=this.currentDayList.slice((this.currentWeek-1)*7,this.currentWeek*7)
  }

  //考勤
  kaoqin(){
    this.navCtrl.push('KaoqinPage')
  }

  setSchedule(currentObj){
    
    let m = currentObj.getMonth() + 1
    let Y = currentObj.getFullYear()
    let d = currentObj.getDate();
    //获取上一个月有多少天
    let days = new Date(Y, m-1, 0).getDate();
    //当天日期
    // let dayString = Y + '/' + m + '/' + d
    let currentDayNum = new Date(Y, m, 0).getDate()
    //当天是周几+1
    let currentDayWeek = currentObj.getUTCDay() + 1
    let result = currentDayWeek - (d % 7 - 1);
    let firstKey = result <= 0 ? 7 + result : result;
    let currentDayList = []
    //本月总共有几周
    var total_weeks = this.getWeeks(Y, m) 
  //   console.log("currentDayNum="+currentDayNum+"   currentDayWeek="+currentDayWeek
  // +"    result="+result+"  firstKey="+firstKey+"   total_weeks="+total_weeks)
    var f = 0
    var num = 1//用来显示多出来的下个月的几个日期
    var snum = days-firstKey+2//用来显示多出来的上个月的几个日期
    for (var i = 0; i < total_weeks * 7; i++) {
      let date_obj = {
        y: Y,
        m: m,
        d: 0,
        s: false
      }
      if (i < firstKey - 1) {
        if (date_obj.d == 0){
          currentDayList[i] = {
             y: Y,
             m: m-1,
             d: snum,
             s: false
          }
        }  
        snum = snum+1 
      } else {
        if (f < currentDayNum) {
          date_obj.d = f + 1
          currentDayList[i] = date_obj
          f = currentDayList[i].d
        } else if (f >= currentDayNum) {
          currentDayList[i] = {
             y: Y,
             m: m+1,
             d: num,
             s: false
          }
          num = num + 1
        }
      }
      this.currentDayList = currentDayList
      this.allDayList = currentDayList
    }
  }

  getWeeks(y, m) {
    let str = new Date(y + "/" + m + '/1');
    // 当前年份
    let year = str.getFullYear();
    //  获取月份第一天是周几  周日是0
    let day = str.getDay();
    // console.log("day = "+day)
    // 获取当前月份的天数
    let days = new Date(year, m, 0).getDate();
    // 要减去开头的这几天
    let first = 0;
    day == 0 ? first = 1 : first = 8 - day;
    days = days - first;
    // console.log("first="+first+"  day="+day+"  days="+days)
    return 1 + Math.ceil(days / 7);
  }

  choose_day(date){
    if (date.m <= 0) {
      date.y = date.y - 1
      date.m = 12
    } else if (date.m > 12) {
      date.y = date.y + 1
        date.m = 1
      } 
    var choose_date = date.y + "-" + date.m + "-" + date.d
    let isQuest = false
    if(date.m>this.currentMonth){
      this.showIcon = false
      let str = ''
      if (date.m <= 12) {
        str = date.y + '/' + date.m + '/' + date.d
      } else {
        date.y = date.y + 1
        date.m = 1
        str = date.y + '/' + 1 + '/' + date.d
      }
    this.currentDate_date =  new Date(str)
    this.currentDate = this.currentDate_date.getFullYear()+"年"+(this.currentDate_date.getMonth() + 1) + '月'
    this.getDayData(this.currentDate_date.getFullYear()+'-'+(this.currentDate_date.getMonth() + 1)+'-'+this.currentDate_date.getDate())
    this.setSchedule(new Date(str))
    this.get_backlog_identify(date.y, date.m)
    }else if(date.m<this.currentMonth){
      this.showIcon = false
      let str = ''
      if (date.m <= 0) {
        date.y = date.y - 1
        date.m = 12
        str = date.y + '/' + 12 + '/' + date.d
      } else {
        str = date.y + '/' + date.m + '/' + date.d
      }
    this.currentDate_date =  new Date(str)
    this.currentDate = this.currentDate_date.getFullYear()+"年"+(this.currentDate_date.getMonth() + 1) + '月'
    this.getDayData(this.currentDate_date.getFullYear()+'-'+(this.currentDate_date.getMonth() + 1)+'-'+this.currentDate_date.getDate())
    this.setSchedule(new Date(str))
    this.get_backlog_identify(date.y, date.m)
    }else{
      isQuest = true
    }
    this.currentDate_date =  new Date(date.y + '/' + date.m + '/' + date.d)
    this.currentYear = date.y
    this.currentMonth = date.m
    this.currentDay = date.d
    var Y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();
    //日
    var da = new Date(Y + "/" + m + "/" + d).getDate()
    //月
    var mon = new Date(Y + "/" + m + "/" + d).getMonth() + 1
    //年
    var year = new Date(Y + "/" + m + "/" + d).getFullYear()
    // console.log("choose_date="+choose_date+"   day = "+year+"/"+mon+"/"+da+"  vo.s="+date.s)
    if(choose_date==(year+"-"+mon+"-"+da)){
      this.dateNow = "今天"
    }else{
      this.dateNow = date.m+'月'+date.d+'日'
    }
    if(isQuest){
      this.getDayData(choose_date)
    }

    this.items_day = []
    this.currentDay = date.d
    this.currentMonth = date.m
    this.currentYear = date.y
  }

  add_month(){
    this.showIcon = false
    var Y = this.currentDate_date.getFullYear();
    var m = this.currentDate_date.getMonth() + 1;
    var d = this.currentDate_date.getDate();
    //获取下一个月有多少天
    let days = new Date(Y, m+1, 0).getDate();
    if(d>days){
      d = days
    }
    let str = ''
    // console.log(m)
      m = m + 1
      // console.log(m)
      if (m <= 12) {
        str = Y + '/' + m + '/' + d
      } else {
        Y = Y + 1
        m = 1
        str = Y + '/' + 1 + '/' + d
      }

    this.currentDate_date =  new Date(str)
    this.currentYear = this.currentDate_date.getFullYear()
    this.currentMonth = this.currentDate_date.getMonth() + 1
    this.currentDate = this.currentYear+"年"+this.currentMonth + '月'  
    if((this.currentDate_date.getFullYear()+'-'+(this.currentDate_date.getMonth() + 1)+'-'+this.currentDate_date.getDate())==this.getNowDay()){
      this.dateNow='今天'
    }else{
      this.dateNow = this.dateNow = (this.currentDate_date.getMonth() + 1) + '月'+this.currentDate_date.getDate()+'日'
    }
    this.getDayData(this.currentDate_date.getFullYear()+'-'+(this.currentDate_date.getMonth() + 1)+'-'+this.currentDate_date.getDate())
    this.setSchedule(new Date(str))
    this.get_backlog_identify(Y, m)
  }

  getNowDay(){
    var Y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();
    //日
    var da = new Date(Y + "/" + m + "/" + d).getDate()
    //月
    var mon = new Date(Y + "/" + m + "/" + d).getMonth() + 1
    //年
    var year = new Date(Y + "/" + m + "/" + d).getFullYear()
    return year+"-"+mon+"-"+da
  }

  delete_month(){
    this.showIcon = false
    var Y = this.currentDate_date.getFullYear();
    var m = this.currentDate_date.getMonth() + 1;
    var d = this.currentDate_date.getDate();
    let str = ''
    m = m - 1
      if (m <= 0) {
        Y = Y - 1
        m = 12
        str = Y + '/' + 12 + '/' + d
      } else {
        str = Y + '/' + m + '/' + d
      }
    this.currentDate_date =  new Date(str)
    // console.log(this.currentDate_date)
    this.currentYear = this.currentDate_date.getFullYear()
    this.currentMonth = this.currentDate_date.getMonth() + 1
    this.currentDate = this.currentDate_date.getFullYear()+"年"+(this.currentDate_date.getMonth() + 1) + '月'
    if((this.currentDate_date.getFullYear()+'-'+(this.currentDate_date.getMonth() + 1)+'-'+this.currentDate_date.getDate())==this.getNowDay()){
      this.dateNow='今天'
    }else{
      this.dateNow = this.dateNow = (this.currentDate_date.getMonth() + 1) + '月'+this.currentDate_date.getDate()+'日'
    }
    this.getDayData(this.currentDate_date.getFullYear()+'-'+(this.currentDate_date.getMonth() + 1)+'-'+this.currentDate_date.getDate())
    this.setSchedule(new Date(str))
    this.get_backlog_identify(Y, m)
  }


  gotoDeatil(item){
    if(item.res_model_s=='rt.performance.appraisal.detail' && item.res_id!=false){
      let body = {
        'res_model_s': 'rt.performance.appraisal.detail',
        'uid': this.uid,
        'id': item.res_id
      }
      this.firshowService.get_res_model(body).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
          this.navCtrl.push('PerformanceStartPage',{
            'item': res.result.res_data
          })
        }
      })
    }else{
      if(this.type_id==item.type_id && item.is_meeting_sch==false){
        this.firshowService.get_event_detail({'uid': this.uid,
        'event_id': item.id}).then(res => {
          if (res.result.res_data && res.result.res_code == 1) {
            item = res.result.res_data
            this.navCtrl.push('MeetingPage',{
          'meeting_id': item.rt_meeeting_s_id,
          'isEdit': false,
          'uid': this.uid,
          'frontPage': 'FirstShowPage'
        })
          }
        })


        
      }else{
        this.firshowService.get_event_detail({'uid': this.uid,
        'event_id': item.id}).then(res => {
          if (res.result.res_data && res.result.res_code == 1) {
            item = res.result.res_data
            this.navCtrl.push('CalendarDeatilpagePage',{
          'item': item,
          'isEdit': false,
          'frontPage': 'FirstShowPage'
        })
          }})
        
      }
    }
  }

  latePage(){
    this.navCtrl.push('LateListPage')
  }

  //获取有事件的日期
  get_backlog_identify(year, month){
    let body = {
      'uid': this.uid,
      'year': year,
      'month': month
    }
    this.firshowService.get_backlog_identify(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        let list = []
        list = res.result.res_data
        this.haveThing = []
        for(var i=0;i<list.length;i++){
          this.haveThing[i] = this.datePipe.transform(new Date(list[i]), 'yyyy-M-d')
        }
        if(this.haveThing.length!=0){
          for(var j=0;j<this.currentDayList.length;j++){
            this.currentDayList[j].s = false
            for(var a=0;a<this.haveThing.length;a++){
              // console.log("this.currentDayList.length = "+j+"a = "+a)
              if (this.haveThing[a]
              ==this.currentDayList[j].y+'-'+this.currentDayList[j].m+'-'+this.currentDayList[j].d){
                this.currentDayList[j].s = true
              }
            }
          }
        }
      }
    })
  }

  // createMetting(fab: FabContainer){
  //   fab.close();
  //   this.navCtrl.push('MeetingPage', {
  //     'isEdit': true,
  //     'date': this.currentDate_date
  // })
  // }
  //创建新代办
  createWait(item,fab: FabContainer){
    fab.close();
    this.isShowBac = false
    if(this.type_id==item.id){
      this.navCtrl.push('MeetingPage', {
        'isEdit': true,
        'date': this.currentDate_date,
        'frontPage': 'FirstShowPage'
    })
    }else{
      this.navCtrl.push('CalendarDeatilpagePage', {
        'isEdit': true,
        'date': this.currentDate_date,
        'type_id': item.id,
        'type_name': item.display_name,
        'frontPage': 'FirstShowPage'
    })
    }
  }
//跳转到我的页面
  // mePage(){
  //   let options: NativeTransitionOptions = {
  //     direction: 'right',
  //     duration: 300,
  //     iosdelay: 100,
  //     androiddelay: 150,
  //     fixedPixelsTop: 0,
  //     fixedPixelsBottom: 60
  //    };
  //    this.nativePageTransitions.slide(options);
  //   this.navCtrl.push('MePage', {
  //     'from': true
  //   })
  // }
  daything(){
      this.isDay = true
      this.isMessage = false
      this.isShen = false
  }

  consider(){
    this.isDay = false
    this.isMessage = false
    this.isShen = true
  }

  message(){
    this.isDay = false
    this.isMessage = true
    this.isShen = false
  }

  toVacation(){
    this.navCtrl.push('VacationApprovalPage')
  }

  toBuka(){
    this.navCtrl.push('AttendaceRecoupPage')
  }

  //获取审批的数目
  get_approval_num(){
    let body ={
      'uid': this.uid
    }
    this.firshowService.get_approval_num(body).then(res =>{
      if(res.result.res_data && res.result.res_code == 1){
         this.recoup_num = res.result.res_data.recoup_num
         this.vacation_num = res.result.res_data.vacation_num
         this.bx_num = res.result.res_data.bx_num
         this.sg_num = res.result.res_data.sg_num
         this.jk_num = res.result.res_data.jk_num
         this.yf_num = res.result.res_data.yf_num
         this.all_approval = this.recoup_num+this.vacation_num+this.jk_num+this.bx_num+this.yf_num+this.sg_num
         if(this.all_approval!=0){
          this.isShowApprovalPoint=true
         }else{
           this.isShowApprovalPoint = false
         }
      }
    })
  }

  toAll(){
    // this.navCtrl.push('AllSchedulePage')
    this.navCtrl.push('ChooseMenuPage')
    
  }

  closeFab(){
    this.isShowBac = false
    this.fab.close()
  }

  click_un_read_reply(){
    // console.log(this.un_read_list)
    this.navCtrl.push('UnreadReplyPage',{
          item:this.un_read_list
        })
  }

  toBX(){
    this.navCtrl.push('NewReimbursementPage')
  }

  toYF(){
    this.navCtrl.push('NewZanzhiPage',{
      zz_type:'advance'
    })
  }

  toJK(){
    this.navCtrl.push('NewZanzhiPage',{
      zz_type:'temp'
    })
  }

  toSG(){
    this.navCtrl.push('NewShengouPage')
  }
}
