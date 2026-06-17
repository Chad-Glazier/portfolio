import type { JSX } from "react"
import styles from "./BulletList.module.css"
import Bullet from "./svg/Bullet"

type BulletListProps = {
    items: (string | JSX.Element)[]
    className?: string
}

function BulletList({
    items, className,
}: BulletListProps) {

    return <ul
        className={styles.list + " " + (className ?? "")}
    >
        {items.map(item => <ListItem item={item} />)}    
    </ul>

}

function ListItem({ item }: { item: string | JSX.Element }) {
    return <li className={styles.item}>
        <Bullet /> {item}
    </li>
}

export default BulletList
