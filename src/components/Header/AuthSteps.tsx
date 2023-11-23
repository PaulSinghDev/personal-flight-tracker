import styles from "@/components/Header/Header.module.scss";
import Link from "next/link";

const AuthSteps: React.FC = () => {
  return (
    <div>
      <p>
        This app is not connected to a database and <strong>will not</strong>{" "}
        store your API key. You can verify this for yourself on{" "}
        <Link
          href="https://github.com/PaulSinghDev/personal-flight-tracker"
          title="Go to Git repo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </Link>
      </p>
      <p>
        As Air Labs limits the number of free requests an account can make I can
        {"'"}t afford to use my key for everyone. As such, you can use this app
        with your own free Air Labs key.
      </p>
      <ol className={styles.steps}>
        <li>
          Go here:{" "}
          <Link
            href="https://airlabs.co/signup"
            title="Air Labs sign-up page"
            target="_blank"
            rel="noreferrer noopener"
          >
            https://airlabs.co/signup
          </Link>{" "}
          and sign-up
        </li>
        <li>Copy the API key displayed in the accounts page</li>
        <li>
          Paste it in the field below (You will need to do this every time you
          want to make a request as this app is not connected to a database, it
          remembers your flights by leveraging your browser
          {"'"}s local storage)
        </li>
      </ol>
    </div>
  );
};

export { AuthSteps };
