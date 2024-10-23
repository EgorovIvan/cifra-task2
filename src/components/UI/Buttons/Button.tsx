import * as React from "react";
import './button.scss';
import Icon from "@/components/Icon/Icon.tsx";

interface Props {
  type: "submit" | "reset" | "button" | undefined;
  classBtn?: string;
  text?: string;
  onClickBtn?: (() => void);
  iconSrc?: string | undefined;
  sizeSrc?: number;
}

const Button: React.FC<Props> = ({type, text, onClickBtn, classBtn, iconSrc, sizeSrc}: Props) => {

  return (
    <button type={type} className={classBtn} onClick={onClickBtn}>
      {iconSrc ? <Icon src={iconSrc} size={sizeSrc} /> : '' }
      {text}
    </button>
  );
};

export default Button;
