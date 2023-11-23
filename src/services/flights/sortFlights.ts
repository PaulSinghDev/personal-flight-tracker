import {
  BasicFlightDetailsType,
  CompleteDetailsType,
  FullFlightDetailsType,
} from "@/types/flightDetails";

export const sortFlights = (
  flights: CompleteDetailsType<FullFlightDetailsType | BasicFlightDetailsType>[]
) =>
  flights.sort(
    (a, b) =>
      new Date(a.flight.departure).getTime() -
      new Date(b.flight.departure).getTime()
  );
