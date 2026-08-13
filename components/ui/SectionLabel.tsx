import styles from "./SectionLabel.module.css";

type SectionLabelProps = {
  number: string;
  title: string;
};

export default function SectionLabel({ number, title }: SectionLabelProps) {
  return (
    <div className={styles.label}>
      <span className={`text-label ${styles.text}`}>
        — {number} / {title}
      </span>
    </div>
  );
}
