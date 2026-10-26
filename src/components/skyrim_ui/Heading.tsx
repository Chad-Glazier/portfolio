import styles from "./Heading.module.css"
import miscLeft from "../../assets/skyrim_ui/Journal Miscellaneous - Left.png"
import hearthfireLeft from "../../assets/skyrim_ui/Journal Hearthfire - Left.png"
import collegeLeft from "../../assets/skyrim_ui/Journal College of Winterhold - Left.png"

type HeadingStyle = "misc" | "college" | "hearthfire"

type HeadingProps = {
    style?: HeadingStyle
    text: string
    className?: string
}

const sources: Record<HeadingStyle, string> = {
    "misc": miscLeft,
    "college": collegeLeft,
    "hearthfire": hearthfireLeft
}

function Heading({ style, text, className }: HeadingProps) {
    let src = sources[style ?? "misc"]

    return <div className={styles.container + " " + (className ?? "")}>
        <img src={src} className={styles.left} />
        <h1 className={styles.text}>{text}</h1>
        <img src={src} className={styles.right} />
    </div>
}

export default Heading
