import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class SalesSearvice {
    constructor(private httpservice: HttpService) {

    }
    getQuotesList(moffset, mlimit, id) {
        let body = JSON.stringify({
            type: 'in',
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBody("get_sale_orders", body);
    }
    getSalesOrder(moffset, mlimit, id) {
        let body = JSON.stringify({
            type: 'not in',
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBody("get_sale_orders", body);
    }
    getSalesReturn(moffset, mlimit, id) {
        let body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBody("get_sale_orders", body);
    }
    getSalesOrderDetail(mid) {
        let body = JSON.stringify({
            id: mid
        });
        return this.httpservice.postBody("get_sale_orders_details", body);
    }
    getSalesReturnOrderDetail(id) {
        let body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_sale_return_details", body);
    }


    searchQuotesList(number) {
        let body = JSON.stringify({
            name: number,
            model: "sale.order",
            state: "draft"
        });
        return this.httpservice.postBody("search_sale_orders", body);
    }

    searchSalesList(number) {
        let body = JSON.stringify({
            name: number,
            model: "sale.order",
            state: "purchase"
        });
        return this.httpservice.postBody("search_sale_orders", body);
    }

    searchSalesReturnList(number) {
        let body = JSON.stringify({
            name: number,
            model: "return.goods",
        });
        return this.httpservice.postBody("search_sale_orders", body);
    }

}