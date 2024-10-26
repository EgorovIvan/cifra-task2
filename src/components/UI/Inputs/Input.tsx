import * as React from "react";
import './input.scss'

interface Props {
  type: string;
  name: string;
  title: string;
  placeholder?: string;
  inputValue?: string | number;
  updateValue?: (value?: string) => void;
  validateValue?: boolean;
  isNull?: boolean;
  textError?: string;
}
const Input: React.FC<Props> = (Props) => {

  return (
    <div className="input_box">
      <input
        className={'input_field ' + ((Props.isNull || Props.validateValue) ? 'error_border' : '')}
        type={Props.type}
        name={Props.name}
        id={Props.name}
        placeholder={Props.placeholder}
        value={Props.inputValue}
        onChange={(e) => {
          if (Props.updateValue) {
            Props.updateValue(e.target.value);  // Вызываем только если передано
          }
        }}
      />
      <label htmlFor={Props.name}>{Props.title}</label>

      {Props.isNull ? <div className="error">Поле ввода не должно быть пустым</div> : ''}

      {Props.validateValue ? <div className="error">{Props.textError}</div> : ''}
    </div>
  )
}

export default Input;
