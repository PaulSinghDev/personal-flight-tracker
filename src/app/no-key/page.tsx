"use client";

import { useEffect, useState } from "react";
import styles from "@/app/page.module.scss";
import {
  BasicFlightDetailsType,
  CompleteDetailsType,
  FullFlightDetailsType,
} from "@/types/flightDetails";
import { sortFlights } from "@/services/flights/sortFlights";
import { FlightList } from "@/components/FlightList";
import { FlightDetailsForm } from "@/components/FlightDetailsForm/FlightDetailsForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const Home = () => {
  const [flights, setFlights] = useState<
    CompleteDetailsType<FullFlightDetailsType | BasicFlightDetailsType>[]
  >([]);

  useEffect(() => {
    const storage = window.localStorage.getItem("flights");
    const asJSON: CompleteDetailsType[] = storage ? JSON.parse(storage) : [];
    setFlights(sortFlights(asJSON));
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <FlightDetailsForm flights={flights} setFlights={setFlights} />
        <FlightList flights={flights} setFlights={setFlights} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
