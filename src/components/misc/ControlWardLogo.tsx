import styles from "./ControlWardLogo.module.css"

type ControlWardLogoProps = {
    height: string
}

function ControlWardLogo({ height }: ControlWardLogoProps) {
    return <div className={styles.container}>
        <div className={styles.container}>
            <h1 
                className={styles.header}
                style={{ 
                    fontSize: `calc(${height} / 2)`,
                    borderWidth: `calc(${height} / 16)`, 
                    paddingRight: `calc(${height} / 4)`,
                }}    
            >
                Control<br />Ward
            </h1>
        </div>
    </div>
}

export default ControlWardLogo
