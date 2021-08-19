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
      var box_profile = [];
      var box_profileSum = "";
      var ext_box = [];
      var box_ext_profile = [];
      var box_ext_profileSum = [];

      for(let j=0; j<box.length; j++){
        if(box[j].flag == "Да"){
          ext_box[j] = getBox(box[j].ext_id,list_of_boxes);
        }
        box_ext_profile[j] = [];
        box_ext_profileSum[j] = "<br>"+ "Возможно комплектовать в другие коробки:" + "<br>";
        for(let i=0; i<ext_box[j].length; i++){
          let number = i+1;
          box_ext_profile[j][i] = "Габариты " + number + "-й внешней коробки: " + ext_box[j][i].profile + " - " + 
          "Количество изделий в коробке: " + box[j].quantity.split(";")[i];
          if(i!=ext_box[j].length-1){        
            box_ext_profile[j][i] = box_ext_profile[j][i] + "<br>";
          }
          box_ext_profileSum[j] = box_ext_profileSum[j] + box_ext_profile[j][i];
        }

        let number = j+1;
        box_profile[j] = "Габариты " + number + "-й коробки: " + box[j].profile + " - " + 
        "Количество изделий в коробке: " + product.quantity.split(";")[j] + box_ext_profileSum[j];
        if(j!=box.length-1){        
          box_profile[j] = box_profile[j] + "<br>";
        }
        box_profileSum = box_profileSum + box_profile[j];
      }
       

    document.querySelector(".boxCalculator__boxProfile").innerHTML = box_profileSum;
        
    elem.style.display = "block";

    } else     {
      var elem = document.querySelector(".boxCalculator__box");
      elem.style.display = "none";
    }

   


  })
function getBox(id_box,list_of_boxes){

  var arr = id_box.split(";");
  var box=[];
  for(let j = 0; j<list_of_boxes.length; j++) {
    for(let i=0; i<arr.length; i++){
      if(arr[i] == list_of_boxes[j].id) {                
        box[i] = list_of_boxes[j];        
      }
    }
  }
  return box;
}

}
 