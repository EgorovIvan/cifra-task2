import * as React from 'react';
import './scan.scss';
import Input from '../Inputs/Input';
import Button from '../Buttons/Button';
import {useModalStore} from "@/stores/useModalStore.ts";
import {useTypeBoStore} from "@/stores/useTypeBoStore.ts";
import {useAuthStore} from "@/stores/useAuthStore.ts";
import {useImmer} from "use-immer";
import {InputState} from "@/interfaces/InputState.ts";
import Header from "@/components/Header/Header.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import {useEffect} from "react";

const Scan: React.FC = () => {

    const {authToken} = useAuthStore()
    const {closeScanModal} = useModalStore()
    const {typeBo, updateTypeBo, fetchTypeBo} = useTypeBoStore()

    const [inputBoNum, updateInputBoNum] = useImmer<InputState>({
        value: "",
        errorField: false,
        isNull: false,
    });

    const [inputTypeBO, updateInputTypeBO] = useImmer<InputState>({
        value: "",
        errorField: false,
        isNull: false,
    });

    const handleSubmit = () => {

        // closeScanModal();
        // openResultsModal();
        updateInputTypeBO((draft) => {
            if(inputBoNum.value) {
                draft.value =  ` Запрос прошел успешно, получен soCode: ${String(typeBo.soCode)}`
            } else {
                updateTypeBo({'soType': 0, 'soCode': null})
                draft.value = 'Ошибка запроса'
            }
        })

        console.log(typeBo.soCode)
    }

    const handleInputBoNum = (value?: string): void => {

        updateInputBoNum((draft) => {
                draft.value = value
        })

    }

    useEffect(() => {
        fetchTypeBo(authToken, inputBoNum.value);
    }, [inputBoNum])
    return (
        <div className="modal" id="scan">
            <Header
                headline="Сканировать номер объекта"
                showCloseButton={true}
                hasBorder={true}
                isBlueBackground={false}
                onCloseButtonClick={closeScanModal}
            />
            <main className={'main'}>
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
                        inputValue={inputTypeBO.value}
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
            </main>
            <Footer/>
        </div>
    );
};

export default Scan;
