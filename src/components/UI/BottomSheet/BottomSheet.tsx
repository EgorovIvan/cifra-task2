import * as React from 'react';
import './bottom_sheet.scss'
import {useEffect, useRef, useState} from "react";
import {useBottomSheetStore} from "@/stores/useBottomSheetStore.ts";
import SwitchToggle from "@/components/UI/SwitchToggle/SwitchToggle";

const BottomSheet: React.FC = () => {

    const {yPosition, appHeight, wrapperHeight, isTouchUp,
        setYPosition, setAppHeight, setWrapperHeight, setIsTouchUp} = useBottomSheetStore();
    const [isDragging, setIsDragging] = useState(false);
    const plateRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleResize = () => {
        setAppHeight(window.innerHeight);
    };

    /* Обработка события при нажатии на экран */
    const handleTouchStart = () => {
        setIsTouchUp(false)
        setIsDragging(true);
    };


    /* Обработка события при переносе блока */
    const handleTouchMove = (e: TouchEvent) => {
        setIsTouchUp(false)
        if (!isDragging || !plateRef.current) return;

        const newYPosition = e.touches[0]?.clientY;

        if (newYPosition > 0) {
            setYPosition(newYPosition - 15);
        }

    };

    /* Обработка события при отпускании touch */
    const handleTouchUp = (e: TouchEvent) => {
        setIsTouchUp(true)
        const fixedPosition = e.changedTouches[0]?.clientY;

        if (fixedPosition < appHeight * 0.25) {
            setYPosition(0);
        } else if (fixedPosition > appHeight * 0.75) {
            setYPosition(appHeight + 10);
        } else {
            setYPosition(wrapperHeight);
        }
        setIsDragging(false);
    };

    useEffect(() => {
        setWrapperHeight(appHeight - wrapperRef?.current?.clientHeight - 24)

        window.addEventListener('resize', handleResize);
        handleResize()
        setYPosition(appHeight);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [appHeight]);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleTouchUp);
        } else {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchUp);
        }

        return () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchUp);
        };
    }, [isDragging]);

    return (
        <div
            className={`bottom_sheet ${isTouchUp ? "bottom_sheet_animation" : ''}`}
            style={{transform: `translateY(${yPosition}px)`, height: `${appHeight}px`}}
        >
            <div ref={wrapperRef} className="bottom_sheet__wrapper">
                <div
                    ref={plateRef}
                    onTouchStart={handleTouchStart}
                    className={'bottom_sheet__wrapper-plate'}
                >
                    <img
                        className={'bottom_sheet__plate'}
                        src={'img/bottomSheet/bottom-sheet.svg'}

                    />
                </div>

                <div className="bottom_sheet__header">
                    <div className="bottom_sheet__title">
                        <h3>Информация о БО</h3>
                        <p>Отображать доп. информацию о БО</p>
                    </div>
                    <SwitchToggle/>
                </div>
                <ul className="bottom_sheet__list">
                    <li>Перевод с Утв на Принят</li>
                    <li>Перевод с Утв на НеУтв</li>
                    <li>Перевод с Утв на 1С</li>
                </ul>
            </div>
        </div>
    );
};

export default BottomSheet;
