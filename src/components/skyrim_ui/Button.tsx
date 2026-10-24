import styles from "./Button.module.css"
import rightMark from "../../assets/skyrim_ui/rightMark.svg"

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
        <img className={styles.leftTick} src={rightMark} alt=">" />
        {text}
        <img className={styles.rightTick} src={rightMark} alt="<" />
    </button>
}

export function RightButton({ text, onClick, className }: ButtonProps) {

    //
    // Rounded button with a tick on the right side, and the tick gets filled
    // in when its hovered.
    //

}

export default Button