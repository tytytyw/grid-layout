//  @ts-nocheck
import { FC } from 'react'
import { Widget } from '../GridArea/GridArea'
import styles from './Header.module.sass';
import {ReactComponent as ReactLogo} from './defaultIcon.svg'

interface HeaderProps {
    addWidget: (widget: Widget) => void;
    widgets: Array<Widget>
}

const Header: FC<HeaderProps> = ({ addWidget, widgets }) => {

    return (
        <div className={styles.wrapper}>
            <h2>Доступные виджеты</h2>
            <div className={styles.widgets}>
                {widgets.map((w, i) => {return (
                    <div key={w.i} className={styles.widget} onClick={() => addWidget(w)}>
                        <div className={styles.widget__icon}>
                            {w.icon ? <img src={w.icon} alt={w.title} /> : <ReactLogo width={44} height={44} />}
                        </div>
                        <div className={styles.widget__name}>{w.title}</div>
                    </div>
                )})}
            </div>
        </div >
    )
}

export default Header