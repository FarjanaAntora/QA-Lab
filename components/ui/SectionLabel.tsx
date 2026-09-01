import styles from "./SectionLabel.module.css";

type SectionLabelProps = {
  number: string;
  title: string;
  className?: string;
};

export default function SectionLabel({
  number,
  title,
  className,
}: SectionLabelProps) {
  return (
    <div className={`${styles.label} ${className ?? ""}`}>
      <span className={`text-label ${styles.text}`}>
        {number} / {title}
      </span>
    </div>
  );
}
