import * as React from "react";
import Input from "@/components/UI/Inputs/Input.tsx";
import {useImmer} from "use-immer";
import {InputState} from "@/interfaces/InputState.ts";
import SelectInput from "@/components/UI/Inputs/SelectInput.tsx";
import Button from "@/components/UI/Buttons/Button.tsx";
import './create_form.scss'
import '@/components/UI/DateRangeInput/datepicker_container.scss'
import DateInput from "@/components/UI/DateInput/DateInput.tsx";
import {useModalStore} from "@/stores/useModalStore.ts";
import Header from "@/components/Header/Header.tsx";
import Footer from "@/components/Footer/Footer.tsx";

interface InputDate {
    date: Date | undefined,
    isNull: boolean,
    errorField: boolean,
}

const CreateVznConsumption: React.FC = () => {

    const {closeCreateVznModal} = useModalStore()

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

    const [inputDateIssue, updateInputDateIssue] = useImmer<InputDate>({
        date: undefined,
        isNull: false,
        errorField: false,
    });

    const [inputDateAdoption, updateInputDateAdoption] = useImmer<InputDate>({
        date: undefined,
        isNull: false,
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

    // Ввод данных в поле "Дата выдачи"
    const handleInputDateIssue = (value: Date): void => {
        updateInputDateIssue((draft) => {
            draft.date = value
        })
    }

    // Ввод данных в поле "Дата принятия"
    const handleInputDateAdoption = (value: Date): void => {
        updateInputDateAdoption((draft) => {
            draft.date = value
        })
    }

    // Отправка запроса к серверу
    const handleSubmit = () => {
        closeCreateVznModal()
    }

    // Закрытие модального окна
    const handleCloseModal = () => {
        closeCreateVznModal()
    }

    return (
        <>
            <div className="modal">
                <Header
                    headline="Создание ВЗН (Расход)"
                    showCloseButton={true}
                    onCloseButtonClick={handleCloseModal}
                    hasBorder={true}
                    isBlueBackground={false}
                />
                <main className={'main'}>
                    <form className="create_form" action="">
                        <div className="create_form__inner">
                            <Input
                                type="text"
                                name="vzn-number"
                                title="№ ВЗН*"
                                placeholder=""
                                inputValue={inputVznNumber.value}
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
                                inputValue={inputSender.value}
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
                                inputValue={inputRecipient.value}
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
                                inputValue={inputRecipient.value}
                                updateValue={handleInputRecipient}
                                validateValue={inputRecipient.errorField}
                                isNull={inputRecipient.isNull}
                                textError="строка до 50 символов"
                            />

                            <DateInput
                                name="datepicker-issue"
                                title="Дата выдачи*"
                                placeholder="15.06.2024"
                                date={inputDateIssue.date}
                                setDateChange={handleInputDateIssue}
                                validateValue={inputDateIssue.errorField}
                                isNull={inputDateIssue.isNull}
                                textError="некорректный формат"
                            />

                            <SelectInput
                                type="text"
                                name="recipient"
                                title="Принял МОЛ"
                                placeholder="Иванов И. И."
                                inputValue={inputRecipient.value}
                                updateValue={handleInputRecipient}
                                validateValue={inputRecipient.errorField}
                                isNull={inputDateAdoption.isNull}
                                textError="строка до 50 символов"
                            />

                            <DateInput
                                name="datepicker-issue"
                                title="Дата выдачи*"
                                placeholder=""
                                date={inputDateAdoption.date}
                                setDateChange={handleInputDateAdoption}
                                validateValue={inputDateAdoption.errorField}
                                isNull={inputRecipient.isNull}
                                textError="некорректный формат"
                            />

                            <div>TextField</div>
                        </div>

                        <div className="create_form__btns">
                            <Button
                                type="button"
                                classBtn="btn"
                                text="Создать"
                                onClickBtn={handleSubmit}
                            />

                            <Button
                                type="button"
                                classBtn="btn--white"
                                text="Отмена"
                                onClickBtn={handleCloseModal}
                            />

                        </div>
                    </form>
                </main>
                <Footer/>
            </div>
        </>
    )
}

export default CreateVznConsumption
