import styles from "@/components/FlightList/FlightList.module.scss";
import {
  BasicFlightDetailsType,
  CompleteDetailsType,
  FullFlightDetailsType,
} from "@/types/flightDetails";
import { FullFlightCard } from "../FlightCard/FullFlightCard";
import { BasicFlightCard } from "../FlightCard/BasicFlightCard";

type FlightListPropsType = {
  flights: CompleteDetailsType<
    BasicFlightDetailsType | FullFlightDetailsType
  >[];
  setFlights: React.Dispatch<
    React.SetStateAction<
      CompleteDetailsType<BasicFlightDetailsType | FullFlightDetailsType>[]
    >
  >;
};

const FlightList: React.FC<FlightListPropsType> = ({ flights, setFlights }) => {
  return (
    <div className={styles["flight-list-wrapper"]}>
      <div className={styles["flight-list-inner"]}>
        <ul className={styles["flight-list"]}>
          {flights?.map((details, i) =>
            !details.flight.isBasic ? (
              <FullFlightCard
                key={i}
                details={details as CompleteDetailsType<FullFlightDetailsType>}
                flightState={[flights, setFlights]}
              />
            ) : (
              <BasicFlightCard
                key={i}
                details={details as CompleteDetailsType<BasicFlightDetailsType>}
                flightState={[flights, setFlights]}
              />
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export { FlightList };
