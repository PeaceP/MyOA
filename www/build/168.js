webpackJsonp([168],{

/***/ 643:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/attendace-recoup/attendance-update/attendance-update.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_date_picker__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_Utils__ = __webpack_require__(239);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the AttendanceUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AttendanceUpdatePage = (function () {
    function AttendanceUpdatePage(navCtrl, navParams, alertCtrl, toastCtrl, datePipe, datePicker) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.datePipe = datePipe;
        this.datePicker = datePicker;
        this.type_arr = ['补卡', '销卡'];
        this.type_index = 0;
        this.work_type_arr = ['上班', '下班'];
        this.work_type_index = 0;
        this.time_add = '';
        this.time_delete = '请选择 >';
        this.is_edit = false;
        this.time = '请选择时间 >';
        this.time_str = '请选择日期 >';
        this.is_edit = this.navParams.get('is_edit');
        this.month_time = this.navParams.get('month_time');
        if (this.is_edit) {
            var before_data = this.navParams.get('item_data');
            this.attendance_id = before_data.attendance_id ? before_data.attendance_id : false;
            before_data.attendance_type = 0;
            this.show_work_type = before_data.attendance_work_type;
            if (before_data.attendance_work_type == '上班') {
                before_data.attendance_work_type = 0;
            }
            else if (before_data.attendance_work_type == '下班') {
                before_data.attendance_work_type = 1;
            }
            this.remark = before_data.remark;
            this.type_index = before_data.attendance_type;
            this.work_type_index = before_data.attendance_work_type;
            if (this.type_index == 0) {
                this.time = before_data.attendance_time.split(' ')[1];
                this.time_str = before_data.attendance_time.split(' ')[0];
                // this.time_add = before_data.attendance_time.replace(' ','T') + "Z"
                this.time_add = before_data.attendance_time;
            }
            else {
                this.time_delete = before_data.attendance_time;
            }
        }
        else {
            this.time_add = this.month_time + "-01 00:00";
        }
    }
    AttendanceUpdatePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AttendanceUpdatePage');
    };
    AttendanceUpdatePage.prototype.ionViewWillEnter = function () {
        // let time = this.navParams.get("time")
        // let work_type = this.navParams.get('work_type')
        // if (this.navParams.get('attendance_id'))
        // {
        //   this.attendance_id = this.navParams.get('attendance_id')
        // } 
        // if (time && work_type){
        //     this.time_delete = time
        //     if (work_type == '上班'){
        //       this.work_type_index = 0
        //     }
        //     else
        //     {
        //       this.work_type_index = 1
        //     }
        // }
    };
    AttendanceUpdatePage.prototype.confirm = function () {
        var mString = "";
        var time;
        var type = this.type_index;
        var work_type = this.work_type_index;
        if (this.type_index == 0) {
            if (this.time_add == '' || this.time == '请选择时间 >' || this.time_str == '请选择日期 >') {
                mString = "请选择日期和时间";
            }
            else {
                time = this.time_add.replace('T', ' ').replace('Z', '');
            }
        }
        else {
            time = this.time_delete;
        }
        if (mString != "") {
            __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom(mString, this.toastCtrl);
        }
        else {
            if (this.is_edit) {
                //   this.attendanceRecoupCreatePage.data.data = {
                //   attendance_type:type,
                //   attendance_work_type:work_type,
                //   attendance_time:time.replace('T',' ').replace('Z',''),
                //   remark:this.remark ? this.remark : '', 
                //   attendance_id: this.attendance_id ? this.attendance_id : false,
                //   is_edit:true,
                // }
                //   this.attendanceRecoupCreatePage.data.item_index = this.navParams.get('item_index')
            }
        }
    };
    AttendanceUpdatePage.prototype.cancel = function () {
        var _this = this;
        this.alertCtrl.create({
            title: '提示',
            subTitle: '已输入内容，是否确认返回？',
            buttons: [{ text: '取消' },
                {
                    text: '确定',
                    handler: function () {
                        _this.navCtrl.pop();
                    }
                }
            ]
        }).present();
    };
    AttendanceUpdatePage.prototype.click_time = function () {
        this.navCtrl.push('AttendanceAllDataPage', {
            edit: true,
        });
    };
    AttendanceUpdatePage.prototype.chooseDate = function () {
        var _this = this;
        var month_start = this.month_time + "-01 00:00:00";
        var month_end = this.month_time + '-' + new Date(this.month_time.split('-')[0], this.month_time.split('-')[1], 0).getDate() + ' 23:59:59';
        this.datePicker.show({
            date: new Date(this.datePipe.transform(new Date(new Date(this.time_add.replace(/-/g, "/")).getTime() - 3600000 * 8), 'yyyy-MM-dd HH:mm').replace(' ', 'T') + 'Z'),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
            cancelButtonLabel: "取消",
            cancelText: "取消",
            doneButtonLabel: "确定",
            locale: "zh-Hans",
            maxDate: new Date(this.datePipe.transform(new Date(new Date(month_end.replace(/-/g, "/")).getTime() - 3600000 * 8), 'yyyy-MM-dd HH:mm').replace(' ', 'T') + 'Z'),
            minDate: new Date(this.datePipe.transform(new Date(new Date(month_start.replace(/-/g, "/")).getTime() - 3600000 * 8), 'yyyy-MM-dd HH:mm').replace(' ', 'T') + 'Z'),
        }).then(function (date) {
            _this.time_add = _this.datePipe.transform(date, 'yyyy-MM-dd HH:mm');
            _this.time_str = _this.datePipe.transform(date, 'yyyy-MM-dd');
        }, function (err) { return console.log('Error occurred while getting date: ', err); });
    };
    AttendanceUpdatePage.prototype.chooseTime = function () {
        var _this = this;
        var month_start = this.month_time + "-01 00:00:00";
        var month_end = this.month_time + '-' + new Date(this.month_time.split('-')[0], this.month_time.split('-')[1], 0).getDate() + ' 23:59:59';
        this.datePicker.show({
            date: new Date(this.datePipe.transform(new Date(new Date(this.time_add.replace(/-/g, "/")).getTime() - 3600000 * 8), 'yyyy-MM-dd HH:MM').replace(' ', 'T') + 'Z'),
            mode: 'time',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
            cancelButtonLabel: "取消",
            cancelText: "取消",
            doneButtonLabel: "确定",
            locale: "zh-Hans",
            maxDate: new Date(this.datePipe.transform(new Date(new Date(month_end.replace(/-/g, "/")).getTime() - 3600000 * 8), 'yyyy-MM-dd HH:mm').replace(' ', 'T') + 'Z'),
            minDate: new Date(this.datePipe.transform(new Date(new Date(month_start.replace(/-/g, "/")).getTime() - 3600000 * 8), 'yyyy-MM-dd HH:mm').replace(' ', 'T') + 'Z'),
        }).then(function (date) {
            _this.time_add = _this.datePipe.transform(date, 'yyyy-MM-dd HH:mm');
            _this.time = _this.datePipe.transform(date, 'HH:mm');
        }, function (err) { return console.log('Error occurred while getting date: ', err); });
    };
    return AttendanceUpdatePage;
}());
AttendanceUpdatePage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-attendance-update',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/attendace-recoup/attendance-update/attendance-update.html"*/'<!--\n  Generated template for the AttendanceUpdatePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n\n  <ion-navbar hideBackButton="true" color="gongdan-color">\n    <ion-buttons left>\n      <button ion-button (click)="cancel()">\n        取消\n      </button>\n    </ion-buttons>\n    <ion-title>更新打卡\n    </ion-title>\n    <ion-buttons right>\n      <button ion-button (click)="confirm()">\n        确定\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background-color:#f0f2f5">\n  <!--<ion-item class="item_class">\n    <ion-label class="left_label">补卡销卡类型</ion-label>\n    <ion-select *ngIf=\'!is_edit\' [(ngModel)]="type_index" cancelText="取消" okText="确定" class="normal_select">\n      <ion-option *ngFor="let item of type_arr;let i = index;" value={{i}}>{{item}}</ion-option>\n    </ion-select>\n    <ion-label *ngIf=\'is_edit\' style="font-size:80%" item-end class="right_label" >{{type_arr[type_index]}}</ion-label>\n  </ion-item>-->\n  <ion-item class="item_class">\n    <ion-label class="left_label">上下班类型</ion-label>\n    <!--<ion-select [(ngModel)]="work_type_index" cancelText="取消" okText="确定" class="normal_select">\n      <ion-option *ngFor="let item of work_type_arr;let i = index;" value={{i}}>{{item}}</ion-option>\n    </ion-select>-->\n    <span item-end style="margin-left:14px;font-size:13px;color: gray;" >\n          {{show_work_type}} \n      </span>\n  </ion-item>\n  \n  <ion-item *ngIf="type_index == 0" class="item_class">\n    <ion-label class="left_label">日期</ion-label>\n    <!--<ion-datetime placeholder=\'请选择 >\' style="font-size:80%" item-end displayFormat="DD日 HH:mm" pickerFormat="MM-DD HH:mm" [(ngModel)]="time_add" cancelText="取消" doneText="确定"></ion-datetime>-->\n    <span item-end style="margin-left:14px;font-size:13px;color: gray;" tappable (click)="chooseDate()">\n          {{time_str}} \n      </span>\n  </ion-item>\n  <ion-item *ngIf="type_index == 0" no-lines class="item_class">\n    <ion-label class="left_label">时间</ion-label>\n    <!--<ion-datetime placeholder=\'请选择 >\' style="font-size:80%" item-end displayFormat="DD日 HH:mm" pickerFormat="MM-DD HH:mm" [(ngModel)]="time_add" cancelText="取消" doneText="确定"></ion-datetime>-->\n    <span item-end style="margin-left:14px;font-size:13px;color: gray;" tappable (click)="chooseTime()">\n          {{time}} \n      </span>\n  </ion-item>\n  <!--<ion-item *ngIf="type_index == 1" no-lines class="item_class">\n    <ion-label class="left_label">时间</ion-label>\n    <ion-label placeholder=\'请选择 >\' style="font-size:80%" item-end class="right_label" tappable (click)="click_time()">{{time_delete}}</ion-label>\n  </ion-item>-->\n  <div style="background-color:white;margin-top:10px;">\n    <div class="textarea_title">\n      备注\n    </div>\n    <ion-textarea class="textarea_class" placeholder="请输入原因" [(ngModel)]="remark"></ion-textarea>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/attendace-recoup/attendance-update/attendance-update.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__angular_common__["DatePipe"]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["E" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__angular_common__["DatePipe"],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_date_picker__["a" /* DatePicker */]])
], AttendanceUpdatePage);

//# sourceMappingURL=attendance-update.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/attendace-recoup/attendance-update/attendance-update.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttendanceUpdatePageModule", function() { return AttendanceUpdatePageModule; });
/* harmony import */ var attendance_update_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var attendance_update_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var attendance_update_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AttendanceUpdatePageModule = (function () {
    function AttendanceUpdatePageModule() {
    }
    return AttendanceUpdatePageModule;
}());
AttendanceUpdatePageModule = attendance_update_module___decorate([
    attendance_update_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            AttendanceUpdatePage,
        ],
        imports: [
            attendance_update_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(AttendanceUpdatePage),
        ],
    })
], AttendanceUpdatePageModule);

//# sourceMappingURL=attendance-update.module.js.map

/***/ })

});
//# sourceMappingURL=168.js.map