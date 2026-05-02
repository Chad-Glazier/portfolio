import { useEffect, useState } from "react"
import styles from "./Nav.module.css"

export type NavItem = "Introduction" | "Background" | "Projects" | "Contact"

const navItems: NavItem[] = [
	"Introduction", 
	"Background", 
	"Projects", 
	"Contact",	
]

type NavProps = {
	onSelect: (item: NavItem) => void
}

function Nav({ onSelect }: NavProps) {

	const [activeItem, setActiveItem] = useState<NavItem>("Introduction")
	const [backgroundOffset, setBackgroundOffset] = useState("0% -25%")

	useEffect(() => {
		onSelect(activeItem)
	}, [activeItem])

	return <nav className={styles.nav}>
		{navItems.map((name, idx) => <NavItem 
				activeItem={activeItem}
				name={name}
				onClick={() => setActiveItem(name)}
				onMouseOver={() => {
					setBackgroundOffset(`0% ${-idx * 10}%`)
				}}
				key={name}
		/>)}
		<div 
			style={{ backgroundPosition: backgroundOffset}}
			className={styles.backgroundPattern}></div>
	</nav>
}

type NavItemProps = { 
	activeItem: NavItem | null,
	onClick?: () => void 
	onMouseOver?: () => void
	name: NavItem
}

function NavItem({ activeItem, onClick, onMouseOver, name }: NavItemProps) {
	return <div
		className={styles.item + 
			(activeItem == name ? " " + styles.active : "")}
		onClick={onClick}
		onMouseOver={onMouseOver}
	>
		{name}
	</div>
}

export default Nav