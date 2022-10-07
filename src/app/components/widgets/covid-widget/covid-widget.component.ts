import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {countries} from "../../../countries";
import {CovidStatisticService} from "../../../modules/home/services/covid-statistic.service";
import {AutoUnsubscribe} from "../../../decorators/auto-unsubscribe";
import {forkJoin, Subscription, throwError} from "rxjs";
import {catchError, finalize} from "rxjs/operators";

@Component({
  selector: 'app-covid-widget',
  templateUrl: './covid-widget.component.html',
  styleUrls: ['./covid-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

//auto unsubscribe from all subscriptions
@AutoUnsubscribe()
export class CovidWidgetComponent implements OnInit, OnDestroy {

  countries = countries;
  subscription$: Subscription = new Subscription();


  constructor(public covidService: CovidStatisticService) {
  }

  ngOnInit(): void {
    this.getCovidStatistic();
  }


  getCovidStatistic(country?: string) {
    this.subscription$ = forkJoin({
      cases: this.covidService.getAllCases(country ? country : 'Azerbaijan'),
      history: this.covidService.getHistory(country ? country : 'Azerbaijan'),
      vaccines: this.covidService.getVaccines(country ? country : 'Azerbaijan'),
    }).pipe(
      finalize(() => {
        this.covidService.dataLoaded.next(true);
      }),
      catchError(err => {
        return throwError(err)
      }),
    ).subscribe(res => {
      this.covidService.casesList = res.cases;
      this.covidService.vaccinesList = res.vaccines;
      this.covidService.calculateNewCases(<number>Object.values(res.history.All.dates)[0], <number>Object.values(res.history.All.dates)[1]);
    })
  }


  countryChanged(event: any): void {
    this.covidService.dataLoaded.next(false);
    this.getCovidStatistic(event.target.value);
  }

  ngOnDestroy(): void {
  }

}
