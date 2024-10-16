import * as React from 'react';
import CloseIcon from '/img/filter/close.svg';
import './style.scss'

interface HeaderProps {
  headline: string;
  supportingText?: string;
  showCloseButton?: boolean;
  onCloseButtonClick?: () => void,
  centralButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  hasBorder?: boolean;
  isBlueBackground?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  headline,
  supportingText,
  showCloseButton = false,
  onCloseButtonClick,
  centralButton,
  rightButton,
  hasBorder = true,
  isBlueBackground = false,
}) => {
  return (
    <header className={`header-container ${hasBorder ? 'with-border' : ''} ${isBlueBackground ? 'blue-background' : ''}`}>
      {showCloseButton && (
          <button className="icon-button" onClick={onCloseButtonClick ?? undefined} >
            <img src={CloseIcon} alt="Close" className="close-icon" />
        </button>
      )}

      <div className="content">
        <div className="title">
          <h1 className="headline-text">{headline}</h1>
          {supportingText && (
            <div className="supporting-text">{supportingText}</div>
          )}
        </div>

        {centralButton && <div>{centralButton}</div>}
      </div>

      {rightButton && <div>{rightButton}</div>}
    </header>
  );
};

export default Header;
