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
import {FilterProps} from "@/interfaces/FilterProps.ts";
import {useModalStore} from "@/stores/useModalStore.ts";
import {InputState} from "@/interfaces/InputState.ts";
import Header from "@/components/Header/Header.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import {useNavigate} from "react-router-dom";
import Modal from "../UI/Modal/Modal.tsx";
import DivisionsList from "../DivisionsList/DivisionsList.tsx";

export enum DivisionInputType {
    SENDER = 'sender',
    RECIPIENT = 'recipient'
}

interface Period {
    value: string;
    startDate?: Date;
    endDate?: Date;
    errorField: boolean;
}

const Filter: React.FC = () => {

    const navigate = useNavigate();

    const {authToken} = useAuthStore()
    const {fetchVznList} = useVznListStore()
    const {openResultsModal, closeFilterModal, isDivisionsModalOpen, openDivisionsModal, closeDivisionsModal, divisionInputType} = useModalStore();

    // Фильтры
    const [filters, updateFilters] = useImmer<FilterProps>({
        Num: "",
        // Sender: "",
        // Recipient: "",
        // Period: ""
    })

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

    const [inputPeriod, updateInputPeriod] = useImmer<Period>({
        value: "",
        startDate: undefined,
        endDate: undefined,
        errorField: false,
    });


    // Отправка запроса к серверу
    const handleSubmit = () => {
        fetchVznList(authToken, filters);
        closeFilterModal();
        navigate("/vzn-expense");
        openResultsModal();
    }

    const handleCloseModal = () => {
        closeFilterModal();
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

        if (!inputRecipient.value) {
            updateInputRecipient((draft) => {
                draft.isNull = true
            })
        } else {
            updateInputRecipient((draft) => {
                draft.isNull = false
            })
        }


        const periodInputValue = inputPeriod.value
        const separatorPeriod = ' - ';
        const arrayPeriod = periodInputValue.split(separatorPeriod);

        /* Валидация при не соответствии формата даты */
        // if (arrayPeriod.length == 2) {
        //
        //   const arrayStartDate = arrayPeriod[0].split(".");
        //   const arrayEndDate = arrayPeriod[1].split(".");
        //   const arrayStartMonth = Number(arrayStartDate[1]) - 1;
        //   const arrayEndMonth = Number(arrayEndDate[1]) - 1;
        //   const d1 = new Date(Number(arrayStartDate[2]), arrayStartMonth, Number(arrayStartDate[0]));
        //   const d2 = new Date(Number(arrayEndDate[2]), arrayEndMonth, Number(arrayEndDate[0]));
        //
        //   if ((d1.getFullYear() == Number(arrayStartDate[2]))
        //     && (d1.getMonth() == arrayStartMonth)
        //     && (d1.getDate() == Number(arrayStartDate[0]))
        //     && (arrayStartDate[2].length == 4)
        //     && (arrayStartDate[1].length == 2)
        //     && (arrayStartDate[0].length == 2)
        //     && (d2.getFullYear() == Number(arrayEndDate[2]))
        //     && (d2.getMonth() == arrayEndMonth)
        //     && (d2.getDate() == Number(arrayEndDate[0]))
        //     && (arrayEndDate[2].length == 4)
        //     && (arrayEndDate[1].length == 2)
        //     && (arrayEndDate[0].length == 2)) {
        //
        //     updateInputPeriod((draft) => {
        //       draft.errorField = false
        //       draft.isNull = false
        //     })
        //   } else {
        //     updateInputPeriod((draft) => {
        //       draft.errorField = true
        //       draft.isNull = false
        //     })
        //   }
        //
        // } else if(inputPeriod.value) {
        //   updateInputPeriod((draft) => {
        //     draft.errorField = true
        //     draft.isNull = false
        //   })
        // }
    }

    // Ввод данных в поле "Номер ВЗН"
    const handleInputVznNumber = (value: string): void => {
        updateInputVznNumber((draft) => {
            draft.value = value
        })
        updateFilters((draft) => {
            draft.Num = value + '%'
        })
    }

    // Ввод данных в поле "Отправитель"
    const handleInputSender = (value: string): void => {
        updateInputSender((draft) => {
            draft.value = value
        })

        // updateFilters((draft) => {
        //   draft.Sender = value
        // })
    }

    // Ввод данных в поле "Получатель"
    const handleInputRecipient = (value: string): void => {
        updateInputRecipient((draft) => {
            draft.value = value
        })

        // updateFilters((draft) => {
        //   draft.Recipient = value
        // })
    }

    // Ввод данных в поле "Дата принятия"
    const handleInputStartDate = (value: Date): void => {
        updateInputPeriod((draft) => {
            draft.startDate = value
        })

        // updateFilters((draft) => {
        //   draft.Period = value
        // })
    }

    // Ввод данных в поле "Дата принятия"
    const handleInputEndDate = (value: Date): void => {
        updateInputPeriod((draft) => {
            draft.endDate = value
        })

        // updateFilters((draft) => {
        //   draft.Period = value
        // })
    }

    useEffect(() => {

        /* Валидация поля Номер ВЗН */
        if (Number(inputVznNumber.value) < 0
            || !Number.isInteger(Number(inputVznNumber.value))
            || inputVznNumber.value.length > 20
            || inputVznNumber.value !== inputVznNumber.value.replace(/[^\d]/g, "")) {

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

        /* Валидация поля Отправитель */
        if (inputSender.value.length >= 50) {
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

        /* Валидация поля Получатель */
        if (inputRecipient.value.length >= 50) {
            updateInputRecipient((draft) => {
                draft.errorField = true
                draft.isNull = false
            })
        } else {
            updateInputRecipient((draft) => {
                draft.errorField = false
                draft.isNull = false
            })
        }

        console.log(inputSender.value)

    }, [inputVznNumber.value, inputSender.value, inputRecipient.value, updateInputVznNumber, updateInputSender, updateInputRecipient]);

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
                            textError="строка до 50 символов"
                            onFolderIconClick={() => openDivisionsModal(DivisionInputType.SENDER)}
                        />

                        <SelectInput
                            type="text"
                            name="recipient"
                            title="Получатель"
                            placeholder="Цех 02"
                            inputValue={inputRecipient.value}
                            updateValue={handleInputRecipient}
                            validateValue={inputRecipient.errorField}
                            isNull={false}
                            textError="строка до 50 символов"
                            onFolderIconClick={() => openDivisionsModal(DivisionInputType.RECIPIENT)}
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
                                // onClickBtn={handleSearch}
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
                        onSelectValue={divisionInputType === DivisionInputType.RECIPIENT ? handleInputRecipient : handleInputSender }
                    />
                </Modal>
            </div>
        </>
    )
}

export default Filter
