import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class ReimbursementService {
    constructor(private httpservice: HttpService) {

    }
    getApprovalList(limit,offset,user_id)
    {
        let body = JSON.stringify({
            limit:limit,
            offset:offset,
            user_id:user_id,
        });
       return this.httpservice.postBody("wait_approval",body);
    }

    getAlreadApprovalList(limit,offset,user_id)
    {
        let body = JSON.stringify({
            limit:limit,
            offset:offset,
            user_id:user_id,
        });
       return this.httpservice.postBody("already_approved",body);
    }

    confirm1(sheet_id){
        let body = JSON.stringify({
            sheet_id:sheet_id
        });
       return this.httpservice.postBody("confirm_approve1",body);
    }

    confirm2(sheet_id){
        let body = JSON.stringify({
            sheet_id:sheet_id
        });
       return this.httpservice.postBody("confirm_approve2",body);
    }

    refuse(sheet_id,reason)
    {
        let body = JSON.stringify({
            sheet_id:sheet_id,
            reason:reason,
        });
       return this.httpservice.postBody("refuse_approve",body);
    }
}