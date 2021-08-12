const getData = async url => {
  const response = await fetch(url)
  const data = await response.json()
  return data
}

// получаем данные
getData('list_of_boxes.json')
  .then(data => {
      // проверяем
      console.table(data)
      
      // передаем данные функции создания теста
      createTest(data)
  })