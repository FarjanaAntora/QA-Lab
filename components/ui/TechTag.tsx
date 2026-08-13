import styles from "./TechTag.module.css";

type TechTagProps = {
  label: string;
};

export default function TechTag({ label }: TechTagProps) {
  return <span className={`text-mono ${styles.tag}`}>{label}</span>;
}
