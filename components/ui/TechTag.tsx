import styles from "./TechTag.module.css";

type TechTagProps = {
  label: string;
  size?: "default" | "compact";
};

export default function TechTag({ label, size = "default" }: TechTagProps) {
  return (
    <span
      className={`${styles.tag} ${size === "compact" ? styles.compact : styles.default}`}
    >
      {label}
    </span>
  );
}
