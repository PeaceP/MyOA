import {AutoCompleteService} from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'

@Injectable()
export class SelectPersonAuto implements AutoCompleteService {
  labelAttribute = "name";

  constructor(private http:Http) {

  }
  getResults(keyword:string) {
    //   this.labelAttribute = keyword;
      console.log(keyword);
      let obj1 = {
          name:"",
          id:1,
      }
      let arr = [];
      obj1.name = "搜 名字："+keyword;
      arr.push(obj1);
    return arr;
  }
}