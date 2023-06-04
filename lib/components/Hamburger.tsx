import styles from "@/styles/components/Hamburger.module.css";

export default function Hamburger({
  open,
  className
}: {
  open?: boolean;
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
          className={styles.bar}
        ></div>
      ))}
    </div>
  );
}