import { Star } from "lucide-react";
import styles from "./Stars.module.css";

export default function Stars({ rating, size = 18 }) {
  return (
    <span className={styles.stars} role="img" aria-label={`${rating} / 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < rating ? "currentColor" : "none"}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}
