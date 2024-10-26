import * as React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './datepicker_container.scss'

interface Props {
    name: string;
    title: string;
    placeholder?: string;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    setStartDate: (value?: Date | undefined) => void;
    setEndDate: (value?: Date | undefined) => void;
    validateValue: boolean;
    textError: string;
}

const DateRangeInput: React.FC<Props> = (Props) => {


    // Выбор периода дат
    const handleDateChange = (dates: [ Date | null | undefined,  Date | null | undefined]) => {
        const [start, end] = dates;
        if(start) {
            Props.setStartDate(start);
        }
        if(end) {
            Props.setEndDate(end);
        }

    };

    return (
        <div className="datepicker_container">
            <DatePicker
                selected={Props.startDate}
                onChange={handleDateChange}
                startDate={Props.startDate}
                endDate={Props.endDate}
                selectsRange
                dateFormat="dd.MM.yyyy"
                placeholderText={Props.placeholder}
                className="input"
                isClearable
                name={Props.name}
            />
            <label htmlFor={Props.name}>{Props.title}</label>
            {Props.validateValue ? <div className="error">{Props.textError}</div> : ''}
        </div>
    );
};

export default DateRangeInput;
