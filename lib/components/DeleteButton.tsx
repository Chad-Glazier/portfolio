import styles from "@/styles/components/DeleteButton.module.css";
import React, { MouseEventHandler } from "react";

export default function DeleteButton({
  onClick,
  className
}: {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}) {
  return (
    <div 
      onClick={onClick}
      className={styles.buttonContainer + (className ? ` ${className}` : "")}
    >
      <div 
        className={styles.button}
      ></div>    
    </div>
  );
}
