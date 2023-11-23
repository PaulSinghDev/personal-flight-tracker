import styles from "@/components/FlightCard/FlightCard.module.scss";
import {
  BasicFlightDetailsType,
  CompleteDetailsType,
  FlightStateType,
  FullFlightDetailsType,
} from "@/types/flightDetails";

type FlightCardPropsType = {
  className?: string;
  style?: React.CSSProperties;
  details: CompleteDetailsType<BasicFlightDetailsType | FullFlightDetailsType>;
  flightState: FlightStateType;
};

const FlightCard: React.FC<FlightCardPropsType> = ({ className, style }) => {
  const classes = `${styles.default}${className ? ` ${className}` : ""}`;
  return <li className={classes} style={style}></li>;
};

export { FlightCard };
