import styles from "./Arrow.module.css"

type ArrowProps = {
    hidden?: boolean
}

export function LeftArrow({ hidden }: ArrowProps) {

    const pathClassName = styles.path + 
        (hidden ? " " + styles.hidden : "") 

    return <svg 
        viewBox="0 0 32 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={styles.svg}
    >
        <path 
            d="M17.75 13.3107L12.25 7.81067L0.75 19.8107L12.25 31.8107L13.75 30.3107M17.75 26.3107L24.25 19.8107L22.25 17.8107M12.75 13.3107L11.25 14.8107L17.75 21.3107M22.25 26.8107C22.75 27.3107 24.15 28.3107 25.75 28.3107C27.75 28.3107 30.75 25.8107 30.75 20.8107C30.75 15.8107 27.25 13.3107 25.25 13.3107C23.25 13.3107 21.51777 14.0429 19.75 15.8107C17.75 17.8107 18.25 17.3107 17.75 17.8107M24.25 10.8107V1.81067L17.25 8.81067M14.25 21.8107L11.75 24.3107L24.25 36.8107L25.25 37.8107V30.8107"
            pathLength="1"
            className={pathClassName}
        />
    </svg>
}

export function RightArrow({ hidden }: ArrowProps) {

    const pathClassName = styles.path + 
        (hidden ? " " + styles.hidden : "") 

    return <svg 
        viewBox="0 0 32 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={styles.svg}
    >
        <path 
            d="M13.75 13.3107L19.25 7.81067L30.75 19.8107L19.25 31.8107L17.75 30.3107M13.75 26.3107L7.25 19.8107L9.25 17.8107M18.75 13.3107L20.25 14.8107L13.75 21.3107M9.25 26.8107C8.75 27.3107 7.35 28.3107 5.75 28.3107C3.75 28.3107 0.75 25.8107 0.75 20.8107C0.75 15.8107 4.25 13.3107 6.25 13.3107C8.25 13.3107 9.98223 14.0429 11.75 15.8107C13.75 17.8107 13.25 17.3107 13.75 17.8107M7.25 10.8107V1.81067L14.25 8.81067M17.25 21.8107L19.75 24.3107L7.25 36.8107L6.25 37.8107V30.8107" 
            pathLength="1"
            className={pathClassName}
        />
    </svg>
}
