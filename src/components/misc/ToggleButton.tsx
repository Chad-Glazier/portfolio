import leaveArrow from "../../assets/skyrim_ui/leave.png"
import returnArrow from "../../assets/skyrim_ui/return.png"
import ShiftingElements from "./ShiftingElements"
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
        <ShiftingElements 
            items={[
                <>
                    <img className={styles.arrow} src={leaveArrow} />
                    <p className={styles.text}>Leave</p>
                </>,
                <>
                    <img className={styles.arrow} src={returnArrow} />
                    <p className={styles.text}>Return</p>
                </>
            ]} 
            activeIndex={toggle ? 0 : 1}        
        />
    </button>
}

export default ToggleButton
