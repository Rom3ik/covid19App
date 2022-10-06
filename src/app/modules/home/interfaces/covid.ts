export interface Statistic {
  All: {
    confirmed: number,
    recovered: number,
    deaths: number,
    country: string,
    population: number,
    sq_km_area: number,
    life_expectancy: string,
    elevation_in_meters: number,
    continent: string,
    abbreviation: string,
    location: string,
    iso: number,
    capital_city: string,
    lat: string,
    long: string,
    updated: string
  },
}

export interface History {
  All: {
    country: string,
    population: number,
    sq_km_area: number,
    life_expectancy: string,
    elevation_in_meters: number,
    continent: string,
    abbreviation: string,
    location: string,
    iso: number,
    capital_city: string,
    dates: {}
  }
}

export interface Vaccines {
  All: {
    administered: number,
    people_vaccinated: number,
    people_partially_vaccinated: number,
    country: string,
    population: number,
    sq_km_area: number,
    life_expectancy: string,
    elevation_in_meters: number,
    continent: string,
    abbreviation: string,
    location: string,
    iso: number,
    capital_city: string,
    lat: string,
    long: string,
    updated: string
  }
}
