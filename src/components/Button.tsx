import * as React from "react";

interface Props {
  type: "submit" | "button" | "reset" | "undefined";
  classBtn: string;
  text: string;
  onClickBtn: () => void;
}

const Button: React.FC<Props> = ({type, classBtn, text, onClickBtn}: Props) => {

  return (
    <button type={type} className={classBtn} onClick={onClickBtn}>{text}</button>
  )
}

export default Button
