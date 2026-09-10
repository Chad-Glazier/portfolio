import styles from "./ShiftingImage.module.css"

type ShiftingImageProps = {
    items: {
        src: string
        alt: string
    }[]
    activeIdx: number
    duration?: number
}

function ShiftingImage({ items, activeIdx }: ShiftingImageProps) {

    return <div
        className={styles.container}
    >
        {items.map((item, idx) => <img
            key={item.src}
            src={item.src}
            alt={item.alt}
            className={idx == activeIdx ? 
                styles.active : ""
            }
            style={{
                transition: `opacity ${400}ms ease`,
                position: idx > 0 ? "absolute" : undefined,
                top: idx > 0 ? "50%" : undefined,
                transform: idx > 0 ? "translateY(-50%)" : undefined,
            }}
        />)}
    </div>
}

export default ShiftingImage
