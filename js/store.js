let list = document.getElementById('list')
let consumptionBtnStore = document.getElementById('consumption-btn')
let dataVzn = []

consumptionBtnStore.addEventListener('click', (event) => {
  event.preventDefault()

  axios.get('../api/list.json')
    .then( (response) => {
      dataVzn = response.data

      for (const item of dataVzn.list) {

        let li = document.createElement('li')
        let h2 = document.createElement('h2')
        let p1 = document.createElement('p')
        let p2 = document.createElement('p')
        let p3 = document.createElement('p')

        h2.textContent = item.number
        p1.innerHTML = `<span>Отправитель:</span>${item.sender}`
        p2.innerHTML = `<span>Получатель:</span>${item.recipient}`
        p3.innerHTML = `<span>Дата выдачи:</span>${item.date_issue}`

        li.className='list-vzn__block-item'

        li.append(h2)
        li.append(p1)
        li.append(p2)
        li.append(p3)
        list.append(li)
      }

    })
    .catch( (error) => {
      console.log(error.message);
    })
})



