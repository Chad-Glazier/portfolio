import type { JSX } from "react"
import styles from "./ShiftingElements.module.css"

type ShiftingElementsProps = {
    items: JSX.Element[]
    activeIndex: number
}

// Maps each index to a className (left, right, or nothing) based on its
// position relative to the active index. E.g., 0 is "left" if the active
// index is greater than 0.
function positionalClassName(idx: number, activeIdx: number) {
    if (idx < activeIdx) {
        return styles.item + " " + styles.left
    }
    if (idx > activeIdx) {
        return styles.item + " " + styles.right
    }
    return styles.item
}

function ShiftingElements({ items, activeIndex }: ShiftingElementsProps) {

    return <div className={styles.container}>
        {items.map((item, idx) =>
            <div 
                key={idx}
                className={positionalClassName(idx, activeIndex)}
            >
                {item}
            </div>
        )}
    </div>
}

export default ShiftingElements
