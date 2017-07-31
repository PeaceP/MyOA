import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class SupplierlistService {
    constructor(private httpservice: HttpService) {

    }

    getSupplierList(mlimit,moffset) {
        let body = JSON.stringify({
            limit:mlimit,
            offset:moffset
        });
       return this.httpservice.postBody("get_supplier",body);
    }

}