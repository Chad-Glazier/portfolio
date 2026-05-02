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

	useEffect(() => {
		onSelect(activeItem)
	}, [activeItem])

	return <nav className={styles.nav}>
		{navItems.map((name) => <NavItem 
				activeItem={activeItem}
				name={name}
				onClick={() => setActiveItem(name)}
				key={name}
		/>)}
		<div className={styles.backgroundPattern}></div>
	</nav>
}

type NavItemProps = { 
	activeItem: NavItem | null,
	onClick?: () => void 
	name: NavItem
}

function NavItem({ activeItem, onClick, name }: NavItemProps) {
	return <div
		className={styles.item + 
			(activeItem == name ? " " + styles.active : "")}
		onClick={onClick}
	>
		{name}
	</div>
}

export default Nav