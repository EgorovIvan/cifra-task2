import Input from "../UI/Inputs/Input.tsx";
import Button from "../UI/Buttons/Button.tsx";
import {useEffect} from "react";
import {useImmer} from "use-immer";
import * as React from "react";
import SelectInput from "../UI/Inputs/SelectInput.tsx";
import './filter.scss'
import MainLayout from "../../layouts/MainLayout.tsx";
import DateRangeInput from "@/components/UI/DateRangeInput/DateRangeInput.tsx";
import {useAuthStore} from "@/stores/useAuthStore.ts";
import {useVznStore} from "@/stores/useVznStore.ts";
import {Filter} from "@/interfaces/Filter.ts";


interface State {
  value: string;
  errorField: boolean;
  isNull: boolean;
}

interface Period {
  value: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  errorField: boolean;
}

const ModalVznList: React.FC = () => {

  const {authToken} = useAuthStore()
  const {fetchVznList} = useVznStore()

  // Фильтры
  const [filters, updateFilters] = useImmer<Filter>({
    Num: "",
    // Sender: "",
    // Recipient: "",
    // Period: ""
  })

  const [inputVznNumber, updateInputVznNumber] = useImmer<State>({
    value: "",
    errorField: false,
    isNull: false,
  });

  const [inputSender, updateInputSender] = useImmer<State>({
    value: "",
    errorField: false,
    isNull: false,
  });

  const [inputRecipient, updateInputRecipient] = useImmer<State>({
    value: "",
    errorField: false,
    isNull: false,
  });

  const [inputPeriod, updateInputPeriod] = useImmer<Period>({
    value: "",
    startDate:  undefined,
    endDate:  undefined,
    errorField: false,
  });


  // Отправка запроса к серверу
  const handleSubmit = () => {
    console.log(filters)
    fetchVznList(authToken, filters)
  }

  /* Отправка формы */
  const handleSearch = (): void => {

    if(!inputVznNumber.value) {
      updateInputVznNumber((draft) => {
        draft.isNull = true
      })
    } else {
      updateInputVznNumber((draft) => {
        draft.isNull = false
      })
    }

    if(!inputSender.value) {
      updateInputSender((draft) => {
        draft.isNull = true
      })
    } else {
      updateInputSender((draft) => {
        draft.isNull = false
      })
    }

    if(!inputRecipient.value) {
      updateInputRecipient((draft) => {
        draft.isNull = true
      })
    } else {
      updateInputRecipient((draft) => {
        draft.isNull = false
      })
    }


    let periodInputValue = inputPeriod.value
    let separatorPeriod = ' - ';
    let arrayPeriod = periodInputValue.split(separatorPeriod);

    /* Валидация при не соответствии формата даты */
    // if (arrayPeriod.length == 2) {
    //
    //   let arrayStartDate = arrayPeriod[0].split(".");
    //   let arrayEndDate = arrayPeriod[1].split(".");
    //   let arrayStartMonth = Number(arrayStartDate[1]) - 1;
    //   let arrayEndMonth = Number(arrayEndDate[1]) - 1;
    //   let d1 = new Date(Number(arrayStartDate[2]), arrayStartMonth, Number(arrayStartDate[0]));
    //   let d2 = new Date(Number(arrayEndDate[2]), arrayEndMonth, Number(arrayEndDate[0]));
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

  }, [inputVznNumber.value, inputSender.value, inputRecipient.value]);

  return (
      <>
        <div className="modal" id="filter">
          <MainLayout
              headline="Фильтр ВЗН УП"
              showCloseButton={true}
              hasBorder={true}
          >

            <form className="filter__form" action="" id="form">

              <Input
                  type="text"
                  name="vzn-number"
                  title="Номер ВЗН"
                  placeholder="ВЗН №7063041"
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

              <DateRangeInput
                  name="date-picker"
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
                    classBtn=""
                    text="Поиск"
                    onClickBtn={handleSubmit}
                    // onClickBtn={handleSearch}
                />

                {/*<Button*/}
                {/*  type="button"*/}
                {/*  classBtn="close_btn"*/}
                {/*  text="Отмена"*/}
                {/*  onClickBtn={handleCloseModals}*/}
                {/*/>*/}

              </div>
            </form>
          </MainLayout>
        </div>
      </>
  )
}

export default ModalVznList
