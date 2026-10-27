import styles from "./Card.module.css"
import topRightCorner from "../../assets/skyrim_ui/topRightCardCorner.png"
import topBorder from "../../assets/skyrim_ui/topBorder.png"
import rightBorder from "../../assets/skyrim_ui/rightBorder.png"
import type { PropsWithChildren } from "react"

type CardProps = PropsWithChildren<{
    thickness?: number
    className?: string
    padding?: number
}>

function Card({ children, thickness, className, padding }: CardProps) {
    thickness ??= 24

    return <div 
        className={styles.outer + " " + (className ?? "")} 
        style={{
            "--length": `${thickness}px`
        } as any}
    >
        <div className={styles.inner}>
     
            <img className={styles.topLeftCorner} src={topRightCorner} />
            <img className={styles.topRightCorner} src={topRightCorner} />
            <img className={styles.bottomLeftCorner} src={topRightCorner} />
            <img className={styles.bottomRightCorner} src={topRightCorner} />  

            <img className={styles.leftBorder} src={rightBorder} />
            <img className={styles.rightBorder} src={rightBorder} />
            <img className={styles.topBorder} src={topBorder} />
            <img className={styles.bottomBorder} src={topBorder} />

            {children}          
        </div>
    </div>
}

export default Card
