import Input from "../UI/Inputs/Input.tsx";
import Button from "../UI/Buttons/Button.tsx";
import {useEffect} from "react";
import {useImmer} from "use-immer";
import * as React from "react";
import SelectInput from "../UI/Inputs/SelectInput.tsx";
import './filter.scss'
import MainLayout from "../../layouts/MainLayout.tsx";

interface Props {
  handleOpenModalVznList: () => void;
  handleCloseModalFilter: () => void;
  handleCloseModals: () => void;
}

interface State {
  value: string;
  errorField: boolean;
  isNull: boolean;
  newClass: string;
}

const ModalVznList: React.FC<Props> = ({handleOpenModalVznList, handleCloseModalFilter, handleCloseModals}: Props) => {

  const [inputVznNumber, updateInputVznNumber] = useImmer<State>({
    value: "",
    errorField: false,
    isNull: false,
    newClass: 'field'
  });

  const [inputSender, updateInputSender] = useImmer<State>({
    value: "",
    errorField: false,
    isNull: false,
    newClass: 'field'
  });

  const [inputRecipient, updateInputRecipient] = useImmer<State>({
    value: "",
    errorField: false,
    isNull: false,
    newClass: 'field'
  });

  const [inputPeriod, updateInputPeriod] = useImmer<State>({
    value: "",
    errorField: false,
    isNull: false,
    newClass: ''
  });

  /* Отправка формы */
  const handleSearch = (): void => {
    if(!inputVznNumber.value) {
      updateInputVznNumber((draft) => {
        draft.isNull = true
        draft.newClass = draft.newClass.concat(" error_border")
      })
    } else {
      updateInputVznNumber((draft) => {
        draft.isNull = false
        draft.newClass = draft.newClass.replace(/error_border/g, '')
      })
    }

    if(!inputSender.value) {
      updateInputSender((draft) => {
        draft.isNull = true
        draft.newClass = draft.newClass.concat(" error_border")
      })

    } else {
      updateInputSender((draft) => {
        draft.isNull = false
        draft.newClass = draft.newClass.replace(/error_border/g, '')
      })
    }

    if(!inputRecipient.value) {
      updateInputRecipient((draft) => {
        draft.isNull = true
        draft.newClass = draft.newClass.concat(" error_border")
      })

    } else {
      updateInputRecipient((draft) => {
        draft.isNull = false
        draft.newClass = draft.newClass.replace(/error_border/g, '')
      })
    }

    if(!inputPeriod.value) {
      updateInputPeriod((draft) => {
        draft.isNull = true
        draft.newClass = draft.newClass.concat(" error_border")
      })

    } else {
      updateInputPeriod((draft) => {
        draft.isNull = false
        draft.newClass = draft.newClass.replace(/error_border/g, '')
      })
    }

    let periodInputValue = inputPeriod.value
    let separatorPeriod = ' - ';
    let arrayPeriod = periodInputValue.split(separatorPeriod);

    /* Валидация при не соответствии формата даты */
    if (arrayPeriod.length == 2) {

      let arrayStartDate = arrayPeriod[0].split(".");
      let arrayEndDate = arrayPeriod[1].split(".");
      let arrayStartMonth = Number(arrayStartDate[1]) - 1;
      let arrayEndMonth = Number(arrayEndDate[1]) - 1;
      let d1 = new Date(Number(arrayStartDate[2]), arrayStartMonth, Number(arrayStartDate[0]));
      let d2 = new Date(Number(arrayEndDate[2]), arrayEndMonth, Number(arrayEndDate[0]));

      if ((d1.getFullYear() == Number(arrayStartDate[2]))
        && (d1.getMonth() == arrayStartMonth)
        && (d1.getDate() == Number(arrayStartDate[0]))
        && (arrayStartDate[2].length == 4)
        && (arrayStartDate[1].length == 2)
        && (arrayStartDate[0].length == 2)
        && (d2.getFullYear() == Number(arrayEndDate[2]))
        && (d2.getMonth() == arrayEndMonth)
        && (d2.getDate() == Number(arrayEndDate[0]))
        && (arrayEndDate[2].length == 4)
        && (arrayEndDate[1].length == 2)
        && (arrayEndDate[0].length == 2)) {

        updateInputPeriod((draft) => {
          draft.errorField = false
          draft.isNull = false
          draft.newClass = draft.newClass.replace(/error_border/g, '')
        })
      } else {
        updateInputPeriod((draft) => {
          draft.errorField = true
          draft.isNull = false
          draft.newClass = draft.newClass.concat(" error_border")
        })
      }

    } else if(inputPeriod.value) {
      updateInputPeriod((draft) => {
        draft.errorField = true
        draft.isNull = false
        draft.newClass = draft.newClass.concat(" error_border")
      })
    }
  }

  const handleInputVznNumber = (vznNumber: string): void => {
    updateInputVznNumber((draft) => {
      draft.value = vznNumber
    })
  }

  const handleInputPeriod = (period: string): void => {
    updateInputPeriod((draft) => {
      draft.value = period
    })
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
        draft.newClass = draft.newClass.concat(" error_border")
      })
    } else {
      updateInputVznNumber((draft) => {
        draft.errorField = false
        draft.isNull = false
        draft.newClass = draft.newClass.replace(/error_border/g, '')
      })
    }

    /* Валидация поля Отправитель */
    if (inputSender.value.length >= 50) {
      updateInputSender((draft) => {
        draft.errorField = true
        draft.isNull = false
        draft.newClass = draft.newClass.concat(" error_border")
      })
    } else {
      updateInputSender((draft) => {
        draft.errorField = false
        draft.isNull = false
        draft.newClass = draft.newClass.replace(/error_border/g, '')
      })
    }

    /* Валидация поля Получатель */
    if (inputRecipient.value.length >= 50) {
      updateInputRecipient((draft) => {
        draft.errorField = true
        draft.isNull = false
        draft.newClass = draft.newClass.concat(" error_border")
      })
    } else {
      updateInputRecipient((draft) => {
        draft.errorField = false
        draft.isNull = false
        draft.newClass = draft.newClass.replace(/error_border/g, '')
      })
    }

  }, [inputVznNumber.value, inputSender.value, inputRecipient.value]);

  return (
    <>
      <div className="modal" id="filter">
          <MainLayout
            headline="Фильтр ВЗН УП"
            showCloseButton={true}
            hasBorder={true}
            onCloseButtonClick={handleCloseModalFilter}
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
              addClass={inputSender.newClass}
              inputValue ={inputSender.value}
              updateValue={updateInputSender}
              validateValue={inputSender.errorField}
              isNull={inputSender.isNull}
              textError="строка до 50 символов"
            />

            <SelectInput
              type="text"
              name="recipient"
              title="Получатель"
              placeholder="Цех 02"
              addClass={inputRecipient.newClass}
              inputValue ={inputRecipient.value}
              updateValue={updateInputRecipient}
              validateValue={inputRecipient.errorField}
              isNull={inputRecipient.isNull}
              textError="строка до 50 символов"
            />

            <Input
              type="text"
              name="period"
              title="Дата принятия (период)"
              placeholder="01.01.2020 - 01.01.2024"
              inputValue ={inputPeriod.value}
              updateValue={handleInputPeriod}
              validateValue={inputPeriod.errorField}
              isNull={inputPeriod.isNull}
              textError='диапазон дат в формате "dd.mm.yyyy - dd.mm.yyyy"'
            />

            <div className="filter__form_btns">
              <Button
                type="button"
                classBtn=""
                text="Поиск"
                onClickBtn={handleOpenModalVznList}
              />

              <Button
                type="button"
                classBtn="close_btn"
                text="Отмена"
                onClickBtn={handleCloseModals}
              />

            </div>
          </form>
          </MainLayout>
      </div>
    </>
  )
}

export default ModalVznList
