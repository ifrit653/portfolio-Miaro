import styles from "./Tag.module.css";

export default function Tag({
  as: Component = "span",
  active = false,
  className = "",
  children,
  ...props
}) {
  return (
    <Component
      className={`${styles.tag} ${active ? styles.active : ""} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
