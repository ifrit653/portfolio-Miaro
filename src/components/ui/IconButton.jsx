// src/components/ui/IconButton.jsx
import styles from "./IconButton.module.css";

export default function IconButton({
  label,
  className = "",
  children,
  ...props
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`${styles.iconButton} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
