import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import styles from "./ClipboardLink.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react"
import Toast from "./Toast"

type ClipboardLinkProps = {
    /** The text to copy when the "link" is clicked. */
	string: string
	icon?: IconDefinition
	text?: string
}

/**
 * A component that looks like a link but, instead of navigating to a new page,
 * copies some text to the user's clipboard.
 */
function ClipboardLink({
	string, icon, text
}: ClipboardLinkProps) {

	const [hideToast, setHideToast] = useState(true)
	const hideTimeout = useRef<number | null>(null)

	return <>
		<span 
			className={styles.link}
			onClick={() => {
				navigator.clipboard.writeText(string)
				setHideToast(false)
				if (hideTimeout.current != null) {
					clearTimeout(hideTimeout.current)
				}
				hideTimeout.current = setTimeout(() => {
					setHideToast(true)
				}, 2000)
			}}
		>
			{icon && <FontAwesomeIcon icon={icon} />}
			{icon && text && <>&nbsp;</>}
			{text}
			<span className={styles.underline}></span>
		</span>	
		<Toast 
			message="Copied to clipboard"
			hidden={hideToast}
		/>
	</>
}

export default ClipboardLink
