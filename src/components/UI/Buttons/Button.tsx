import * as React from "react";
import './button.scss'

interface Props {
  type: "submit" | "reset" | "button" | undefined;
  classBtn?: string;
  text?: string;
  onClickBtn?: (() => void);
}

const Button: React.FC<Props> = ({type, classBtn, text, onClickBtn}: Props) => {

  return (
    <button type={type} className={'btn ' + classBtn} onClick={onClickBtn}>{text}</button>
  )
}

export default Button
