import { useRef, useState } from "react"
import VerticalBarThick from "../skyrim_ui/svg/VerticalBarWithArrowThick"
import styles from "./Introduction.module.css"

function Introduction() {

    const [progress, setProgress] = useState(0)
    const timerRef = useRef<number | null>(null)

    // useEffect(() => {
    // 	if (timerRef.current != null) return

    // 	timerRef.current = setInterval(() => {
    // 		setProgress(prev => {
    // 			if (prev >= 100) return -10
    // 			return prev + 0.5
    // 		})
    // 	}, 1000 / 60)
    // }, [])

    return <main className={styles.container}>
        <div className={styles.innerContainer}>
            <p>My name is Chad and I write programs.</p>
        </div>

        {/* <VerticalBar height={400} arrowYPercent={progress}/> */}
        <VerticalBarThick height={500} arrowYPercent={20} />
    </main>
}

export default Introduction
