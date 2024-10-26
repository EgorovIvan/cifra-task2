import * as React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './datepicker_container.scss'

interface Props {
    name: string;
    title: string;
    placeholder?: string;
    startDate?: Date;
    endDate?: Date;
    setStartDate: (value: Date | null) => void;
    setEndDate: (value: Date | null) => void;
    validateValue: boolean;
    textError: string;
}

const DateRangeInput: React.FC<Props> = (Props) => {


    // Выбор периода дат
    const handleDateChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        Props.setStartDate(start);
        Props.setEndDate(end);
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
