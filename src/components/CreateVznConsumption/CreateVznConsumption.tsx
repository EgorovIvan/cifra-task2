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
import {useCreateVznStore} from "@/stores/useCreateVznStore.ts";
import {useAuthStore} from "@/stores/useAuthStore.ts";
import {DivisionInputType} from "@/enum/DivisionInputType.ts";
import DivisionsList from "@/components/DivisionsList/DivisionsList.tsx";
import Modal from "@/components/UI/Modal/Modal.tsx";

interface InputDate {
    date: Date | undefined,
    isNull: boolean,
    errorField: boolean,
}

const CreateVznConsumption: React.FC = () => {

    const { closeCreateVznModal } = useModalStore()
    const { newVznData, updateNewVznData, createVznItem } = useCreateVznStore()
    const authToken = useAuthStore((state) => state.authToken);
    const {isDivisionsModalOpen, openDivisionsModal, closeDivisionsModal, divisionInputType} = useModalStore();

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

    const [inputReceiver, updateInputReceiver] = useImmer<InputState>({
        value: "",
        errorField: false,
        isNull: false,
    });

    const [inputSenderSection, updateInputSenderSection] = useImmer<InputState>({
        value: "",
        errorField: false,
        isNull: false,
    });

    const [inputReceiverSection, updateInputReceiverSection] = useImmer<InputState>({
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
        updateNewVznData({ 'Num': value });
    }

    // Ввод данных в поле "Отправитель"
    const handleInputSender = (value: string): void => {
        updateInputSender((draft) => {
            draft.value = value
        })
    }

    // Открытие списка Sender
    const handleOpenSenderFolder = (): void => {
        openDivisionsModal(DivisionInputType.SENDER)
    }

    // Получение кода Отправителя
    const handleCodeSender = (code: number): void => {
        updateNewVznData({ 'Sender': code });
    }

    // Ввод данных в поле "Получатель"
    const handleInputReceiver = (value: string): void => {
        updateInputReceiver((draft) => {
            draft.value = value
        })
    }

    // Открытие списка Receiver
    const handleOpenReceiverFolder = (): void => {
        openDivisionsModal(DivisionInputType.RECEIVER)
    }

    // Получение кода Получателя
    const handleCodeReceiver = (code: number): void => {
        updateNewVznData({ 'Receiver': code });
    }

    // Ввод данных в поле "Выдал МОЛ*"
    const handleInputSenderSection = (value: string): void => {
        updateInputSenderSection((draft) => {
            draft.value = value
        })
        updateNewVznData({ 'SenderSection': 3 });
    }

    // Ввод данных в поле "Принял МОЛ"
    const handleInputReceiverSection = (value: string): void => {
        updateInputReceiverSection((draft) => {
            draft.value = value
        })
        updateNewVznData({ 'ReceiverSection': 4 });
    }

    // Ввод данных в поле "Дата выдачи"
    const handleInputDateIssue = (value: Date): void => {
        updateInputDateIssue((draft) => {
            draft.date = value
        })
        updateNewVznData({ 'LeaveMoveDate': String(value) }); // Необходимо откорректировать дату к UTC
    }

    // Ввод данных в поле "Дата принятия"
    const handleInputDateAdoption = (value: Date): void => {
        updateInputDateAdoption((draft) => {
            draft.date = value
        })
        updateNewVznData({ 'ArrivalMoveDate': String(value) }); // Необходимо откорректировать дату к UTC
    }

    // Ввод данных в поле "Примечание"
    const handleInputComment = (value: string): void => {

        updateNewVznData({
            bo: {
                so: {
                    attrs: newVznData.bo.so.attrs.map((attr, i) =>
                        i === 0 ? { ...attr, Value: value } : attr
                    ),
                },
            },
        });
        console.log(newVznData)
    }

    // Отправка запроса к серверу
    const handleSubmit = () => {
        createVznItem(authToken)
        closeCreateVznModal()
    }

    /* Отправка формы */
    const handleSearch = (): void => {

        if (!inputVznNumber.value) {
            updateInputVznNumber((draft) => {
                draft.isNull = true
            })
        } else {
            updateInputVznNumber((draft) => {
                draft.isNull = false
            })
        }

        if (!inputSender.value) {
            updateInputSender((draft) => {
                draft.isNull = true
            })
        } else {
            updateInputSender((draft) => {
                draft.isNull = false
            })
        }

        if (!inputReceiver.value) {
            updateInputReceiver((draft) => {
                draft.isNull = true
            })
        } else {
            updateInputReceiver((draft) => {
                draft.isNull = false
            })
        }

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
                                inputValue={newVznData.Num}
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
                                onFolderIconClick={handleOpenSenderFolder}
                            />

                            <SelectInput
                                type="text"
                                name="receiver"
                                title="Получатель"
                                placeholder="Цех 02"
                                inputValue={inputReceiver.value}
                                updateValue={handleInputReceiver}
                                validateValue={inputReceiver.errorField}
                                isNull={inputReceiver.isNull}
                                textError="строка до 50 символов"
                                onFolderIconClick={handleOpenReceiverFolder}
                            />

                            <SelectInput
                                type="text"
                                name="sender-section"
                                title="Выдал МОЛ*"
                                placeholder="Иванов И. И."
                                inputValue={inputSenderSection.value}
                                updateValue={handleInputSenderSection}
                                validateValue={inputSenderSection.errorField}
                                isNull={inputSenderSection.isNull}
                                textError="строка до 50 символов"
                                onFolderIconClick={handleOpenReceiverFolder}
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
                                name="receiver-section"
                                title="Принял МОЛ"
                                placeholder="Иванов И. И."
                                inputValue={inputReceiverSection.value}
                                updateValue={handleInputReceiverSection}
                                validateValue={inputReceiverSection.errorField}
                                isNull={inputReceiverSection.isNull}
                                textError="строка до 50 символов"
                                onFolderIconClick={handleOpenReceiverFolder}
                            />

                            <DateInput
                                name="datepicker-issue"
                                title="Дата принятия"
                                placeholder=""
                                date={inputDateAdoption.date}
                                setDateChange={handleInputDateAdoption}
                                validateValue={inputDateAdoption.errorField}
                                isNull={inputDateAdoption.isNull}
                                textError="некорректный формат"
                            />

                            <Input
                                type="text"
                                name="comment"
                                title="Примечание"
                                placeholder=""
                                inputValue={newVznData.bo.so.attrs[0].Value}
                                updateValue={handleInputComment}
                                validateValue={false}
                                isNull={false}
                                textError="строка до 300 символов"
                            />

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
                <Modal isOpen={isDivisionsModalOpen} onClose={closeDivisionsModal} >
                    <DivisionsList
                        onSelectValue={divisionInputType === DivisionInputType.RECEIVER ? handleInputReceiver : handleInputSender }
                        onSelectCode={divisionInputType === DivisionInputType.RECEIVER ? handleCodeReceiver : handleCodeSender}
                        />
                </Modal>
            </div>
        </>
    )
}

export default CreateVznConsumption
