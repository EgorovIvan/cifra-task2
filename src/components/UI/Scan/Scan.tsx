import * as React from 'react';
import './scan.scss';
import MainLayout from '@/layouts/MainLayout';
import Input from '../Inputs/Input';
import Button from '../Buttons/Button';
import {useModalStore} from "@/stores/useModalStore.ts";
import {useTypeBoStore} from "@/stores/useTypeBoStore.ts";
import {useAuthStore} from "@/stores/useAuthStore.ts";
import {useImmer} from "use-immer";
import {InputState} from "@/interfaces/InputState.ts";

const Scan: React.FC = () => {

    const {authToken} = useAuthStore()
    const {closeScanModal} = useModalStore()
    const {typeBo, fetchTypeBo} = useTypeBoStore()

    const [inputBoNum, updateInputBoNum] = useImmer<InputState>({
        value: "",
        errorField: false,
        isNull: false,
    });

    const handleSubmit = () => {
        fetchTypeBo(authToken, inputBoNum.value);
        // closeScanModal();
        // openResultsModal();
        console.log(typeBo.soCode)
    }

    const handleInputBoNum = (value: string): void => {
        updateInputBoNum((draft) => {
            draft.value = value
        })
    }
    return (
        <div className="modal" id="scan">
            <MainLayout
                headline="Сканировать номер объекта"
                showCloseButton={true}
                hasBorder={true}
                isBlueBackground={false}
                onCloseButtonClick={closeScanModal}
            >
                <form className="scan__form" action="" id="form">
                    <label>Сканируйте штрихкод с номером объекта или введите его вручную</label>
                    <Input
                        type="text"
                        name="item-number"
                        title="Номер объекта"
                        placeholder=""
                        inputValue={inputBoNum.value}
                        updateValue={handleInputBoNum}
                        validateValue={false}
                        isNull={false}
                        textError=""
                    />
                    <Input
                        type="text"
                        name="item-number"
                        title="Тип объекта БО"
                        placeholder=""
                        inputValue={Object.keys(typeBo).length ? String(typeBo.soCode) : ''}
                        updateValue={() => {
                        }}
                        validateValue={false}
                        isNull={false}
                        textError=""
                    />

                    <div className="scan__form_btns">
                        <Button
                            type="button"
                            text="Перейти"
                            classBtn='btn'
                            onClickBtn={handleSubmit}
                        />

                        <Button
                            type="button"
                            text="Отмена"
                            classBtn='btn--white'
                            onClickBtn={closeScanModal}
                        />
                    </div>
                </form>
            </MainLayout>
        </div>
    );
};

export default Scan;
