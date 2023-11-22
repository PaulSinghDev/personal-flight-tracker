"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { MdTimer } from "react-icons/md";
import Link from "next/link";

export type FlightDetailsType = {
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

export type BasicFlightDetails = Pick<
  FlightDetailsType,
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

export type CompleteDetailsType<T = FlightDetailsType> = {
  flight: T;
  from: AirportDetailsType & CityDetailsType;
  to: AirportDetailsType & CityDetailsType;
};

type RemoveButtonProps = {
  clickHandler: React.MouseEventHandler<HTMLButtonElement>;
};

const RemoveButton: React.FC<RemoveButtonProps> = ({ clickHandler }) => {
  return (
    <button className={styles.remove} onClick={clickHandler}>
      Remove
    </button>
  );
};

const FullFlightCard: React.FC<{
  details: CompleteDetailsType;
  flightState: [
    CompleteDetailsType<BasicFlightDetails | FlightDetailsType>[],
    React.Dispatch<
      React.SetStateAction<
        CompleteDetailsType<FlightDetailsType | BasicFlightDetails>[]
      >
    >
  ];
}> = ({ details, flightState }) => {
  const handleRemove = () => {
    const newList = flightState[0].filter(
      (flight) => flight.flight.flight_iata !== details.flight.flight_iata
    );
    flightState[1](newList);
    window.localStorage.setItem("flights", JSON.stringify(newList));
  };

  return (
    <li className={styles.flight}>
      <div className={`${styles["flight-detail"]} ${styles["flight-number"]}`}>
        <span>{details.flight.flight_iata}</span>
        <span>
          {new Date(
            details.flight.departure ||
              details.flight.departure.replace(" ", "T")
          ).toLocaleString("en-GB", {
            weekday: "short",
            month: "short",
            year: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "numeric",
            formatMatcher: "best fit",
          })}
        </span>
      </div>
      <div className={styles["route"]}>
        <div className={styles["flight-detail"]}>
          <span className={styles.icon}>
            <FaPlaneDeparture size={20} />
          </span>
          <span className={styles.detail}>
            <span className={styles.code}>{details.from.iata_code}</span>
            <span className={styles.full}>
              {details.from.name}
              {details.flight.dep_terminals?.length
                ? ` (${
                    details.flight.dep_terminals[0].includes("T")
                      ? `${details.flight.dep_terminals[0]}`
                      : `T${details.flight.dep_terminals[0]}`
                  })`
                : null}
            </span>
          </span>
        </div>
        <div className={styles["flight-detail"]}>
          <span className={styles.icon}>
            <FaPlaneArrival size={20} />
          </span>
          <span className={styles.detail}>
            <span className={styles.code}>{details.to.iata_code}</span>
            <span className={styles.full}>
              {details.to.name}
              {details.flight.arr_terminals?.length
                ? ` (${
                    details.flight.arr_terminals[0].includes("T")
                      ? `${details.flight.arr_terminals[0]}`
                      : `T${details.flight.arr_terminals[0]}`
                  })`
                : null}
            </span>
          </span>
        </div>
        <div className={styles["flight-detail"]}>
          <span className={styles.icon}>
            <MdTimer size={20} />
          </span>
          <span className={styles.detail}>
            <span className={styles.code}>
              {(details.flight.duration / 60).toFixed(2)} hours
            </span>
          </span>
        </div>
      </div>
      <RemoveButton clickHandler={handleRemove} />
    </li>
  );
};

const BasicFlightCard: React.FC<{
  details: CompleteDetailsType<BasicFlightDetails>;
  flightState: [
    CompleteDetailsType<BasicFlightDetails | FlightDetailsType>[],
    React.Dispatch<
      React.SetStateAction<
        CompleteDetailsType<FlightDetailsType | BasicFlightDetails>[]
      >
    >
  ];
}> = ({ details, flightState }) => {
  const handleRemove = () => {
    const newList = flightState[0].filter(
      (flight) => flight.flight.flight_iata !== details.flight.flight_iata
    );
    flightState[1](newList);
    window.localStorage.setItem("flights", JSON.stringify(newList));
  };

  return (
    <li className={`${styles.flight} ${styles.partial}`}>
      <div className={styles.notice}>
        <span className={styles.icon}>Showing partial details for flight</span>
      </div>
      <div className={styles["partial-details"]}>
        <div
          className={`${styles["flight-detail"]} ${styles["flight-number"]}`}
        >
          <span>{details.flight.flight_iata}</span>
          <span>
            {new Date(
              details.flight.departure ||
                details.flight.departure.replace(" ", "T")
            ).toLocaleString("en-GB", {
              weekday: "short",
              month: "short",
              year: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "numeric",
              formatMatcher: "best fit",
            })}
          </span>
        </div>
        <div className={styles["route"]}>
          <div className={styles["flight-detail"]}>
            <span className={styles.icon}>
              <FaPlaneDeparture size={20} />
            </span>
            <span className={styles.detail}>
              <span className={styles.code}>{details.from.iata_code}</span>
            </span>
          </div>
          <div className={styles["flight-detail"]}>
            <span className={styles.icon}>
              <FaPlaneArrival size={20} />
            </span>
            <span className={styles.detail}>
              <span className={styles.code}>{details.to.iata_code}</span>
            </span>
          </div>
        </div>
        <RemoveButton clickHandler={handleRemove} />
      </div>
    </li>
  );
};

const sortFlights = (
  flights: CompleteDetailsType<FlightDetailsType | BasicFlightDetails>[]
) =>
  flights.sort(
    (a, b) =>
      new Date(a.flight.departure).getTime() -
      new Date(b.flight.departure).getTime()
  );

const Home = () => {
  const [departure, setDeparture] = useState("");
  const [fromAirport, setAirport] = useState("");
  const [toAirport, setToAirport] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [flights, setFlights] = useState<
    CompleteDetailsType<FlightDetailsType | BasicFlightDetails>[]
  >([]);

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
        }),
      });
      const res: {
        data: {
          flight: FlightDetailsType;
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

  useEffect(() => {
    const storage = window.localStorage.getItem("flights");
    const asJSON: CompleteDetailsType[] = storage ? JSON.parse(storage) : [];
    setFlights(sortFlights(asJSON));
  }, []);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Personal Flight Tracker</h1>
        <div className={styles.info}>
          <p>
            A simple app to keep track of you personal flights. The motivation
            behind making this was simply that I cannot be arsed with logging
            into multiple different websites to keep track of flights from
            different vendors.
          </p>
          <p>
            App made using{" "}
            <Link
              href="https://airlabs.co"
              rel="noopeneer noreferrer"
              target="_blank"
              title="Visit Airlabs in a new tab"
            >
              Air Labs
            </Link>
          </p>
          <p>
            <small>
              The data shown here may not be accurate due to limitations of the
              free API provided by Air Labs. Most notable is the fact that the
              API will not show specific flights for specific dates. As such
              this app is piecing together multiple different end points to make
              a best guess.
            </small>
          </p>
        </div>
      </header>
      <div className={styles["input-wrapper"]}>
        <h2>Enter flight details:</h2>
        <form className={styles["inputs"]} onSubmit={handleSubmit}>
          <div className={styles.input}>
            <label>
              Flight Number:
              <input
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFlightNumber(
                    e.target.value.replace(/\s/g, "").toUpperCase()
                  );
                  console.log(flightNumber);
                }}
                type="text"
                name="flight_number"
              />
            </label>
          </div>
          <div className={styles.input}>
            <label>
              From:
              <input
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAirport(e.target.value.replace(/\s/g, "").toUpperCase());
                }}
                type="text"
                name="from"
              />
            </label>
          </div>
          <div className={styles.input}>
            <label>
              To:
              <input
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setToAirport(e.target.value.replace(/\s/g, "").toUpperCase());
                }}
                type="text"
                name="to"
              />
            </label>
          </div>
          <div className={styles.input}>
            <label>
              Take-off (YYYY-MM-DD):
              <input
                required
                pattern="^\d{4}-\d{2}-\d{2}$"
                type="text"
                name="flight_dept"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setDeparture(e.target.value);
                  console.log(departure);
                }}
              />
            </label>
          </div>
          <button className={styles.submit}>Submit</button>
        </form>
      </div>
      <div className={styles["flight-list-wrapper"]}>
        <div className={styles["flight-list-inner"]}>
          <ul className={styles["flight-list"]}>
            {flights?.map((details: any, i) =>
              !details.flight.isBasic ? (
                <FullFlightCard
                  key={i}
                  details={details as CompleteDetailsType<FlightDetailsType>}
                  flightState={[flights, setFlights]}
                />
              ) : (
                <BasicFlightCard
                  key={i}
                  details={details as CompleteDetailsType<BasicFlightDetails>}
                  flightState={[flights, setFlights]}
                />
              )
            )}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Home;
