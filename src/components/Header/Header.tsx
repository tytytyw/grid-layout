import React, { FC } from 'react'
import { Widget } from '../GridArea/GridArea'
import styles from './Header.module.sass'

interface HeaderProps {
    addWidget: (widget: Widget) => void;
    widgets: Array<Widget>
}

const Header: FC<HeaderProps> = ({ addWidget, widgets }) => {
    return (
        <div className={styles.wrapper}>
            <h2>Доступные виджеты</h2>
            <div className={styles.widgets}>
                {widgets.map((w, i) => (
                    <div key={w.i} className={styles.widget} onClick={() => addWidget(w)}>
                        <div className={styles.widget__icon}></div>
                        <div className={styles.widget__name}>{w.title}</div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Header