// let consumptionBtn = document.getElementById('consumption-btn')
// let consumption = document.getElementById('consumption')
// let filterBtn = document.getElementById('filter-btn')
// let filter = document.getElementById('filter')
// let closeFilter = document.getElementById('close-filter')
// let cancelFilter = document.getElementById('cancel-filter')
//
// try {
//   /* открытие модального окна ВЗН УП (Расход) */
//   consumptionBtn.addEventListener('click', (event) => {
//     event.preventDefault()
//
//     consumption.style.zIndex = '10'
//     consumption.style.opacity = '1'
//     console.log('test')
//   })
//
//   /* открытие модального окна Фильтр ВЗН УП */
//   filterBtn.addEventListener('click', (event) => {
//     event.preventDefault()
//
//     filter.style.zIndex = '10'
//     filter.style.opacity = '1'
//   })
//
//   /* закрытие модального окна Фильтр ВЗН УП */
//   closeFilter.addEventListener('click', (event) => {
//     event.preventDefault()
//
//     filter.style.opacity = '0'
//     setTimeout(() => {
//       filter.style.zIndex = '-1'
//     }, 2000)
//   })
//
//   /* закрытие модального окна Фильтр ВЗН УП при нажатии на кнопку Отмена */
//   cancelFilter.addEventListener('click', (event) => {
//     event.preventDefault()
//
//     filter.style.opacity = '0'
//     setTimeout(() => {
//       filter.style.zIndex = '-1'
//     }, 2000)
//   })
// } catch (e) {
//   console.log(e.message)
// }
//
