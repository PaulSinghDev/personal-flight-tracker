import styles from "@/components/Footer/Footer.module.scss";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className={styles.default}>
      <p>
        <small>
          The data shown here may not be accurate due to limitations of the free
          API provided by Air Labs. Most notable is the fact that the API will
          not show specific flights for specific dates. As such this app is
          piecing together multiple different end points to make a best guess.
        </small>
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
    </footer>
  );
};

export { Footer };
