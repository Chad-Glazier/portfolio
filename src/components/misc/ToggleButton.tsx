import leaveArrow from "../../assets/skyrim_ui/leave.png"
import returnArrow from "../../assets/skyrim_ui/return.png"
import styles from "./ToggleButton.module.css"

type ToggleButtonProps = {
    onClick: () => void
    toggle: boolean
}

function ToggleButton({ toggle, onClick }: ToggleButtonProps) {
    return <button
        className={styles.button}
        onClick={onClick}
    >
        <img className={styles.arrow} src={toggle ? leaveArrow : returnArrow} />
        <p className={styles.text}>{toggle ? "Leave" : "Return"}</p>
    </button>
}

export default ToggleButton
