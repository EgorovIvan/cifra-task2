import * as React from 'react';
import './header.scss'
import Icon from '../Icon/Icon';

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
    <header className={`header_container ${hasBorder ? 'with_border' : ''} ${isBlueBackground ? 'blue_background' : ''}`}>
      {showCloseButton && (
          <button className="icon_button" onClick={onCloseButtonClick ?? undefined} >
            <Icon src='../../../public/img/filter/close.svg' />
          </button>
      )}

      <div className="content">
        <div className="title">
          <h1 className="headline_text">{headline}</h1>
          {supportingText && (
            <div className="supporting_text">{supportingText}</div>
          )}
        </div>

        {centralButton && <div>{centralButton}</div>}
      </div>

      {rightButton && <div>{rightButton}</div>}
    </header>
  );
};

export default Header;
