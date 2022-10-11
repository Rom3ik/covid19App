import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CovidStatisticService} from "../../../core/services/covid-statistic.service";

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class WidgetComponent implements OnInit {



  constructor(public covidService: CovidStatisticService) {
  }

  ngOnInit(): void {
  }

}
