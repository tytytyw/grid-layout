import classNames from 'classnames';
import React, { FC, ReactComponentElement } from 'react'
import styles from './Button.module.sass'

type ButtonProps = {
    children: React.ReactNode;
    type: string;
    callback: () => void
}

const Button: FC<ButtonProps> = ({ children, type, callback }) => {
    return (
        <div className={classNames(styles.wrapper, styles[type])} onClick={callback}>{children}</div>
    )
}

export default Button