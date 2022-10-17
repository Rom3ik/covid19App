import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CovidStatisticService} from "../../../core/services/covid-statistic.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class WidgetComponent implements OnInit {

  @Input() 'widgetName': string = '';
  requestFinished$ = new Observable()

  constructor(private covidService: CovidStatisticService) {
  }

  ngOnInit(): void {
    this.requestFinished$ = this.covidService.requestIsFinished();
  }

}
