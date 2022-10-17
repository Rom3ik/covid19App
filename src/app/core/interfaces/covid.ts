interface Default {
  All: {
    abbreviation: string,
    capital_city: string,
    continent: string,
    country: string,
    elevation_in_meters: number,
    iso: number,
    life_expectancy: string,
    location: string,
    population: number,
    sq_km_area: number
  }
}


export type Statistic = Default & {
  All: {
    confirmed: number,
    recovered: number,
    deaths: number,
    lat: string,
    long: string,
    updated: string,
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
