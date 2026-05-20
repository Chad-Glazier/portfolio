import styles from "./ToggleButton.module.css"
import { useState } from "react"
import { RightArrow } from "./skyrim_ui"

type ToggleButtonProps = {
    onClick: () => void
    text: string
}

function ToggleButton({ text, onClick }: ToggleButtonProps) {
    
    const [showArrow, setShowArrow] = useState(false)
    
    return <button 
        className={styles.button}
        onClick={onClick}	
        onMouseEnter={() => setShowArrow(true)}
        onMouseLeave={() => setShowArrow(false)}
    >
        {text} <RightArrow hidden={!showArrow} />
    </button>
}

export default ToggleButton
