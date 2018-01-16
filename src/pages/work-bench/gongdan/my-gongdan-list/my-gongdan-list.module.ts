import { IonicImageViewerModule } from 'ionic-img-viewer/dist/es2015/src/module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyGongdanListPage } from './my-gongdan-list';

@NgModule({
  declarations: [
    MyGongdanListPage,
  ],
  imports: [
    IonicPageModule.forChild(MyGongdanListPage),IonicImageViewerModule
  ],
})
export class MyGongdanListPageModule {}
