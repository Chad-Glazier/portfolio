import styles from "@/styles/components/Hamburger.module.css";
import theme from "@/styles/theme";

export default function Hamburger({
  open,
  pageName,
  className
}: {
  open?: boolean;
  pageName: string;
  className?: string
}) {
  return (
    <div 
      className={
        styles.hamburger
        + (className ? ` ${className}` : "")
        + (open ? ` ${styles.open}` : ` ${styles.closed}`)
      }
    >
      {Array(3).fill(0).map((_, i) => (
        <div
          key={i}
          className={styles.bar + " " + (theme.get(pageName) ?? theme.get("Home"))!.hamburger}
        ></div>
      ))}
    </div>
  );
}