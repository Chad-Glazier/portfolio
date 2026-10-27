import styles from "./IconList.module.css"
import questIcon from "../../assets/skyrim_ui/icon - quest.png"
import scrollIcon from "../../assets/skyrim_ui/icon - scroll.png"
import townIcon from "../../assets/skyrim_ui/icon - town.png"
import collegeIcon from "../../assets/skyrim_ui/icon - college.png"
import mineIcon from "../../assets/skyrim_ui/icon - mine.png"

type SkyrimIconType = "quest" | "college" | "town" | "scroll" | "mine"

const iconSources: Record<SkyrimIconType, string> = {
    "college": collegeIcon,
    "scroll": scrollIcon,
    "town": townIcon,
    "quest": questIcon,
    "mine": mineIcon
}

type IconListProps = {
    items: {
        text: string
        icon: SkyrimIconType
    }[]
    row?: boolean
    className?: string
}

function IconList({ items, row, className }: IconListProps) {

    let listClassName = styles.list
    if (row) {
        listClassName += " " + styles.row
    }
    if (className) {
        listClassName += " " + className
    }

    return <ul className={listClassName}>
        {items.map(({ text, icon }) => 
            <li className={styles.item} key={text}>
                <img src={iconSources[icon]} className={styles.icon} />
                {text}
            </li>
        )}
    </ul>
}

export default IconList
