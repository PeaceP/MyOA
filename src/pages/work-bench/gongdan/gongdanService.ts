import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class GongDanService {
    constructor(private httpservice: HttpService) {

    }
    create_work_order(body) {
        return this.httpservice.postBody("create_work_order", body,1);
    }


    my_work_order_statistics(){
        let body = JSON.stringify({
            uid:HttpService.user_id
          });
        return this.httpservice.postBody("my_work_order_statistics", body,1);
    }


    work_order_search(){
        let body = JSON.stringify({
            uid:HttpService.user_id,
            create_uid :HttpService.user_id
          });
        return this.httpservice.postBody("work_order_search", body,1);
    }

    work_order_statistics(){
        let body = JSON.stringify({
            uid:HttpService.user_id
          });
        return this.httpservice.postBody("work_order_statistics", body,1);
    }


    getDepartment(){
        let body = JSON.stringify({
            partner_id:1
          });
        return this.httpservice.postBody("get_all_departments", body);
    }


}