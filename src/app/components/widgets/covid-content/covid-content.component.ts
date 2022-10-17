import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CovidStatisticService} from "../../../core/services/covid-statistic.service";
import {forkJoin, of, Subject} from "rxjs";
import {catchError, finalize, map, takeUntil} from "rxjs/operators";
import {countries} from "../../../countries";
import {History, Statistic, Vaccines} from "../../../core/interfaces/covid";
import {CovidDataService} from "../../../core/services/covid-data.service";

@Component({
  selector: 'app-covid-content',
  templateUrl: './covid-content.component.html',
  styleUrls: ['./covid-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CovidContentComponent implements OnInit, OnDestroy {

  private stop$: Subject<void> = new Subject();
  countries = countries;

  constructor(
    private covidService: CovidStatisticService,
    public covidStorage: CovidDataService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getCovidStatistic('Azerbaijan');
  }

  trackByName(index: number, item: any): string {
    return item.country;
  }

  getCovidStatistic(country: string): void {
    this.covidService.handleRequestProgress(false);
    forkJoin([
        this.covidService.getAllCases(country).pipe(catchError((err: Statistic) => of(err))),
        this.covidService.getHistory(country).pipe(catchError((err: History) => of(err))),
        this.covidService.getVaccines(country).pipe(catchError((err: Vaccines) => of(err))),
      ]
    )
      .pipe(
        map(([cases, history, vaccines]) => {
          this.cdr.markForCheck();
          this.covidStorage.casesList = cases;
          const todayConfirmed = <number>Object.values(history?.All?.dates)[0];
          const yesterdayConfirmed = <number>Object.values(history.All?.dates)[1];
          this.covidService.calculateNewCases(todayConfirmed, yesterdayConfirmed);
          this.covidService.getPercentageOfVaccinatedPeople(vaccines?.All?.people_vaccinated, vaccines?.All?.population);
        }),
        finalize(() => {
          this.covidService.handleRequestProgress(true);
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
