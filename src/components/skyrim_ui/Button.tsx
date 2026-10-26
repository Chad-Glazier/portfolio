import styles from "./Button.module.css"
import leftMark from "../../assets/skyrim_original_ui_elements/Menu Icons/Indicator White Left.png"
import rightArrow from "../../assets/skyrim_ui/right arrow.png"
import rightArrowFill from "../../assets/skyrim_ui/right arrow fill.png"

type ButtonProps = {
    text: string
    onClick: () => void
    className?: string
}

function Button({ text, onClick, className }: ButtonProps) {
    return <button 
        onClick={onClick}
        className={styles.button + " " + (className ?? "")}
    >
        <img className={styles.leftTick} src={leftMark} alt=">" />
        {text}
        <img className={styles.rightTick} src={leftMark} alt="<" />
    </button>
}

export function RightButton({ text, onClick, className }: ButtonProps) {
    return <button
        onClick={onClick}
        className={styles.rbutton + " " + (className ?? "")}
    >
        {text} 
        <div className={styles.rtick}>
            <img className={styles.arrow} src={rightArrow} />
            <img className={styles.arrowFill} src={rightArrowFill} />
        </div>
    </button>

}

export default Button