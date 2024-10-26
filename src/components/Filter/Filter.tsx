import * as React from "react";
import {useEffect} from "react";
import {useImmer} from "use-immer";
import './filter.scss'
import Input from "../UI/Inputs/Input.tsx";
import Button from "../UI/Buttons/Button.tsx";
import SelectInput from "../UI/Inputs/SelectInput.tsx";
import DateRangeInput from "@/components/UI/DateRangeInput/DateRangeInput.tsx";
import {useAuthStore} from "@/stores/useAuthStore.ts";
import {useVznListStore} from "@/stores/useVznListStore.ts";
import {useModalStore} from "@/stores/useModalStore.ts";
import {InputState} from "@/interfaces/InputState.ts";
import Header from "@/components/Header/Header.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import {useNavigate} from "react-router-dom";
import Modal from "../UI/Modal/Modal.tsx";
import DivisionsList from "../DivisionsList/DivisionsList.tsx";
import {DivisionInputType} from "@/enum/DivisionInputType.ts";


interface Period {
    value?: string;
    startDate: Date | null | undefined;
    endDate: Date | null | undefined;
    errorField: boolean;
}

const Filter: React.FC = () => {

    const navigate = useNavigate();

    const {authToken} = useAuthStore()
    const {updateFilters, fetchVznList} = useVznListStore()
    const {
        openResultsModal,
        closeFilterModal,
        isDivisionsModalOpen,
        openDivisionsModal,
        closeDivisionsModal,
        divisionInputType
    } = useModalStore();

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

    const [inputPeriod, updateInputPeriod] = useImmer<Period>({
        value: "",
        startDate: null,
        endDate: null,
        errorField: false,
    });

    // Ввод данных в поле "Номер ВЗН"
    const handleInputVznNumber = (value?: string): void => {
        updateInputVznNumber((draft) => {
            draft.value = value
        })
        updateFilters({ 'Num': `${value}%` });
    }

    // Ввод данных в поле "Отправитель"
    const handleInputSender = (value?: string): void => {
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
        updateFilters({ 'Sender': code });
    }

    // Ввод данных в поле "Получатель"
    const handleInputReceiver = (value?: string): void => {
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
        updateFilters({ 'Receiver': code });
    }

    // Ввод данных в поле "Дата от"
    const handleInputStartDate = (value: | null | undefined): void => {
        updateInputPeriod((draft) => {
            draft.startDate = value
        })
        updateFilters({ 'fromDate': String(value) });
    }

    // Ввод данных в поле "Дата до"
    const handleInputEndDate = (value: Date | null | undefined): void => {
        updateInputPeriod((draft) => {
            draft.endDate = value
        })
        updateFilters({ 'toDate': String(value) });
    }

    // Отправка запроса к серверу
    const handleSubmit = () => {
        fetchVznList(authToken);
        closeFilterModal();
        navigate("/vzn-list");
        openResultsModal();
    }

    // Закрытие модального окна
    const handleCloseModal = () => {
        closeFilterModal();
    }

    useEffect(() => {

        /* Валидация поля Номер ВЗН */
        if (Number(inputVznNumber.value) < 0
            || !Number.isInteger(Number(inputVznNumber.value))
            || (inputVznNumber.value && inputVznNumber.value?.length > 20)
            || inputVznNumber.value !== inputVznNumber.value?.replace(/[^\d]/g, "")) {

            updateInputVznNumber((draft) => {
                draft.errorField = true
                draft.isNull = false
            })
        } else {
            updateInputVznNumber((draft) => {
                draft.errorField = false
                draft.isNull = false
            })
        }

    }, [inputVznNumber.value, updateInputVznNumber]);

    useEffect(() => {

        /* Валидация поля Отправитель */
        if (inputSender.value && inputSender.value?.length >= 5) {
            updateInputSender((draft) => {
                draft.errorField = true
                draft.isNull = false
            })
        } else {
            updateInputSender((draft) => {
                draft.errorField = false
                draft.isNull = false
            })
        }

    }, [inputSender.value, updateInputSender]);

    useEffect(() => {

        /* Валидация поля Получатель */
        if (inputReceiver.value && inputReceiver.value?.length >= 5) {
            updateInputReceiver((draft) => {
                draft.errorField = true
                draft.isNull = false
            })
        } else {
            updateInputReceiver((draft) => {
                draft.errorField = false
                draft.isNull = false
            })
        }

    }, [inputReceiver.value, updateInputReceiver]);

    return (
        <>
            <div className="modal" id="filter">
                <Header
                    headline="Фильтр ВЗН УП"
                    showCloseButton={true}
                    onCloseButtonClick={handleCloseModal}
                    hasBorder={true}
                />
                <main className={'main'}>
                    <form className="filter__form" action="" id="form">

                        <Input
                            type="text"
                            name="vzn-number"
                            title="Номер ВЗН"
                            placeholder="ВЗН №7063041"
                            inputValue={inputVznNumber.value}
                            updateValue={handleInputVznNumber}
                            validateValue={inputVznNumber.errorField}
                            isNull={false}
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
                            isNull={false}
                            textError="строка до 100 символов"
                            onFolderIconClick={handleOpenSenderFolder}
                        />

                        <SelectInput
                            type="text"
                            name="Receiver"
                            title="Получатель"
                            placeholder="Цех 02"
                            inputValue={inputReceiver.value}
                            updateValue={handleInputReceiver}
                            validateValue={inputReceiver.errorField}
                            isNull={false}
                            textError="строка до 100 символов"
                            onFolderIconClick={handleOpenReceiverFolder}
                        />

                        <DateRangeInput
                            name="datepicker-range"
                            title="Дата принятия (период)"
                            placeholder="Выберите диапазон дат"
                            startDate={inputPeriod.startDate}
                            endDate={inputPeriod.endDate}
                            setStartDate={handleInputStartDate}
                            setEndDate={handleInputEndDate}
                            validateValue={inputPeriod.errorField}
                            textError="некорректный формат"
                        />

                        <div className="filter__form_btns">
                            <Button
                                type="button"
                                classBtn="btn"
                                text="Поиск"
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
                <Modal isOpen={isDivisionsModalOpen} onClose={closeDivisionsModal}>
                    <DivisionsList
                        onSelectValue={divisionInputType === DivisionInputType.RECEIVER ? handleInputReceiver : handleInputSender}
                        onSelectCode={divisionInputType === DivisionInputType.RECEIVER ? handleCodeReceiver : handleCodeSender}
                    />
                </Modal>
            </div>
        </>
    )
}

export default Filter
