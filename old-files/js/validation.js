let form = document.getElementById('form')
let fields = form.querySelectorAll('.field')
let numberInputField = document.getElementById("vzn-number");
let senderInputField = document.getElementById("sender");
let recipientInputField = document.getElementById("recipient");
let periodInputField = document.getElementById("period");


/* функция добавления поля валидации и стилей */
function addStylesError(tagName, message) {
  let error = document.createElement('div')
  error.className = 'error'
  error.textContent = message
  tagName.after(error)
  tagName.classList.add('error-border')
}

/* функция удаления поля валидации и стилей */
function deleteStylesError(tagName) {
  if (tagName.parentNode.querySelector('.error')) {
    tagName.parentNode.querySelector('.error').remove()
    tagName.classList.remove('error-border')
  }
}

try {

  /* событие отправки формы */
  form.addEventListener('submit', function (event) {
    event.preventDefault()

    /* валидация при пустых полях */
    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].value) {
        addStylesError(fields[i], 'Поле ввода не должно быть пустым')
      }
    }

    let periodInputValue = periodInputField.value
    let separatorPeriod = ' - ';
    let arrayPeriod = periodInputValue.split(separatorPeriod);

    /* валидация при не соответствии формата даты */
    if (arrayPeriod.length == 2) {
      let arrayStartDate = arrayPeriod[0].split(".");
      let arrayEndDate = arrayPeriod[1].split(".");
      let arrayStartMonth = arrayStartDate[1] - 1;
      let arrayEndMonth = arrayEndDate[1] - 1;
      let d1 = new Date(arrayStartDate[2], arrayStartMonth, arrayStartDate[0]);
      let d2 = new Date(arrayEndDate[2], arrayEndMonth, arrayEndDate[0]);

      if ((d1.getFullYear() == arrayStartDate[2])
        && (d1.getMonth() == arrayStartMonth)
        && (d1.getDate() == arrayStartDate[0])
        && (arrayStartDate[2].length == 4)
        && (arrayStartDate[1].length == 2)
        && (arrayStartDate[0].length == 2)
        && (d2.getFullYear() == arrayEndDate[2])
        && (d2.getMonth() == arrayEndMonth)
        && (d2.getDate() == arrayEndDate[0])
        && (arrayEndDate[2].length == 4)
        && (arrayEndDate[1].length == 2)
        && (arrayEndDate[0].length == 2)) {

        deleteStylesError(periodInputField)

      } else {
        addStylesError(periodInputField, 'диапазон дат в формате "dd.mm.yyyy - dd.mm.yyyy"')
      }
    } else if (!periodInputField.value) {
      addStylesError(periodInputField, 'Поле ввода не должно быть пустым')
    } else {
      addStylesError(periodInputField, 'диапазон дат в формате "dd.mm.yyyy - dd.mm.yyyy"')
    }
  })
} catch (e) {
  console.log(e.message)
}

/* валидация поля Номер ВЗН */
numberInputField.addEventListener("keyup", function (event) {
  event.preventDefault()

  let inputValue = numberInputField.value

  deleteStylesError(numberInputField)

  if (Number(inputValue) < 0
    || !Number.isInteger(Number(inputValue))
    || inputValue.length > 20
    || inputValue !== inputValue.replace(/[^\d]/g, "")) {

    addStylesError(numberInputField, 'целое положительное число до 20 знаков')
  }
});

/* валидация поля Отправитель */
senderInputField.addEventListener("keyup", function (event) {
  event.preventDefault()

  let inputValue = senderInputField.value

  deleteStylesError(senderInputField)

  if (inputValue.length >= 50) {
    addStylesError(senderInputField, 'строка до 50 символов')
  }
});

/* валидация поля Получатель */
recipientInputField.addEventListener("keyup", function (event) {
  event.preventDefault()

  let inputValue = recipientInputField.value

  deleteStylesError(recipientInputField)

  if (inputValue.length >= 50) {
    addStylesError(recipientInputField, 'строка до 50 символов')
  }
});

/* удаление стилей валидации пустого поля при вводе данных */
periodInputField.addEventListener("keyup", function (event) {
  event.preventDefault()

  deleteStylesError(periodInputField)
});


