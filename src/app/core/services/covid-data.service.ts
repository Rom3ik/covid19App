import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  newCases: number | string = 'Loading';
  vaccinatedPeopleInPercent: number = 0;

  constructor() {
  }
}
