webpackJsonp([36],{

/***/ 636:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/attendace-recoup/attendance-recoup-auto.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AttendanceAutoService = (function () {
    function AttendanceAutoService(http) {
        this.http = http;
        this.labelAttribute = "name";
    }
    AttendanceAutoService.prototype.getResults = function (keyword) {
        //   this.labelAttribute = keyword;
        console.log(keyword);
        var obj1 = {
            name: "",
            id: 1,
        };
        var obj2 = {
            name: "",
            id: 2,
        };
        var arr = [];
        obj1.name = "搜 单号：" + keyword;
        arr.push(obj1);
        obj2.name = "搜 申请人：" + keyword;
        arr.push(obj2);
        return arr;
    };
    return AttendanceAutoService;
}());
AttendanceAutoService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
], AttendanceAutoService);

//# sourceMappingURL=attendance-recoup-auto.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/attendace-recoup/attendace-recoup.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__attendanceService__ = __webpack_require__(750);
var attendace_recoup___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var attendace_recoup___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the AttendaceRecoupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AttendaceRecoupPage = (function () {
    function AttendaceRecoupPage(navCtrl, navParams, attendanceAutoService, storage, attendanceService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.attendanceAutoService = attendanceAutoService;
        this.storage = storage;
        this.attendanceService = attendanceService;
        // inner_type = 'me'
        this.inner_type = 'wait_me';
        this.me_list = [];
        this.wait_me_list = [];
        this.is_manager = false;
    }
    AttendaceRecoupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AttendaceRecoupPage');
    };
    AttendaceRecoupPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('user')
            .then(function (res) {
            _this.user_id = res.result.res_data.user_id;
            _this.attendanceService.get_is_department(res.result.res_data.user_id).then(function (result) {
                if (result.result.res_data && result.result.res_code == 1) {
                    _this.is_manager = result.result.res_data.is_manager;
                }
                if (_this.inner_type == 'wait_me') {
                    _this.click_wait_me();
                }
                else {
                    _this.click_me();
                }
            });
        });
    };
    AttendaceRecoupPage.prototype.panEvent = function ($event) {
        cordova.plugins.Keyboard.close();
    };
    AttendaceRecoupPage.prototype.click_me = function () {
        var _this = this;
        this.inner_type = 'me';
        this.me_list = [];
        this.attendanceService.get_all_edit_card(this.user_id, false).then(function (res) {
            console.log(res);
            if (res.result.res_data && res.result.res_code == 1) {
                console.log(res.result.res_data);
                _this.me_list = res.result.res_data;
            }
        });
    };
    AttendaceRecoupPage.prototype.click_wait_me = function () {
        var _this = this;
        this.inner_type = 'wait_me';
        this.wait_me_list = [];
        this.attendanceService.get_all_edit_card(this.user_id, true).then(function (my_data) {
            if (my_data.result.res_data && my_data.result.res_code == 1) {
                _this.wait_me_list = my_data.result.res_data;
            }
        });
    };
    AttendaceRecoupPage.prototype.itemClearSelected = function (event) {
        if (this.inner_type == 'wait_me') {
            this.click_wait_me();
        }
        else {
            this.click_me();
        }
    };
    AttendaceRecoupPage.prototype.itemSelected = function (event) {
        var _this = this;
        var type;
        var search_text;
        if (event.id == 1) {
            type = "rt_name";
            search_text = event.name.replace("搜 单号：", "");
        }
        else if (event.id == 2) {
            type = "rt_employee_id";
            search_text = event.name.replace("搜 申请人：", "");
        }
        this.wait_me_list = [];
        this.attendanceService.search_edit_card(type, search_text, this.user_id).then(function (res) {
            if (res.result.res_data && res.result.res_code == 1) {
                _this.wait_me_list = res.result.res_data;
            }
        });
    };
    AttendaceRecoupPage.prototype.approval_detail = function (item) {
        this.navCtrl.push('AttendanceRecoupDetailPage', {
            data_item: item,
        });
    };
    AttendaceRecoupPage.prototype.approval_detail_no_approve = function (item) {
        this.navCtrl.push('AttendanceRecoupDetailPage', {
            data_item: item,
        });
    };
    AttendaceRecoupPage.prototype.changeDate = function (date) {
        // let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
        return date;
    };
    AttendaceRecoupPage.prototype.click_submit = function () {
        this.navCtrl.push('AttendanceRecoupCreatePage');
    };
    return AttendaceRecoupPage;
}());
AttendaceRecoupPage = attendace_recoup___decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-attendace-recoup',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/attendace-recoup/attendace-recoup.html"*/'<!--\n  Generated template for the AttendaceRecoupPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>补卡审核</ion-title>\n  </ion-navbar>\n  \n</ion-header>\n\n\n<ion-content (pan)="panEvent($event)" class="main_background">\n  <!--<div class="row_class" *ngIf="is_manager == true" align-items-center>\n        <div class="left_div" align="center" tappable (click) = "click_me()">\n          <p [ngClass]="{true:\'under_line_style\',false:\'normal_style\'}[inner_type == \'me\']">我的申请</p> \n        </div>\n         <div class="right_div" align="center" tappable (click) = "click_wait_me()">\n          <p [ngClass]="{true:\'under_line_style\',false:\'normal_style\'}[inner_type == \'wait_me\']">待我审核</p>\n        </div>\n  </div>-->\n  <div class="header_div_class">\n      <ion-auto-complete class="searchbar_class" (itemSelected)="itemSelected($event)" (itemClearSelected)="itemClearSelected($event)" [dataProvider]="attendanceAutoService" showCancelButton="true"></ion-auto-complete>\n  </div>\n      <div *ngIf="inner_type == \'me\'">\n        <div class="div_class" no-lines *ngFor=\'let item of me_list\' tappable (click)=\'approval_detail_no_approve(item)\'>\n          <p text-wrap class="time_class">{{item.create_time}}</p>\n          <span text-wrap class="span_class">{{item.rt_name}}</span><span style="margin-left:10px">{{item.employee_name}}</span>\n          \n          <p text-wrap class="bottom_class"><span>月份：{{item.month_time}}</span><span style="margin-left:10px">合计：{{item.total_day}}天</span></p>\n          <p text-wrap class="state_class">{{item.state}}</p>\n          <div class="differ_class">\n          </div>\n        </div>\n\n      </div>\n\n      <div no-lines *ngIf="inner_type == \'wait_me\'">\n        <div class="div_class" no-lines *ngFor=\'let item of wait_me_list\' tappable (click)=\'approval_detail(item)\'>\n          <p text-wrap class="time_class">{{item.create_time}}</p>\n          <span text-wrap class="span_class">{{item.rt_name}}</span><span style="margin-left:10px">{{item.employee_name}}</span>\n          \n          <p text-wrap class="bottom_class"><span>月份：{{item.month_time}}</span><span style="margin-left:10px">合计：{{item.total_day}}天</span></p>\n          <p text-wrap class="state_class">{{item.state}}</p>\n          <div class="differ_class">\n          </div>\n        </div>\n        <div align="center" *ngIf="!wait_me_list || wait_me_list.length == 0">\n      <img style="width:100px;position:absolute;left:calc(50% - 50px);top:calc(50% - 60px)" src="assets/img/nodataimg.png">\n      <p style="width:100px;position:absolute;left:calc(50% - 50px);top:calc(50% + 30px);color:#c2c8cc;font-size:15px">空空如也～</p>\n    </div>\n      </div>\n  \n</ion-content>\n\n<!--<ion-footer>\n    <div tappable (click) = "click_submit()" class="footer_class">\n        我要申请\n    </div>-->\n<!--</ion-footer>-->\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/attendace-recoup/attendace-recoup.html"*/,
        providers: [AttendanceAutoService, __WEBPACK_IMPORTED_MODULE_4__attendanceService__["a" /* AttendanceService */]],
    }),
    attendace_recoup___metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], AttendanceAutoService,
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__attendanceService__["a" /* AttendanceService */]])
], AttendaceRecoupPage);

//# sourceMappingURL=attendace-recoup.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/attendace-recoup/attendace-recoup.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttendaceRecoupPageModule", function() { return AttendaceRecoupPageModule; });
/* harmony import */ var attendace_recoup_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var attendace_recoup_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__ = __webpack_require__(738);
var attendace_recoup_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AttendaceRecoupPageModule = (function () {
    function AttendaceRecoupPageModule() {
    }
    return AttendaceRecoupPageModule;
}());
AttendaceRecoupPageModule = attendace_recoup_module___decorate([
    attendace_recoup_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            AttendaceRecoupPage,
        ],
        imports: [
            attendace_recoup_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(AttendaceRecoupPage), __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__["a" /* AutoCompleteModule */]
        ],
    })
], AttendaceRecoupPageModule);

//# sourceMappingURL=attendace-recoup.module.js.map

/***/ }),

/***/ 738:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutoCompleteModule; });
/* unused harmony export AutoCompleteComponent */
/* unused harmony export BoldPrefix */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(20);






// searchbar default options
var defaultOpts = {
    cancelButtonText: 'Cancel',
    showCancelButton: false,
    debounce: 250,
    placeholder: '搜索',
    autocomplete: 'off',
    autocorrect: 'off',
    spellcheck: 'off',
    type: 'search',
    value: '',
    noItems: '',
    clearOnEdit: false,
    clearInput: false
};
var AutoCompleteComponent = (function () {
    /**
     * create a new instace
     */
    function AutoCompleteComponent() {
        this.hideListOnSelection = true;
        this.showListChanged = false;
        this.keyword = null;
        this.suggestions = [];
        this._showList = false;
        this.itemSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.itemClearSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.itemsShown = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.itemsHidden = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.ionAutoInput = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.autoFocus = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.autoBlur = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.options = {};
        // set default options
        this.defaultOpts = defaultOpts;
    }
    Object.defineProperty(AutoCompleteComponent.prototype, "showList", {
        /**
         * @return {?}
         */
        get: function () {
            return this._showList;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (this._showList === value) {
                return;
            }
            this._showList = value;
            this.showListChanged = true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AutoCompleteComponent.prototype.ngAfterViewChecked = function () {
        if (this.showListChanged) {
            this.showListChanged = false;
            this.showList ? this.itemsShown.emit() : this.itemsHidden.emit();
        }
    };
    /**
     * get items for auto-complete
     * @return {?}
     */
    AutoCompleteComponent.prototype.getItems = function () {
        var _this = this;
        var /** @type {?} */ result;
        if (this.showResultsFirst && !this.keyword) {
            this.keyword = '';
        }
        else if (this.keyword.trim() === '') {
            this.suggestions = [];
            return;
        }
        if (typeof this.dataProvider === 'function') {
            result = this.dataProvider(this.keyword);
        }
        else {
            result = this.dataProvider.getResults(this.keyword);
        }
        // if result is instanceof Subject, use it asObservable
        if (result instanceof __WEBPACK_IMPORTED_MODULE_3_rxjs__["Subject"]) {
            result = result.asObservable();
        }
        // if query is async
        if (result instanceof __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"]) {
            result
                .subscribe(function (results) {
                _this.suggestions = results;
                _this.showItemList();
            }, function (error) { return console.error(error); });
        }
        else {
            this.suggestions = result;
            this.showItemList();
        }
        // emit event
        this.ionAutoInput.emit(this.keyword);
    };
    /**
     * show item list
     * @return {?}
     */
    AutoCompleteComponent.prototype.showItemList = function () {
        this.showList = true;
    };
    /**
     * hide item list
     * @return {?}
     */
    AutoCompleteComponent.prototype.hideItemList = function () {
        this.showList = this.alwaysShowList;
    };
    /**
     * select item from list
     *
     * @param {?} selection
     *
     * @return {?}
     */
    AutoCompleteComponent.prototype.select = function (selection) {
        // this.keyword = this.dataProvider.labelAttribute == null || selection[this.dataProvider.labelAttribute] == null
        //     ? selection : selection[this.dataProvider.labelAttribute];
        // if (this.hideListOnSelection) {
        //     this.hideItemList();
        // }
        // // emit selection event
        this.hideItemList();
        this.itemSelected.emit(selection);
        this.selection = selection;
    };
    /**
     * get current selection
     * @return {?}
     */
    AutoCompleteComponent.prototype.getSelection = function () {
        return this.selection;
    };
    /**
     * get current input value
     * @return {?}
     */
    AutoCompleteComponent.prototype.getValue = function () {
        return this.keyword;
    };
    /**
     * set current input value
     * @param {?} value
     * @return {?}
     */
    AutoCompleteComponent.prototype.setValue = function (value) {
        this.keyword = value;
        return;
    };
    /**
     * /**
     * clear current input value
     * @param {?=} hideItemList
     * @return {?}
     */
    AutoCompleteComponent.prototype.clearValue = function (hideItemList) {
        if (hideItemList === void 0) { hideItemList = false; }
        this.keyword = null;
        this.selection = null;
        if (hideItemList) {
            this.hideItemList();
            this.itemClearSelected.emit(true)
        }
        return;
    };
    /**
     * set focus of searchbar
     * @return {?}
     */
    AutoCompleteComponent.prototype.setFocus = function () {
        if (this.searchbarElem) {
            this.searchbarElem.setFocus();
        }
    };
    /**
     * fired when the input focused
     * @return {?}
     */
    AutoCompleteComponent.prototype.onFocus = function () {
        this.autoFocus.emit();
    };
    /**
     * fired when the input focused
     * @return {?}
     */
    AutoCompleteComponent.prototype.onBlur = function () {
        this.autoBlur.emit();
    };
    /**
     * handle document click
     * @param {?} event
     * @return {?}
     */
    AutoCompleteComponent.prototype.documentClickHandler = function (event) {
        if ((this.searchbarElem
            && !this.searchbarElem._elementRef.nativeElement.contains(event.target))
            ||
                (!this.inputElem && this.inputElem._elementRef.nativeElement.contains(event.target))) {
            this.hideItemList();
        }
    };
    return AutoCompleteComponent;
}());
AutoCompleteComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                host: {
                    '(document:click)': 'documentClickHandler($event)',
                },
                template: "\n      <ion-input\n              #inputElem\n              (keyup)=\"getItems($event)\"\n              (tap)=\"showResultsFirst && getItems()\"\n              [(ngModel)]=\"keyword\"\n              [placeholder]=\"options.placeholder == null ? defaultOpts.placeholder : options.placeholder\"\n              [type]=\"options.type == null ? defaultOpts.type : options.type\"\n              [clearOnEdit]=\"options.clearOnEdit == null ? defaultOpts.clearOnEdit : options.clearOnEdit\"\n              [clearInput]=\"options.clearInput == null ? defaultOpts.clearInput : options.clearInput\"\n              [ngClass]=\"{'hidden': !useIonInput}\"\n              (ionFocus)=\"onFocus()\"\n              (ionBlur)=\"onBlur()\"\n      >\n      </ion-input>\n      <ion-searchbar\n              #searchbarElem\n              (ionInput)=\"getItems($event)\"\n              (tap)=\"showResultsFirst && getItems()\"\n              [(ngModel)]=\"keyword\"\n              [cancelButtonText]=\"options.cancelButtonText == null ? defaultOpts.cancelButtonText : options.cancelButtonText\"\n              [showCancelButton]=\"options.showCancelButton == null ? defaultOpts.showCancelButton : options.showCancelButton\"\n              [debounce]=\"options.debounce == null ? defaultOpts.debounce : options.debounce\"\n              [placeholder]=\"options.placeholder == null ? defaultOpts.placeholder : options.placeholder\"\n              [autocomplete]=\"options.autocomplete == null ? defaultOpts.autocomplete : options.autocomplete\"\n              [autocorrect]=\"options.autocorrect == null ? defaultOpts.autocorrect : options.autocorrect\"\n              [spellcheck]=\"options.spellcheck == null ? defaultOpts.spellcheck : options.spellcheck\"\n              [type]=\"options.type == null ? defaultOpts.type : options.type\"\n              [ngClass]=\"{'hidden': useIonInput}\"\n              (ionClear)=\"clearValue(true)\"\n              (ionFocus)=\"onFocus()\"\n              (ionBlur)=\"onBlur()\"\n      >\n      </ion-searchbar>\n      <ng-template #defaultTemplate let-attrs=\"attrs\">\n          <span [innerHTML]='(attrs.labelAttribute ? attrs.data[attrs.labelAttribute] : attrs.data) | boldprefix:attrs.keyword'></span>\n      </ng-template>\n      <ul *ngIf=\"suggestions.length > 0 && showList\">\n          <li *ngFor=\"let suggestion of suggestions\" (tap)=\"select(suggestion);$event.srcEvent.stopPropagation()\">\n              <ng-template\n                      [ngTemplateOutlet]=\"template || defaultTemplate\"\n                      [ngOutletContext]=\"\n                        {attrs:{ data: suggestion, keyword: keyword, labelAttribute: dataProvider.labelAttribute }}\"></ng-template>\n          </li>\n      </ul>\n      <p *ngIf=\"suggestions.length == 0 && showList && options.noItems\">{{ options.noItems }}</p>\n  ",
                selector: 'ion-auto-complete'
            },] },
];
/**
 * @nocollapse
 */
AutoCompleteComponent.ctorParameters = function () { return []; };
AutoCompleteComponent.propDecorators = {
    'dataProvider': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'options': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'keyword': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'showResultsFirst': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'alwaysShowList': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'hideListOnSelection': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'template': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'useIonInput': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'autoFocus': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'autoBlur': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'itemSelected': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'itemClearSelected': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'itemsShown': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'itemsHidden': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'ionAutoInput': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'searchbarElem': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"], args: ['searchbarElem',] },],
    'inputElem': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"], args: ['inputElem',] },],
};

/**
 * bolds the beggining of the matching string in the item
 */
var BoldPrefix = (function () {
    function BoldPrefix() {
    }
    /**
     * @param {?} value
     * @param {?} keyword
     * @return {?}
     */
    BoldPrefix.prototype.transform = function (value, keyword) {
        if (!keyword)
            return value;
        var /** @type {?} */ escaped_keyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return value.replace(new RegExp(escaped_keyword, 'gi'), function (str) { return str.bold(); });
    };
    return BoldPrefix;
}());
BoldPrefix.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"], args: [{
                name: 'boldprefix'
            },] },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
BoldPrefix.ctorParameters = function () { return []; };

var AutoCompleteModule = (function () {
    function AutoCompleteModule() {
    }
    /**
     * @return {?}
     */
    AutoCompleteModule.forRoot = function () {
        return {
            ngModule: AutoCompleteModule,
            providers: []
        };
    };
    return AutoCompleteModule;
}());
AutoCompleteModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                imports: [
                    __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                    __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["p" /* IonicModule */]
                ],
                declarations: [
                    AutoCompleteComponent,
                    BoldPrefix
                ],
                exports: [
                    AutoCompleteComponent,
                    BoldPrefix
                ]
            },] },
];
/**
 * @nocollapse
 */
AutoCompleteModule.ctorParameters = function () { return []; };




/***/ }),

/***/ 750:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AttendanceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AttendanceService = (function () {
    function AttendanceService(httpservice) {
        this.httpservice = httpservice;
    }
    AttendanceService.prototype.get_is_department = function (employee_id) {
        var body = JSON.stringify({
            employee_id: employee_id,
        });
        return this.httpservice.postBodyNoLoading("get_is_department", body);
    };
    AttendanceService.prototype.get_all_edit_card = function (user_id, need_approve) {
        var body = JSON.stringify({
            user_id: user_id,
            need_approve: need_approve,
        });
        return this.httpservice.postBody("get_all_edit_card", body);
    };
    AttendanceService.prototype.get_today_attendance = function (day_start, day_end, user_id) {
        var body = JSON.stringify({
            day_start: day_start,
            day_end: day_end,
            user_id: user_id,
        });
        return this.httpservice.postBody("get_today_attendance", body);
    };
    AttendanceService.prototype.save_edit_attendance = function (lines, user_id, month_time) {
        var body = JSON.stringify({
            lines: lines,
            user_id: user_id,
            month_time: month_time,
        });
        return this.httpservice.postBody("save_edit_attendance", body);
    };
    AttendanceService.prototype.submit_edit_attendance = function (lines, user_id, month_time) {
        var body = JSON.stringify({
            lines: lines,
            user_id: user_id,
            month_time: month_time,
        });
        return this.httpservice.postBody("submit_edit_attendance", body);
    };
    AttendanceService.prototype.refuse_edit_card = function (user_id, remark, edit_id) {
        var body = JSON.stringify({
            remark: remark,
            user_id: user_id,
            edit_id: edit_id,
        });
        return this.httpservice.postBody("refuse_edit_card", body);
    };
    AttendanceService.prototype.confirm_edit_card = function (user_id, remark, edit_id) {
        var body = JSON.stringify({
            remark: remark,
            user_id: user_id,
            edit_id: edit_id,
        });
        return this.httpservice.postBody("confirm_edit_card", body);
    };
    AttendanceService.prototype.back_edit_card = function (user_id, remark, edit_id) {
        var body = JSON.stringify({
            remark: remark,
            user_id: user_id,
            edit_id: edit_id,
        });
        return this.httpservice.postBody("back_edit_card", body);
    };
    AttendanceService.prototype.submit_edit_card = function (user_id, lines, edit_id, delete_arr) {
        var body = JSON.stringify({
            lines: lines,
            user_id: user_id,
            edit_id: edit_id,
            delete_arr: delete_arr,
        });
        return this.httpservice.postBody("submit_edit_card", body);
    };
    AttendanceService.prototype.save_edit_card = function (user_id, lines, edit_id, delete_arr) {
        var body = JSON.stringify({
            lines: lines,
            user_id: user_id,
            edit_id: edit_id,
            delete_arr: delete_arr,
        });
        return this.httpservice.postBody("save_edit_card", body);
    };
    AttendanceService.prototype.search_edit_card = function (type, search_text, user_id) {
        var body = JSON.stringify({
            type: type,
            search_text: search_text,
            user_id: user_id,
        });
        return this.httpservice.postBody("search_edit_card", body);
    };
    return AttendanceService;
}());
AttendanceService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], AttendanceService);

//# sourceMappingURL=attendanceService.js.map

/***/ })

});
//# sourceMappingURL=36.js.map