import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {countries} from "../../../countries";
import {CovidStatisticService} from "../../../modules/home/services/covid-statistic.service";
import {AutoUnsubscribe} from "../../../decorators/auto-unsubscribe";
import {forkJoin, of, Subscription, throwError} from "rxjs";
import {catchError, finalize} from "rxjs/operators";

@Component({
  selector: 'app-covid-widget',
  templateUrl: './covid-widget.component.html',
  styleUrls: ['./covid-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

//auto unsubscribe from all subscriptions when page destroys
@AutoUnsubscribe()
export class CovidWidgetComponent implements OnInit, OnDestroy {

  countries = countries;
  subscription$: Subscription = new Subscription();


  constructor(public covidService: CovidStatisticService) {
  }

  ngOnInit(): void {
    this.getCovidStatistic();
  }


  //get all data by grouping observables in one
  getCovidStatistic(country?: string) {
    this.covidService.requestEnded.next(false);
    this.subscription$ = forkJoin(
      {
        cases: this.covidService.getAllCases(country ? country : 'Azerbaijan').pipe(catchError(err => of(err))),
        history: this.covidService.getHistory(country ? country : 'Azerbaijan').pipe(catchError(err => of(err))),
        vaccines: this.covidService.getVaccines(country ? country : 'Azerbaijan').pipe(catchError(err => of(err))),
      }
    ).pipe(
      finalize(() => {
        this.covidService.requestEnded.next(true)
      }),
      catchError(err => {
        return throwError(err)
      }),
    ).subscribe(res => {
      this.covidService.newCases = 0;
      this.covidService.casesList = res.cases;
      this.covidService.vaccinesList = res.vaccines;
      this.covidService.calculateNewCases(<number>Object.values(res.history.All.dates)[0], <number>Object.values(res.history.All.dates)[1]);
      this.covidService.getPercentageOfVaccinatedPeople(res.vaccines.people_vaccinated, res.vaccines.population);
    })
  }


  //handle country changes and update data
  countryChanged(event: any): void {
    this.getCovidStatistic(event.target.value);
  }

  ngOnDestroy(): void {
  }

}
