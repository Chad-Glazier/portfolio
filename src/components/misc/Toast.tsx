import styles from "./Toast.module.css"

type ToastProps = {
    message: string
    hidden: boolean
}

function Toast({ message, hidden }: ToastProps) {
    return <div 
        className={
            styles.container + " " + (hidden ? styles.hidden : "")
        }
    >
        <p>{message}</p>
    </div>
}


export default Toast
