import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {MainComponent} from "./main/main.component";
import {WidgetComponent} from "../../components/widgets/widget/widget.component";
import {CovidContentComponent} from "../../components/widgets/covid-content/covid-content.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    MainComponent,
    WidgetComponent,
    CovidContentComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule {
}
