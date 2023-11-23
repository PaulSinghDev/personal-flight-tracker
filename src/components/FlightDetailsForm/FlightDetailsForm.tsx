import styles from "@/components/FlightDetailsForm/FlightDetailsForm.module.scss";
import { Input } from "@/components//Input";
import { Button } from "@/components//Button";
import { useState } from "react";
import {
  AirportDetailsType,
  BasicFlightDetailsType,
  CityDetailsType,
  CompleteDetailsType,
  FullFlightDetailsType,
} from "@/types/flightDetails";
import { sortFlights } from "@/services/flights/sortFlights";

type FlightDetailsFormPropsType = {
  flights: CompleteDetailsType<
    BasicFlightDetailsType | FullFlightDetailsType
  >[];
  setFlights: React.Dispatch<
    React.SetStateAction<
      CompleteDetailsType<BasicFlightDetailsType | FullFlightDetailsType>[]
    >
  >;
  isAuthed?: boolean;
};

const FlightDetailsForm: React.FC<FlightDetailsFormPropsType> = ({
  flights,
  setFlights,
  isAuthed,
}) => {
  const [departure, setDeparture] = useState("");
  const [fromAirport, setAirport] = useState("");
  const [toAirport, setToAirport] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [flightNumber, setFlightNumber] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const inStorage = flights.find(
      (details) => details.flight.flight_iata === flightNumber
    );

    if (!inStorage) {
      const req = await fetch("/api/v1/get-flight", {
        method: "POST",
        body: JSON.stringify({
          departure,
          flightNumber,
          fromAirport,
          toAirport,
          apiKey,
        }),
      });
      const res: {
        data: {
          flight: FullFlightDetailsType;
          from: AirportDetailsType & CityDetailsType;
          to: AirportDetailsType & CityDetailsType;
        };
      } = await req.json();
      if (res.data) {
        const newFlightData = sortFlights([...flights, { ...res.data }]);
        setFlights(newFlightData);
        window.localStorage.setItem("flights", JSON.stringify(newFlightData));
      }
    }
  };

  return (
    <div className={styles["input-wrapper"]}>
      <h2>Enter flight details:</h2>
      <form className={styles["inputs"]} onSubmit={handleSubmit}>
        {!isAuthed ? (
          <Input
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setApiKey(e.target.value);
            }}
            type="text"
            name="api_key"
            label="Air Labs API Key"
          />
        ) : null}
        <Input
          required
          onChange={(e) => {
            setFlightNumber(e.target.value.replace(/\s/g, "").toUpperCase());
          }}
          type="text"
          name="flight_number"
          label="Flight Number"
        />
        <Input
          label="From"
          onChange={(e) => {
            setAirport(e.target.value.replace(/\s/g, "").toUpperCase());
          }}
          type="text"
          name="from"
          required
        />
        <Input
          label="To"
          onChange={(e) => {
            setToAirport(e.target.value.replace(/\s/g, "").toUpperCase());
          }}
          type="text"
          name="to"
          required
        />
        <Input
          label="Take-off (YYYY-MM-DD):"
          pattern="^\d{4}-\d{2}-\d{2}$"
          onChange={(e) => {
            setDeparture(e.target.value);
          }}
          type="text"
          name="take_off"
          required
        />
        <Button type="submit" ariaLabel="Submit form" label="Submit" />
      </form>
    </div>
  );
};

export { FlightDetailsForm };
