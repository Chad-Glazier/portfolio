import styles from "./Bullet.module.css"

type BulletProps = {
    filled?: boolean
    hidden?: boolean
}

function Bullet({ filled, hidden }: BulletProps) {
    return <svg 
        className={styles.svg}
        viewBox="0 0 36 36" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
        <path
            className={styles.mainPath + 
                (hidden 
                    ? " " + styles.hidden
                    : "")} 
            d={`
                M 6.29995 30.6
                V 25.2
                H 8.09995
                L 9.89995 26.55
                M 6.29995 30.6
                V 10.8M6.29995 30.6
                L 9.89995 26.55
                M 6.29995 10.8
                V 5.40002
                L 9.89995 9.45002
                M 6.29995 10.8
                H 8.09995
                L 9.89995 9.45002
                M 9.89995 9.45002
                L 15.3 5.40002
                L 29.7 18
                L 15.3 30.6
                L 9.89995 26.55
            `}
            stroke="#D9D9D9" 
            stroke-width="2.25" 
            stroke-linecap="round" 
            stroke-linejoin="round"/>
        <path
            opacity={filled ? "1" : "0"}
            d={`
                M 20.7 18
                L 15.3 14.4
                V 21.6
                L 20.7 18
                Z
            `}
            fill="#D9D9D9" 
            stroke="#D9D9D9" 
            stroke-width="2.25" 
            stroke-linecap="round" 
            stroke-linejoin="round"
        />
    </svg>
}

export default Bullet
