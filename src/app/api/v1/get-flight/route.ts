import {
  AirportDetailsType,
  BasicFlightDetailsType,
  CityDetailsType,
  FullFlightDetailsType,
} from "@/types/flightDetails";
import { NextResponse } from "next/server";

type GenericApiResponseType<T> = {
  errors: unknown[];
  request: unknown;
  response?: T;
};

const getFlightDay = (date: string) =>
  new Intl.DateTimeFormat(undefined, { weekday: "short" })
    .format(new Date(date))
    .toLowerCase();

export async function POST(request: Request) {
  const data = await request.json();
  const apiKey = data.apiKey || process.env.FLIGHT_API_KEY;
  // flight details
  const flightRequest = fetch(
    `${process.env.FLIGHT_API_BASE_URI}/routes?api_key=${apiKey}&flight_iata=${data.flightNumber}&dep_iata=${data.fromAirport}&arr_iata=${data.toAirport}`
  );

  // departure airport details
  const fromAirportRequest = fetch(
    `${process.env.FLIGHT_API_BASE_URI}/airports?api_key=${apiKey}&iata_code=${data.fromAirport}`
  );

  // destination airport details
  const toAirportRequest = fetch(
    `${process.env.FLIGHT_API_BASE_URI}/airports?api_key=${apiKey}&iata_code=${data.toAirport}`
  );

  // departure city details
  const fromCityRequest = fetch(
    `${process.env.FLIGHT_API_BASE_URI}/cities?api_key=${apiKey}&city_code=${data.fromAirport}`
  );

  // arrival city details
  const toCityRequest = fetch(
    `${process.env.FLIGHT_API_BASE_URI}/cities?api_key=${apiKey}&city_code=${data.toAirport}`
  );

  const requests = await Promise.all([
    flightRequest,
    fromAirportRequest,
    toAirportRequest,
    fromCityRequest,
    toCityRequest,
  ]);

  const responsePromises = requests.map((req) => req.json());

  const resolvedResponses = await Promise.all(responsePromises);

  const flightResponse: GenericApiResponseType<FullFlightDetailsType[]> =
    resolvedResponses.find(
      (response) => response?.request?.method === "routes"
    );

  const fromAirportResponse: GenericApiResponseType<AirportDetailsType[]> =
    resolvedResponses.find(
      (response) =>
        response?.request?.method === "airports" &&
        response.request.params.iata_code === data.fromAirport
    );

  const toAirportResponse: GenericApiResponseType<AirportDetailsType[]> =
    resolvedResponses.find(
      (response) =>
        response?.request?.method === "airports" &&
        response.request.params.iata_code === data.toAirport
    );

  const fromCityResponse: GenericApiResponseType<CityDetailsType[]> =
    resolvedResponses.find(
      (response) =>
        response?.request?.method === "cities" &&
        response.request.params.city_code === data.fromAirport
    );

  const toCityResponse: GenericApiResponseType<CityDetailsType[]> =
    resolvedResponses.find(
      (response) =>
        response?.request?.method === "cities" &&
        response.request.params.city_code === data.toAirport
    );

  const basicFlightObject:
    | FullFlightDetailsType
    | BasicFlightDetailsType
    | undefined = {
    dep_iata: data.fromAirport,
    arr_iata: data.fromAirport,
    departure: data.departure,
    flight_iata: data.flightNumber,
    isBasic: true,
  };

  // Nothing for flight then something is wrong
  if (!flightResponse?.response) {
    return NextResponse.json(
      {
        errors: [],
        data: {
          flight: {
            ...basicFlightObject,
          },
        },
      },
      { status: 200 }
    );
  }

  // Get the flight which correlates to the date the user entered by filtering
  // from the take-off days and matching to the day of the flight the user asked for
  const flightObject = flightResponse.response.find(
    (item: FullFlightDetailsType) =>
      item.days?.includes(getFlightDay(data.departure))
  );

  // No flight object, something is wrong
  if (!flightObject) {
    return NextResponse.json(
      {
        errors: [],
        data: {
          flight: {
            ...basicFlightObject,
          },
        },
      },
      { status: 200 }
    );
  } else {
    flightObject.isBasic = false;
  }

  // Departure airport
  const fromAirportObject: AirportDetailsType | undefined =
    fromAirportResponse?.response?.[0];

  // Destination airport
  const toAirportObject: AirportDetailsType | undefined =
    toAirportResponse?.response?.[0];

  // Departure airport
  const fromCityObject: CityDetailsType | undefined =
    fromCityResponse?.response?.[0];

  // Destination airport
  const toCityObject: CityDetailsType | undefined =
    toCityResponse?.response?.[0];

  // Get a dirty date time string using the user's desired date due to free API limitations
  const flightDateTime = !flightObject.isBasic
    ? `${data.departure}T${flightObject.dep_time}`
    : null;

  // set date time scheduled
  flightObject.departure = flightDateTime ? flightDateTime : data.departure;

  // return response
  return NextResponse.json(
    {
      errors: [],
      data: {
        flight: {
          ...flightObject,
        },
        from: {
          ...fromAirportObject,
          ...fromCityObject,
        },
        to: { ...toAirportObject, ...toCityObject },
      },
    },
    { status: 200 }
  );
}

export async function GET() {
  /*await fetch(
    `${process.env.NEXT_PUBLIC_FLIGHT_API_BASE_URI}/flights?access_key=${process.env.NEXT_PUBLIC_FLIGHT_API_KEY}&flight_date=${departure}&flight_number=${flightNumber}`
  );*/

  return NextResponse.json({ errors: [], data: "yo" }, { status: 200 });
}
