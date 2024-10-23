import * as React from 'react';
import './header.scss'
import Icon from '../Icon/Icon';
import {useBottomSheetStore} from "@/stores/useBottomSheetStore.ts";
import Button from '../UI/Buttons/Button';
import { useModalStore } from '@/stores/useModalStore';

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


  const {wrapperHeight, yPosition, setYPosition} = useBottomSheetStore();
  const { openModal } = useModalStore();


  const handleBottomSheetOpen = () => {
    setYPosition(wrapperHeight)
  }

  const handleOpenFilterModal = (): void => {
    openModal();
  };

  const handleOpenCreateVznModal = (): void => {
    openModal();
  };

  return (
    <header className={`header_container ${hasBorder ? 'with_border' : ''} ${isBlueBackground ? 'blue_background' : ''}`}>
      {showCloseButton && (
          <button className="icon_button" onClick={onCloseButtonClick ?? undefined} >
            <Icon src='public/img/filter/close.svg' />
          </button>
      )}

      <div className="content">
        <div className="title" onClick={handleBottomSheetOpen}>
          <h1 className="headline_text">{headline}</h1>
          {supportingText && (
            <div className="supporting_text">{supportingText}</div>
          )}
        </div>

        {centralButton &&
            <Button
                type='button'
                text='Поиск'
                classBtn='btn_search'
                onClickBtn={handleOpenFilterModal}
                iconSrc={'public/img/header/search.svg'}
                sizeSrc={14}
            />}
      </div>

      {rightButton &&
          <Button
              type='button'
              text='Создать'
              classBtn='btn_create'
              onClickBtn={handleOpenCreateVznModal}
              iconSrc={'public/img/header/create.svg'}
              sizeSrc={16}
          />}
    </header>
  );
};

export default Header;
