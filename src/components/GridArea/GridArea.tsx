import { useState, useRef, useEffect } from 'react'
import GridLayout from "react-grid-layout";
import Button from '../Button/Button';
import GridItem from '../GridItem/GridItem';
import Header from '../Header/Header'
import styles from "./GridArea.module.sass";

export interface Widget {
    title: string;
    i?: string;
    x?: number;
    y?: number;
    w: number;
    h: number;
    minW?: number;
    minH?: number;
    active: boolean;
}

interface updatedGrigItem {
    h: number
    i: string
    w: number
    x: number
    y: number
}

const initialItems = [
    { title: "Меню навигации", i: "menu", id: "menu", w: 12, h: 1, minH: 1, minW: 12, active: false },
    { title: "Информер", i: "informer", id: "informer", w: 3, h: 2, minW: 3, minH: 1, active: false },
    { title: "Личная информация", i: "personnel", id: "personnel", w: 6, h: 1, minH: 1, minW: 6, active: false },
    { title: "Моя команда", i: "my-team", id: "my-team", w: 6, h: 1, minH: 1, minW: 6, active: false },
    { title: "Документы", i: "docs", id: "docs", w: 6, h: 1, minH: 1, minW: 6, active: false },
    { title: "Список заявок", i: "requests", id: "requests", w: 9, h: 1, minH: 1, minW: 9, active: false },
    { title: "Новости", i: "news", id: "news", w: 3, h: 4, minH: 1, minW: 3, x: 9, y: 0, active: true }
]

const GridArea = () => {
    const [passiveWidgets, setPassiveWidgets] = useState<Array<any>>(initialItems.filter(widget => widget.active === false))
    const [activeWidgets, setactiveWidgets] = useState<Array<any>>([])

    const layoutRef = useRef<HTMLDivElement | null>(null)

    const deleteWidget = (widget: Widget) => {
        setactiveWidgets(prev => prev.filter(item => item !== widget))
        setPassiveWidgets(prev => [...prev, { ...widget, active: false }])
    }

    const addWidget = (widget: Widget) => {
        const bottom = activeWidgets.length ? Math.max(...activeWidgets.map(item => item.y ?? 0)) + 1 : 0;
        setactiveWidgets(prev => [...prev, { ...widget, y: bottom, x: 0, active: true }])
        setPassiveWidgets(prev => prev.filter(item => item !== widget))
    }

    const updateWidget = (elements: Array<updatedGrigItem>, targetOldPatams: updatedGrigItem, targetNewParams: updatedGrigItem) => {
        // preventCollision={true}
        // setactiveWidgets(prev => prev.map(widget => widget.i === targetNewParams.i
        //     ? {
        //         ...widget,
        //         x: targetNewParams.x,
        //         y: targetNewParams.y,
        //         w: targetNewParams.w,
        //         h: targetNewParams.h
        //     }
        //     : widget))

        // preventCollision={false}
        setactiveWidgets(prev => prev.map(widget => {
            let newWidgetParam = null
            elements.forEach(el => {
                if (el.i === widget.i) newWidgetParam = {
                    ...widget,
                    x: el.x,
                    y: el.y,
                    w: el.w,
                    h: el.h
                }
            })
            return newWidgetParam || widget
        }))
    }

    const resetWidgets = () => {
        setPassiveWidgets(initialItems.filter(widget => widget.active === false))
        setactiveWidgets(initialItems.filter(widget => widget.active))
    }

    const saveWidgets = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activeWidgets)
        };
        fetch('', requestOptions)
    }

    useEffect(() => {
        if (passiveWidgets.length) setactiveWidgets(initialItems.filter(widget => widget.active))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className={styles.wrapper} ref={layoutRef}>
            {passiveWidgets.length ? <Header addWidget={addWidget} widgets={passiveWidgets} /> : ''}
            <div className={styles.activeWidgets}>
                <GridLayout
                    className="layout"
                    layout={activeWidgets}
                    cols={12}
                    rowHeight={120}
                    width={layoutRef?.current?.clientWidth}
                    preventCollision={false}
                    // preventCollision={true}
                    compactType={null}
                    // compactType={'vertical'}
                    containerPadding={[15, 15]}
                    onDragStop={(elements, targetOldPatams, targetNewParams) => updateWidget(elements, targetOldPatams, targetNewParams)}
                    onResizeStop={(elements, targetOldPatams, targetNewParams) => updateWidget(elements, targetOldPatams, targetNewParams)}

                    isBounded={false}
                >
                    {activeWidgets.map((item) => <div key={item.i}>
                        <GridItem widget={item} deleteWidget={deleteWidget} />
                    </div>)}
                </GridLayout>

            </div>
            <div className={styles.buttonsWrapper}>
                <Button type='reset' callback={resetWidgets}>
                    <svg version="1.1" width="16" height="16" viewBox="0 0 16 16">
                        <path fill="#a5a2a5" d="M15.854 12.854c-0-0-0-0-0-0l-4.854-4.854 4.854-4.854c0-0 0-0 0-0 0.052-0.052 0.090-0.113 0.114-0.178 0.066-0.178 0.028-0.386-0.114-0.529l-2.293-2.293c-0.143-0.143-0.351-0.181-0.529-0.114-0.065 0.024-0.126 0.062-0.178 0.114 0 0-0 0-0 0l-4.854 4.854-4.854-4.854c-0-0-0-0-0-0-0.052-0.052-0.113-0.090-0.178-0.114-0.178-0.066-0.386-0.029-0.529 0.114l-2.293 2.293c-0.143 0.143-0.181 0.351-0.114 0.529 0.024 0.065 0.062 0.126 0.114 0.178 0 0 0 0 0 0l4.854 4.854-4.854 4.854c-0 0-0 0-0 0-0.052 0.052-0.090 0.113-0.114 0.178-0.066 0.178-0.029 0.386 0.114 0.529l2.293 2.293c0.143 0.143 0.351 0.181 0.529 0.114 0.065-0.024 0.126-0.062 0.178-0.114 0-0 0-0 0-0l4.854-4.854 4.854 4.854c0 0 0 0 0 0 0.052 0.052 0.113 0.090 0.178 0.114 0.178 0.066 0.386 0.029 0.529-0.114l2.293-2.293c0.143-0.143 0.181-0.351 0.114-0.529-0.024-0.065-0.062-0.126-0.114-0.178z"></path>
                    </svg>
                </Button>
                <Button type='save' callback={saveWidgets}>
                    <svg version="1.1" width="16" height="16" viewBox="0 0 16 16">
                        <path fill="#a5a2a5" d="M14 0h-14v16h16v-14l-2-2zM8 2h2v4h-2v-4zM14 14h-12v-12h1v5h9v-5h1.172l0.828 0.828v11.172z"></path>
                    </svg>
                </Button>

            </div>
        </div >
    )
}

export default GridArea