import styles from "./Button.module.scss";

type ButtonBasePropsType = {
  type: "button" | "submit";
  children?: React.ReactNode | React.ReactNode[];
  label?: string;
  ariaLabel: string;
  onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
  className?: string;
  style?: React.CSSProperties;
};

type ButtonWithChildrenPropsType = {
  children: React.ReactNode | React.ReactNode[];
  label?: never;
} & ButtonBasePropsType;

type ButtonWithLabelPropsType = {
  children?: never;
  label: string;
} & ButtonBasePropsType;

const Button: React.FC<
  ButtonWithLabelPropsType | ButtonWithChildrenPropsType
> = ({ className, style, type, children, label, ariaLabel, onClick }) => {
  const classes = `${styles.default}${className ? ` ${className}` : ""}`;
  return (
    <button
      aria-label={ariaLabel}
      className={classes}
      style={style}
      onClick={onClick}
      type={type}
    >
      {label || children}
    </button>
  );
};

export { Button };
