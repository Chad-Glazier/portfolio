import type { JSX } from "react"
import styles from "./Beads.module.css"

type BeadsProps = {
    length: number
    activeIdx: number
    onSelect: (idx: number) => void
}

function repeat(n: number, fn: (idx: number) => JSX.Element) {
    let arr = []
    for (let i = 0; i < n; i++) {
        arr.push(fn(i))
    }
    return arr
}

function Beads({ length, activeIdx, onSelect }: BeadsProps) {
    return <div className={styles.container}>
        {repeat(length, (idx) => 
            <div 
                className={styles.beadOuter}
                onClick={() => onSelect(idx)}    
            >
                <div className={
                    styles.beadInner + " " + 
                        (activeIdx == idx ? styles.active : "")
                }></div>
            </div>
        )}
    </div>
}

export default Beads
