import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {countries} from "../../../countries";
import {CovidStatisticService} from "../../../modules/home/services/covid-statistic.service";
import {AutoUnsubscribe} from "../../../directives/auto-unsubscribe";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-covid-widget',
  templateUrl: './covid-widget.component.html',
  styleUrls: ['./covid-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

//auto unsubscribe from all subscriptions
@AutoUnsubscribe()
export class CovidWidgetComponent implements OnInit, OnDestroy {

  casesSubscription$: Subscription = new Subscription();
  countries = countries;
  historySubscription$: Subscription = new Subscription();
  vaccinesSubscription$: Subscription = new Subscription();
  dataLoaded = false;


  constructor(public covidService: CovidStatisticService) {
  }

  ngOnInit(): void {
    this.getAlLCases('Azerbaijan');
    this.getHistory('Azerbaijan');
    this.getVaccines('Azerbaijan');
  }

  //Live cases data
  getAlLCases(country: string): void {
    this.casesSubscription$ = this.covidService.getAllCases(country)
      .subscribe((res) => {
        this.covidService.casesList = res;
        this.dataLoaded = true;
        this.covidService.dataLoaded.next(true);
      })
  }

  //Historical cases data
  getHistory(country: string): void {
    this.historySubscription$ = this.covidService.getHistory(country)
      .subscribe((res) => {
        this.covidService.historyList = res;
      })
  }

  //Vaccines data
  getVaccines(country: string): void {
    this.vaccinesSubscription$ = this.covidService.getVaccines(country)
      .subscribe((res) => {
        this.covidService.vaccinesList = res;
      })
  }

  countryChanged(event: any): void {
    this.covidService.dataLoaded.next(false);
    this.getAlLCases(event.target.value);
  }

  ngOnDestroy(): void {
  }

}
