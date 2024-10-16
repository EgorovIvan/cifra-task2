import React from 'react';
import './../scss/_header.scss';

import Icon from './Icon/Icon';
import { useModalStore } from '../stores/modalStore';

interface HeaderProps {
  headline: string;
  supportingText?: string;
  showCloseButton?: boolean;
  centralButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  hasBorder?: boolean;
  isBlueBackground?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  headline,
  supportingText,
  showCloseButton = false,
  centralButton,
  rightButton,
  hasBorder = true,
  isBlueBackground = false,
}) => {
  const { closeModal } = useModalStore();

  return (
    <header className={`header-container ${hasBorder ? 'with-border' : ''} ${isBlueBackground ? 'blue-background' : ''}`}>
      {showCloseButton && (
        <button className="icon-button" onClick={closeModal ?? undefined} >
          <Icon src='../../public/img/filter/close.svg' />
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
