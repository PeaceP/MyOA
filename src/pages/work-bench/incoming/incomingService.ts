import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class IncomingService {
    constructor(private httpservice: HttpService) {

    }

    getIncomingList(mlimit,moffset) {
        let body = JSON.stringify({
            partner_id: 0,
            picking_type_id: 1,
            state: "validate",
            limit:mlimit,
            offset:moffset
        });
       return this.httpservice.postBody("get_stock_picking_list",body,1);
    }

    searchInComingList(searchName)
    {
        let body = JSON.stringify({
            name:searchName,
        });
        return this.httpservice.postBody("search_stock_picking_name",body,1);
    }

}