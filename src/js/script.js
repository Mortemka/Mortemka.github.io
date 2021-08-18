// Подключение по указанному url и получение ответа
const getData = async url => {
  const response = await fetch(url)
  const data = await response.json()
  return data
}

// Получение данных
getData('https://script.google.com/macros/s/AKfycbwnuav41ZzVpZhfNhu8jUJgVvMHf2Mm5svbxZ1ByyPBTwFFE2iPRG9mSZPHYjcwMED6GQ/exec')
  .then( data => {
      // Проверка данных
      console.log(data)
      // Инициализация данных
      var list_of_products = data[0];
      var list_of_boxes = data[1];
  })


  
 