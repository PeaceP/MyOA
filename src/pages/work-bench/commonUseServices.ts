import { HttpService } from './../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class CommonUseServices {
    constructor(private httpservice: HttpService) {

    }
    getApplyList(moffset, mlimit, id) {
        console.log("getApplyList"+moffset +"     "+mlimit)
        let body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBody("get_applylist", body);
    }
    getApplyDetail(id){
        let body = JSON.stringify({
            id : id
        });
        return this.httpservice.postBody("get_applylist_detail", body);
    }

    //  获取暂支金额,部门,产品名
    getPaymentReminding(id){
        let body = JSON.stringify({
            id : id
        });
        return this.httpservice.postBody("get_payment_reminding", body);
    }

    // 撤回
    get_retract(descrpiction,id){ 
        let body = JSON.stringify({
            active_id : id,
            description :descrpiction
        });
        return this.httpservice.postBody("get_retract", body);
    }

    // 创建审批单
    createApply(data){  
        let body = JSON.stringify(data);
        console.log("JSON 的body 是"+body)
        return this.httpservice.postBody("create_apply_order", body);
    }
}