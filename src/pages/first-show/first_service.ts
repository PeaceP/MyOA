import { HttpService } from '../../providers/HttpService';
import { Injectable } from '@angular/core';

@Injectable()
export class FirstShowService {
    constructor(private httpService: HttpService) {

    }
    reply_to(body){
        return this.httpService.postBody("reply_to", body);
    }

    get_event_detail(body){
        return this.httpService.postBody("get_event_detail", body);
    }

    get_schedule_list(body){
        return this.httpService.postBody("get_schedule_list", body);
    }


    get_backlog_identify(body){
        return this.httpService.postBodyNoLoading("get_backlog_identify", body);
    }
    //跳转到相应的模块
    get_res_model(body){
        return this.httpService.postBody("get_res_model", body);
    }

    delete_res_model(body){
        return this.httpService.postBody("delete_res_model", body);
    }

    get_event_type(body){
        return this.httpService.postBodyNoLoading("get_event_type", body);
    }
    
    get_all_partner(body){
        return this.httpService.postBody("get_all_partner", body);
    }

    get_calendar_alarms(body){
        return this.httpService.postBody("get_calendar_alarms", body);
    }

    create_new_schedule(body){
        return this.httpService.postBody("create_new_schedule", body);
    }

    write_wait_thing(body){
        return this.httpService.postBody("write_wait_thing", body);
    }

    finish_wait_thing(body){
        return this.httpService.postBody("write_wait_thing", body);
    }

    cancel_wait_thing(body){
        return this.httpService.postBody("cancel_wait_thing", body);
    }

    search_one_partner(body){
        return this.httpService.postBodyNoLoading("search_one_partner", body);
    }

    get_late_list(body){
        return this.httpService.postBody("get_late_list", body);
    }

    //获取审批页面的数目
    get_approval_num(body){
        return this.httpService.postBodyNoLoading("get_approval_num", body);
    }

    create_meeting(body){
        return this.httpService.postBody("create_meeting", body);
    }
    
    get_meeting(body){
        return this.httpService.postBody("get_meeting", body);
    }
    
    create_meeting_line(body){
        return this.httpService.postBody("create_meeting_line", body);
    }


    // delete_meeting_line(body){
    //     return this.httpService.postBody("delete_meeting_line", body);
    // }

    delete_meeting(body){
        return this.httpService.postBody("delete_meeting", body);
    }

    write_meeting(body){
        return this.httpService.postBody("write_meeting", body);
    }

    // get_meeting_line(body){
    //     return this.httpService.postBody("get_meeting_line", body);
    // }

    change_meeting(body){
        return this.httpService.postBody("change_meeting", body);
    }
    
    get_all_schedule(body){
        return this.httpService.postBody("get_all_schedule", body);
    }
    

    search_all_schedule(body){
        return this.httpService.postBody("search_all_schedule", body);
    }
}