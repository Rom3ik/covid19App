import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {History, Statistic, Vaccines} from "../interfaces/covid";
import {CovidDataService} from "./covid-data.service";

const API_URL = 'https://covid-api.mmediagroup.fr/v1';
const prefixes = {
  cases: '/cases',
  history: '/history',
  vaccines: '/vaccines'
}

@Injectable({
  providedIn: 'root'
})
export class CovidStatisticService {



  constructor(
    private httpClient: HttpClient,
    private covidStorage: CovidDataService
  ) {
  }

  getAllCases(country: string): Observable<Statistic> {
    return this.httpClient.get<Statistic>(API_URL + prefixes.cases + `?country=${country}`);
  }

  getHistory(country: string): Observable<History> {
    return this.httpClient.get<History>((API_URL + prefixes.history + `?status=confirmed&country=${country}`))
  }

  getVaccines(country: string): Observable<Vaccines> {
    return this.httpClient.get<Vaccines>(API_URL + prefixes.vaccines + `?country=${country}`)
  }

  calculateNewCases(today: number, yesterday: number): void {
    if (!today && !yesterday) {
      return;
    }
    this.covidStorage.newCases = today - yesterday;
  }

  getPercentageOfVaccinatedPeople(vaccinatedPeople: number, totalPopulation: number): void {
    if (!vaccinatedPeople && !totalPopulation) {
      return
    }
    this.covidStorage.vaccinatedPeopleInPercent = +(vaccinatedPeople * 100 / totalPopulation).toFixed(2);
  }

}
