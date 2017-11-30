import { Injectable } from '@angular/core';
import { APP_SERVER_URL, APP_SERVER_URL_T } from './../../providers/Constants';
import { HttpService } from '../../providers/HttpService';

@Injectable()
export class LoginService {
    constructor(private httpService: HttpService) {

    }
   


    getDBInfo() {
        return this.httpService.getNoLoading('get_db_list', null,1);
    }

    toLogin(logins,passwords,dbs) {
        let body = JSON.stringify({
            login: logins,
            password: passwords,
            db: dbs
        });
        return this.httpService.postBody('login', body,1);
    }

}
