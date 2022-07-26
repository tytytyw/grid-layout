import { FC } from 'react'
import styles from './GridItem.module.sass'
import { Widget } from '../GridArea/GridArea'

interface GridItemProps {
    widget: Widget
    deleteWidget: (widget: Widget) => void
}

const GridItem: FC<GridItemProps> = ({ widget, deleteWidget }) => {
    return (
        <div title='' className={styles.wrapper}>
            <div className={styles.header}>
                <h5 className={styles.title}>{widget.title}</h5>
                <div className={styles.cross} onClick={() => deleteWidget(widget)}></div>
            </div>
        </div>
    )
}

export default GridItem