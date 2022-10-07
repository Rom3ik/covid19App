interface Default {
  All: {
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
    updated: string,
    country: string,
  }
}

export type Statistic = Default & {
  All: {
    confirmed: number,
    recovered: number,
    deaths: number,
  },
}

export type History = Default & {
  All: {
    dates: {}
  }
}

export type Vaccines = Default & {
  All: {
    administered: number,
    people_vaccinated: number,
    people_partially_vaccinated: number,
  }
}
