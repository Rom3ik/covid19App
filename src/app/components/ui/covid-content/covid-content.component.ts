import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CovidStatisticService} from "../../../core/services/covid-statistic.service";
import {combineLatest, of, Subject} from "rxjs";
import {catchError, finalize, map, takeUntil} from "rxjs/operators";
import {countries} from "../../../countries";

@Component({
  selector: 'app-covid-content',
  templateUrl: './covid-content.component.html',
  styleUrls: ['./covid-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CovidContentComponent implements OnInit, OnDestroy {


  private stop$: Subject<void> = new Subject();
  countries = countries;

  constructor(public covidService: CovidStatisticService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getCovidStatistic('Azerbaijan');
  }

  trackByName(index: number, item: any) {
    return item.country;
  }

  getCovidStatistic(country: string): void {
    this.covidService.requestEnded.next(false);
    combineLatest([
        this.covidService.getAllCases(country ? country : 'Azerbaijan')
          .pipe(catchError(err => of(err))),
        this.covidService.getHistory(country ? country : 'Azerbaijan')
          .pipe(catchError(err => of(err))),
        this.covidService.getVaccines(country ? country : 'Azerbaijan')
          .pipe(catchError(err => of(err))),
      ]
    )
      .pipe(
        map(([cases, history, vaccines]) => {
          this.cdr.markForCheck();
          this.covidService.casesList = cases;
          this.covidService.calculateNewCases(<number>Object.values(history?.All?.dates)[0], <number>Object.values(history.All?.dates)[1]);
          this.covidService.getPercentageOfVaccinatedPeople(vaccines?.All?.people_vaccinated, vaccines?.All?.population);
        }),
        finalize(() => {
          this.covidService.requestEnded.next(true)
        }),
        takeUntil(this.stop$),
        catchError(err => err))
      .subscribe()
  }

  countryChanged(event: any): void {
    this.getCovidStatistic(event.target.value);
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }

}
