import * as React from "react";
import MainLayout from "@/layouts/MainLayout.tsx";
import Input from "@/components/UI/Inputs/Input.tsx";
import {useImmer} from "use-immer";
import {InputState} from "@/interfaces/InputState.tsx";
import './create_form.scss'
import SelectInput from "@/components/UI/Inputs/SelectInput.tsx";
import Button from "@/components/UI/Buttons/Button.tsx";

interface InputDate {
    value: string,
    date:  Date | undefined,
    errorField: boolean,
}

const CreateVznConsumption: React.FC = () => {

    const [inputVznNumber, updateInputVznNumber] = useImmer<InputState>({
        value: "",
        errorField: false,
        isNull: false,
    });

    const [inputSender, updateInputSender] = useImmer<InputState>({
        value: "",
        errorField: false,
        isNull: false,
    });

    const [inputRecipient, updateInputRecipient] = useImmer<InputState>({
        value: "",
        errorField: false,
        isNull: false,
    });


    const [inputDate, updateInputDate] = useImmer<InputDate>({
        value: "",
        date:  undefined,
        errorField: false,
    });

    // Ввод данных в поле "Номер ВЗН"
    const handleInputVznNumber = (value: string): void => {
        updateInputVznNumber((draft) => {
            draft.value = value
        })
    }

    // Ввод данных в поле "Отправитель"
    const handleInputSender = (value: string): void => {
        updateInputSender((draft) => {
            draft.value = value
        })
    }

    // Ввод данных в поле "Получатель"
    const handleInputRecipient = (value: string): void => {
        updateInputRecipient((draft) => {
            draft.value = value
        })
    }

    // Ввод данных в поле "Дата принятия"
    const handleInputDate = (value: Date): void => {
        updateInputDate((draft) => {
            draft.date = value
        })
    }

    // Отправка запроса к серверу
    const handleSubmit = () => {
    }

    return (
        <>
            <div className="modal">
                <MainLayout
                    headline="Создание ВЗН (Расход)"
                    showCloseButton={true}
                    hasBorder={true}
                    isBlueBackground={false}
                >
                    <form className="create_form" action="">
                        <div className="create_form__inner">
                            <Input
                                type="text"
                                name="vzn-number"
                                title="№ ВЗН*"
                                placeholder=""
                                inputValue ={inputVznNumber.value}
                                updateValue={handleInputVznNumber}
                                validateValue={inputVznNumber.errorField}
                                isNull={inputVznNumber.isNull}
                                textError="целое положительное число до 20 знаков"
                            />

                            <SelectInput
                                type="text"
                                name="sender"
                                title="Отправитель"
                                placeholder="Цех 01"
                                inputValue ={inputSender.value}
                                updateValue={handleInputSender}
                                validateValue={inputSender.errorField}
                                isNull={inputSender.isNull}
                                textError="строка до 50 символов"
                            />

                            <SelectInput
                                type="text"
                                name="recipient"
                                title="Получатель"
                                placeholder="Цех 02"
                                inputValue ={inputRecipient.value}
                                updateValue={handleInputRecipient}
                                validateValue={inputRecipient.errorField}
                                isNull={inputRecipient.isNull}
                                textError="строка до 50 символов"
                            />

                            <SelectInput
                                type="text"
                                name="recipient"
                                title="Выдал МОЛ*"
                                placeholder="Иванов И. И."
                                inputValue ={inputRecipient.value}
                                updateValue={handleInputRecipient}
                                validateValue={inputRecipient.errorField}
                                isNull={inputRecipient.isNull}
                                textError="строка до 50 символов"
                            />

                            <div>DatePicker</div>

                            <SelectInput
                                type="text"
                                name="recipient"
                                title="Принял МОЛ"
                                placeholder="Иванов И. И."
                                inputValue ={inputRecipient.value}
                                updateValue={handleInputRecipient}
                                validateValue={inputRecipient.errorField}
                                isNull={inputRecipient.isNull}
                                textError="строка до 50 символов"
                            />

                            <div>DatePicker</div>

                            <div>TextField</div>
                        </div>

                        <div className="create_form__btns">
                            <Button
                                type="button"
                                classBtn=""
                                text="Создать"
                                onClickBtn={handleSubmit}
                            />

                            <Button
                              type="button"
                              classBtn="close_btn"
                              text="Отмена"
                            />

                        </div>
                    </form>
                </MainLayout>
            </div>
        </>
    )
}

export default CreateVznConsumption
