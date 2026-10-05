import styles from "./Button.module.css";

export default function Button({
  as: Component = "button",
  variant = "gold", // "gold" | "red" | "outline"
  className = "",
  children,
  ...props
}) {
  return (
    <Component
      className={`${styles.button} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
