import styles from "./Input.module.scss";

type InputPropsType = {
  onChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
  type: "text";
  name: string;
  className?: string;
  style?: React.CSSProperties;
  label: string;
  required?: boolean;
  pattern?: string;
};

const Input: React.FC<InputPropsType> = ({
  onChange,
  type,
  name,
  className,
  style,
  label,
  required,
  pattern,
}) => {
  const classes = `${styles.default}${className ? ` ${className}` : ""}`;
  return (
    <div className={classes} style={style}>
      <label>
        {label}
        <input
          pattern={pattern}
          required={required}
          className={styles.input}
          onChange={onChange}
          type={type}
          name={name}
        />
      </label>
    </div>
  );
};

export { Input };
