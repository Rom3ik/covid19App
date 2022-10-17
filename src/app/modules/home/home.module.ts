import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import {MainComponent} from "./main/main.component";
import {WidgetComponent} from "../../components/widgets/widget/widget.component";
import {CovidContentComponent} from "../../components/widgets/covid-content/covid-content.component";

@NgModule({
  declarations: [
    MainComponent,
    WidgetComponent,
    CovidContentComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
    ]
})
export class HomeModule { }
