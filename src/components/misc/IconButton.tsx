import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./IconButton.module.css"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"

type IconButtonProps = {
    href: string
    icon: IconDefinition
}

function IconButton({ 
    href, icon,
}: IconButtonProps) {
    
    return <a href={href} target="_blank">
        <button
            className={styles.button}
        >
            <FontAwesomeIcon icon={icon} />
        </button>
    </a>
}

export default IconButton
