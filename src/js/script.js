const getData = async url => {
  const response = await fetch(url)
  const data = await response.json()
  return data
}

// получаем данные
getData('https://script.google.com/macros/s/AKfycbwnuav41ZzVpZhfNhu8jUJgVvMHf2Mm5svbxZ1ByyPBTwFFE2iPRG9mSZPHYjcwMED6GQ/exec')
  .then( data => {
      // проверяем
      console.log(data[0])
    
  })

 