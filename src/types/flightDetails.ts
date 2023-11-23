export type FullFlightDetailsType = {
  airline_iata: string;
  airline_icao: string;
  flight_number: string;
  flight_iata: string;
  flight_icao: string;
  cs_airline_iata: null | string;
  cs_flight_iata: null | string;
  cs_flight_number: null | number;
  dep_iata: string;
  dep_icao: string;
  dep_terminals: string[];
  dep_time: string;
  dep_time_utc: string;
  arr_iata: string;
  arr_icao: string;
  arr_terminals: null | string;
  arr_time: string;
  arr_time_utc: string;
  duration: number;
  aircraft_icao: null | string;
  counter: number;
  updated: string;
  days: string[];
  departure: string;
  isBasic: false;
};

export type BasicFlightDetailsType = Pick<
  FullFlightDetailsType,
  "arr_iata" | "dep_iata" | "departure" | "flight_iata"
> & { isBasic: true };

export type AirportDetailsType = {
  name: string;
  iata_code: string;
  icao_code: string;
  lat: number;
  lng: number;
  country_code: string;
};

export type CityDetailsType = {
  name: string;
  city_code: string;
  lat: number;
  lng: number;
  country_code: string;
  type: string;
};

export type CompleteDetailsType<T = FullFlightDetailsType> = {
  flight: T;
  from: AirportDetailsType & CityDetailsType;
  to: AirportDetailsType & CityDetailsType;
};

export type FlightStateType = [
  CompleteDetailsType<BasicFlightDetailsType | FullFlightDetailsType>[],
  React.Dispatch<
    React.SetStateAction<
      CompleteDetailsType<FullFlightDetailsType | BasicFlightDetailsType>[]
    >
  >
];
