import VerticalBarThick from "../skyrim_ui/svg/VerticalBarWithArrowThick"
import styles from "./Introduction.module.css"

function Introduction() {

    return <main className={styles.container}>
        <div className={styles.innerContainer}>
            <p>My name is Chad and I write programs.</p>
        </div>

        {/* <VerticalBar height={400} arrowYPercent={progress}/> */}
        <VerticalBarThick height={500} arrowYPercent={20} />
    </main>
}

export default Introduction
