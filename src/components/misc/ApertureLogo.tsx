import { useState } from "react"
import styles from "./ApertureLogo.module.css"

type ApertureLogoProps = {
    /** The approximate height of the entire logo, in pixels */
    size: number

    /** This will be passed down to the container element */
    className?: string
}

function ApertureLogo({ size, className }: ApertureLogoProps) {

    const [opennessPercent, setOpennessPercent] = useState(0.95)

    let openness = opennessPercent * -35 + -5
    openness = Math.max(openness, -40)
    openness = Math.min(openness, -5)

    return <div 
        className={styles.inner + " " + (className ?? "")}
        style={{
            "--logo-size": `${size}px`,
            "--aperture-size": `${openness}deg`
        } as any} 
        onMouseEnter={() => setOpennessPercent(0.05)}
        onMouseLeave={() => setOpennessPercent(0.95)}
    >
        <h1>
            <div className={styles.cameraAperture}>
                <div className={styles.bladeBox}>
                    <div className={styles.blade}></div>
                    <div className={styles.blade}></div>
                    <div className={styles.blade}></div>
                    <div className={styles.blade}></div>
                    <div className={styles.blade}></div>
                    <div className={styles.blade}></div>
                    <div className={styles.blade}></div>
                    <div className={styles.blade}></div>
                </div>
            </div>
            <span className={styles.mr}>mr</span>            
        </h1>
        <p>
            <span className={styles.by}>by</span>
            <span className={styles.aperture}>Aperture</span>
        </p>        
    </div>
}

export default ApertureLogo
