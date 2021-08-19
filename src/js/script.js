// Подключение по указанному url и получение ответа
const getData = async url => {
  const response = await fetch(url)
  const data = await response.json()
  return data
}

// Получение данных
getData('https://script.google.com/macros/s/AKfycbwnuav41ZzVpZhfNhu8jUJgVvMHf2Mm5svbxZ1ByyPBTwFFE2iPRG9mSZPHYjcwMED6GQ/exec')
  .then(data => {
      // Проверка данных
      console.log(data)
      // Инициализация данных
      var list_of_products = data[0];
      var list_of_boxes = data[1];
      console.log(list_of_products);
      select_filling(list_of_products,list_of_boxes)

      
  })

function select_filling (list_of_products,list_of_boxes) {
  for(var i = 0; i<list_of_products.length; i++) {
    var select = document.querySelector(".boxCalculator__select").querySelector("select");
    let newOption = new Option(list_of_products[i].name, list_of_products[i].id);
    select.append(newOption);

  }

  select.addEventListener("change", function() {
    if(this.value != "not_selected") {
      for(let i =0; i<select.length; i++){
        if(this.value == list_of_products[i].id) {
          var product = list_of_products[i];
          var box = getBox(product.id_box,list_of_boxes);
          break;    
        }
      }
       
    var elem = document.querySelector(".boxCalculator__box");
    elem.innerHTML = "Габариты коробки: " + box.profile + "\n" + "Количество изделий в коробке: " + product.quantity + ".";
    elem.style.display = "block";

    } else     {
      var elem = document.querySelector(".boxCalculator__box");
      elem.style.display = "none";
    }

   


  })
function getBox(id_box,list_of_boxes){
  for(let j = 0; j<list_of_boxes.length; j++) {
    if(id_box == list_of_boxes[j].id) {
      var box = list_of_boxes[j];
      break;
    }
  }
  return box;
}

}
 