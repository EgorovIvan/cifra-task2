import * as React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '@/components/UI/DateRangeInput/datepicker_container.scss'

interface Props {
    name: string;
    title: string;
    placeholder?: string;
    date: Date | null | undefined;
    setDateChange: (value: Date | null | undefined) => void;
    validateValue: boolean;
    isNull: boolean;
    textError: string;
}

const DateInput: React.FC<Props> = (Props) => {

    // Выбор периода дат
    const handleDateChange = (date: Date | null | undefined) => {
        Props.setDateChange(date);
    };

    return (
        <div className="datepicker_container">
            <DatePicker
                selected={Props.date}
                onChange={handleDateChange}
                dateFormat="dd.MM.yyyy"
                placeholderText={Props.placeholder}
                className="input"
                isClearable
                name={Props.name}
            />
            <label htmlFor={Props.name}>{Props.title}</label>
            {Props.isNull ? <div className="error">Поле ввода не должно быть пустым</div> : ''}
            {Props.validateValue ? <div className="error">{Props.textError}</div> : ''}
        </div>
    );
};

export default DateInput;
