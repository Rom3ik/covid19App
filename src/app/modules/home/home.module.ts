import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import {MainComponent} from "./main/main.component";
import {CovidWidgetComponent} from "../../components/widgets/covid-widget/covid-widget.component";

@NgModule({
  declarations: [
    MainComponent,
    CovidWidgetComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
