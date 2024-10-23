import React from 'react';
import './scan.scss';
import MainLayout from '@/layouts/MainLayout';
import Input from '../Inputs/Input';
import Button from '../Buttons/Button';

const Scan: React.FC = () => {
  return (
    <div className="modal" id="scan">
        <MainLayout
            headline="Сканировать номер объекта"
            showCloseButton={true}
            hasBorder={true}
            isBlueBackground={false}
        >
        <form className="scan__form" action="" id="form">
            <label>Сканируйте штрихкод с номером объекта или введите его вручную</label>
            <Input
                type="text"
                name="item-number"
                title="Номер объекта"
                placeholder=""
                inputValue =""
                updateValue={()=>{}}
                validateValue={false}
                isNull={false}
                textError=""
            />
            <Input
                type="text"
                name="item-number"
                title="Тип объекта БО"
                placeholder=""
                inputValue =""
                updateValue={()=>{}}
                validateValue={false}
                isNull={false}
                textError=""
            />

            <div className="scan__form_btns">
              <Button
                  type="button"
                  text="Перейти"
                  classBtn='btn'
                  onClickBtn={()=>{}}
              />

              <Button
                  type="button"
                  text="Отмена"
                  classBtn='btn--white'
                  onClickBtn={()=>{}}
              />
            </div>
        </form>
        </MainLayout>
    </div>
  );
};

export default Scan;
