import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {History, Statistic, Vaccines} from "../interfaces/covid";

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

  casesList!: Statistic;
  historyList!: History;
  newCases!: number;
  vaccinesList!: Vaccines;
  dataLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private httpClient: HttpClient) {
  }


  getAllCases(country: string): Observable<Statistic> {
    return this.httpClient.get<Statistic>(API_URL + prefixes.cases + `?country=${country}`);
  }

  getHistory(country: string): Observable<History> {
    return this.httpClient.get<History>((API_URL + prefixes.history + `?status=confirmed&country=${country}`))
  }

  getVaccines(country: string): Observable<Vaccines> {
    return this.httpClient.get<Vaccines>(API_URL + prefixes.vaccines + `?country=${country}&ab=AZ`)
  }

  calculateNewCases(last: number, yesterday: number) {
    this.newCases = last - yesterday;
  }

}
