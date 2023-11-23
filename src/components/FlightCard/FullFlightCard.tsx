import styles from "@/components/FlightCard/FullFlightCard.module.scss";
import { CompleteDetailsType, FlightStateType } from "@/types/flightDetails";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { MdTimer } from "react-icons/md";
import { Button } from "@/components/Button";

const FullFlightCard: React.FC<{
  details: CompleteDetailsType;
  flightState: FlightStateType;
}> = ({ details, flightState }) => {
  const handleRemove: React.EventHandler<
    React.MouseEvent<HTMLButtonElement>
  > = (e) => {
    const newList = flightState[0].filter(
      (flight) => flight.flight.flight_iata !== details.flight.flight_iata
    );
    flightState[1](newList);
    window.localStorage.setItem("flights", JSON.stringify(newList));
  };

  return (
    <li className={styles.default}>
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
      <Button
        ariaLabel="Remove this entry"
        label="Remove"
        onClick={handleRemove}
        className={styles.remove}
        type="button"
      />
    </li>
  );
};
export { FullFlightCard };
