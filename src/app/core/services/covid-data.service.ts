import {Injectable} from '@angular/core';
import {Statistic} from "../interfaces/covid";

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  newCases: number | string = 0;
  casesList!: Statistic;
  vaccinatedPeopleInPercent: number = 0;

  constructor() {
  }
}
