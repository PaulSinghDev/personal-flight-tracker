import styles from "@/components/Header/Header.module.scss";
import { AuthSteps } from "./AuthSteps";

type HeaderPropsType = {
  isAuthed?: boolean;
};

const Header: React.FC<HeaderPropsType> = ({ isAuthed }) => {
  return (
    <header className={styles.header}>
      <h1>Personal Flight Tracker</h1>
      <div className={styles.info}>
        <p>
          A simple app to keep track of personal flights. The motivation behind
          making this was simply that I cannot be arsed with logging into
          multiple different websites to keep track of flights from different
          vendors.
        </p>
        {!isAuthed ? <AuthSteps /> : null}
      </div>
    </header>
  );
};

export { Header };
