import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchGpsPage } from './search-gps';

@NgModule({
  declarations: [
    SearchGpsPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchGpsPage),
  ],
})
export class SearchGpsPageModule {}
