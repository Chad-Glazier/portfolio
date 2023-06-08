import styles from "@/styles/components/Hamburger.module.css";
import theme from "@/styles/theme";
import { useEffect, useState } from "react";

export default function Hamburger({
  open,
  pageName,
  className
}: {
  open?: boolean;
  pageName: string;
  className?: string
}) {
  const [lastValidPage, setLastValidPage] = useState("Home");

  useEffect(() => {
    if (theme.get(pageName) !== undefined) {
      setLastValidPage(pageName);
    }
  }, [pageName])

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
          className={styles.bar + " " + theme.get(lastValidPage)!.hamburger}
        ></div>
      ))}
    </div>
  );
}