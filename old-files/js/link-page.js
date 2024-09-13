
let linkToMenu = document.getElementById('link-menu');
let linkTasks = document.getElementById('link-tasks');
let linkAccounting = document.getElementById('link-accounting');
let linkSettings = document.getElementById('link-settings');

let urlToMenuPage = ''
let urlToOtherPage = ''

/* установка относительных путей */
if (document.title === 'Меню') {
  urlToMenuPage = './'
  urlToOtherPage = 'pages/'
} else {
  urlToMenuPage = '../'
  urlToOtherPage = './'
}

/* функция клика на ссылку */
function clickProcessing(buttonTag, urlPage) {
  try {
    if (buttonTag) {
      buttonTag.addEventListener('click', function () {
        window.open(urlPage, "_self");
      })
    }
  } catch (e) {
    const err = new Error('Ссылка не работает')
    console.log(err.message)
  }
}

/* переход на страницу Меню */
clickProcessing(linkToMenu, `${urlToMenuPage}index.html`)

/* переход на страницу Задачи */
clickProcessing(linkTasks, `${urlToOtherPage}tasks.html`)

/* переход на страницу Учёт в производстве */
clickProcessing(linkAccounting, `${urlToOtherPage}accounting.html`)

/* переход на страницу Настройки */
clickProcessing(linkSettings, `${urlToOtherPage}settings.html`)








