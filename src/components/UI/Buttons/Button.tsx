import * as React from "react";
import './button.scss';

interface Props {
  type: "submit" | "reset" | "button" | undefined;
  text: string;
  onClickBtn: () => void | null;
  classBtn?: string;
  isWhite?: boolean;
}

const Button: React.FC<Props> = ({type, text, onClickBtn, classBtn = '', isWhite = false}: Props) => {
  const buttonClass = `btn ${isWhite ? 'btn--white' : ''} ${classBtn}`.trim();

  return (
    <button type={type} className={buttonClass} onClick={onClickBtn}>
      {text}
    </button>
  );
};

export default Button;
