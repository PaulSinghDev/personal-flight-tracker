import styles from "@/components/FlightCard/BasicFlightCard.module.scss";
import {
  BasicFlightDetailsType,
  CompleteDetailsType,
  FlightStateType,
} from "@/types/flightDetails";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { Button } from "@/components/Button";

const BasicFlightCard: React.FC<{
  details: CompleteDetailsType<BasicFlightDetailsType>;
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
  console.log(details);

  return (
    <li className={`${styles.default} ${styles.partial}`}>
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
              <span className={styles.code}>{details.flight.dep_iata}</span>
            </span>
          </div>
          <div className={styles["flight-detail"]}>
            <span className={styles.icon}>
              <FaPlaneArrival size={20} />
            </span>
            <span className={styles.detail}>
              <span className={styles.code}>{details.flight.arr_iata}</span>
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
      </div>
    </li>
  );
};

export { BasicFlightCard };
