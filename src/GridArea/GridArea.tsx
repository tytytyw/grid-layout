import { useState, useRef, useEffect } from 'react'
import GridLayout from "react-grid-layout";
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
    { title: "Меню навигации", i: "menu", w: 12, h: 1, minH: 1, minW: 12, active: false },
    { title: "Информер", i: "informer", w: 3, h: 2, minW: 3, minH: 1, active: false },
    { title: "Личная информация", i: "personnel", w: 6, h: 1, minH: 1, minW: 6, active: false },
    { title: "Моя команда", i: "my-team", w: 6, h: 1, minH: 1, minW: 6, active: false },
    { title: "Документы", i: "docs", w: 6, h: 1, minH: 1, minW: 6, active: false },
    { title: "Список заявок", i: "requests", w: 9, h: 1, minH: 1, minW: 9, active: false },
    { title: "Новости", i: "news", w: 3, h: 4, minH: 1, minW: 3, x: 9, y: 0, active: true }
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
        setactiveWidgets(prev => prev.map(widget => widget.i === targetNewParams.i
            ? {
                ...widget,
                x: targetNewParams.x,
                y: targetNewParams.y,
                w: targetNewParams.w,
                h: targetNewParams.h
            }
            : widget))
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
                    preventCollision={true}
                    compactType={null}
                    containerPadding={[15, 15]}
                    onDragStop={(elements, targetOldPatams, targetNewParams) => updateWidget(elements, targetOldPatams, targetNewParams)}
                    onResizeStop={(elements, targetOldPatams, targetNewParams) => updateWidget(elements, targetOldPatams, targetNewParams)}
                >
                    {activeWidgets.map((item) => <div key={item.i}>
                        <GridItem widget={item} deleteWidget={deleteWidget} />
                    </div>)}
                </GridLayout>

            </ div >

        </div >
    )
}

export default GridArea