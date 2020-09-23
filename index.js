async function fetchData() {
  response = await fetch(
    'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json'
  )
  json = await response.json()
  return json
}

function addToCart(product) {
  var productsStorage = JSON.parse(localStorage.getItem("productsCar"));
  if (productsStorage === null) {
    listProduct = [{...product,qty:1}]
    localStorage.setItem("productsCar", JSON.stringify(listProduct));
  } else {
    var lista = Array.from(JSON.parse(localStorage.getItem("productsCar")));
    var encontrado = lista.find(value => value.name==product.name)
    if(encontrado!= undefined)
    {
      encontrado.qty++;
    }
    else{
     lista.push({...product,qty:1})

    }
   // productsStorage[productsStorage.length] = product
    localStorage.setItem("productsCar", JSON.stringify(lista));
  }
  document.getElementById("numitems").innerText = productsStorage.length
}

async function showCategories() {
  data = await fetchData()
  data.map((value) => {
    h2 = document.createElement('h2')
    h2.innerHTML = value.name
    div = document.createElement('div')
    value.products.map((product) => {
      card = document.createElement('div')
      card.innerHTML = product.name
      div.appendChild(card)
    })
    document.getElementById('app').appendChild(h2)
    document.getElementById('app').appendChild(div)
  })
}


async function showCategorie(param) {
  data = await fetchData()
  productsList = data.filter((value) => value.name === param)[0].products
  h2 = document.createElement('h2')
  h2.classList.add('burger-txt')
  h2.classList.add('col-12')
  h2.innerHTML = param
  container_list = document.createElement('div')
  container_list.classList.add('container')
  container_row = document.createElement('div')
  container_row.classList.add('row')
  container_list.appendChild(container_row)
  productsList.map((product) => {
    container_col = document.createElement('div')
    container_col.classList.add('col-3')
    container_col.classList.add('p-2')
    div = document.createElement('div')
    div.classList.add('card')
    div.classList.add('card-size')
    img = document.createElement('img')
    img.classList.add('card-img-top')
    img.classList.add('card-img-top-mc')
    img.src = product.image
    container_body = document.createElement('div')
    container_body.classList.add('card-body')
    h5 = document.createElement('h5')
    h5.classList.add('card-title')
    h5.innerHTML = product.name
    p_container = document.createElement('div')
    p_container.classList.add('p-container')
    p = document.createElement('p')
    p_container.appendChild(p)
    p.classList.add('card-text')
    p.innerHTML = product.description
    price = document.createElement('h5')
    price.innerHTML = product.price
    button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-primary')
    button.innerHTML = 'Add to car'
    button.onclick = () => {
      addToCart(product)
    }
    container_body.appendChild(h5)
    container_body.appendChild(p_container)
    container_body.appendChild(price)
    container_body.appendChild(button)
    div.appendChild(img)
    div.appendChild(container_body)
    container_col.appendChild(div)
    container_row.appendChild(container_col)
  })
  productsElement = document.getElementById('productos')
  while (productsElement.firstChild) {
    productsElement.removeChild(productsElement.firstChild)
  }

  productsElement.appendChild(h2)
  productsElement.appendChild(container_list)
}
/* <table class="table table-striped">
<thead>
  <tr>
    <th scope="col">Item</th>
    <th scope="col">Qty.</th>
    <th scope="col">Description</th>
    <th scope="col">Unit price</th>
    <th scope="col">Amount</th>
  </tr>
</thead>
<tbody>
  <tr>
    <th scope="row">1</th>
    <td>1</td>
    <td>a</td>
    <td>b</td>
    <td>c</td>
  </tr>
</tbody>
</table> */

function showTable() {
  productsElement = document.getElementById('productos')
  while (productsElement.firstChild) {
    productsElement.removeChild(productsElement.firstChild)
    var productsStorage = Array.from(JSON.parse(localStorage.getItem("productsCar")));
  }
  table = document.createElement('table')
  table.classList.add('table')
  table.classList.add('table-striped')
  thead = document.createElement('thead')
  tr = document.createElement('tr')
  item = document.createElement('th')
  item.innerHTML = "Item"
  qty = document.createElement('th')
  qty.innerHTML = "Qty."
  description = document.createElement('th')
  description.innerHTML = "Description"
  price = document.createElement('th')
  price.innerHTML = "Unit price"
  amount = document.createElement('th')
  amount.innerHTML = "Amount"
  tbody = document.createElement('tbody')
  total = document.createElement('caption')
  var total_cant = 0
  productsStorage.map((product, index) => {
    tr2 = document.createElement('tr')
    th = document.createElement('th')
    th.innerHTML = index+1
    qtytd = document.createElement('td')
    qtytd.innerHTML = product.qty
    descriptiontd = document.createElement('td')
    descriptiontd.innerHTML = product.name
    pricetd = document.createElement('td')
    pricetd.innerHTML = product.price
    amounttd = document.createElement('td')
    amounttd.innerHTML = product.qty*product.price
    total_cant += product.qty*product.price
    tbody.appendChild(tr2)
    tbody.appendChild(th)
    tbody.appendChild(qtytd)
    tbody.appendChild(descriptiontd)
    tbody.appendChild(pricetd)
    tbody.appendChild(amounttd)
   
  })
 /* <button type="button" class="btn btn-secondary">Secondary</button>
              <button type="button" class="btn btn-danger">Danger</button> */
  boton1 = document.createElement('button')
  boton1.classList.add('btn')
  boton1.classList.add('btn-secondary')
  boton1.innerHTML = "Confirm order"
  boton1.onclick = () => confirmarOrder()
  boton2 = document.createElement('button')
  boton2.classList.add('btn')
  boton2.classList.add('btn-danger')
  boton2.innerHTML = "Cancel"
  boton2.dataset.target = "#mod"
  boton2.dataset.toggle = "modal"
  boton2.id = 'modalbot'
  total.innerHTML ="Total: $" + total_cant
  table.appendChild(thead)
  thead.appendChild(tr)
  tr.appendChild(item)
  tr.appendChild(qty)
  tr.appendChild(description)
  tr.appendChild(price)
  tr.appendChild(amount)
  table.appendChild(tbody)
  table.appendChild(total)
  document.getElementById("productos").appendChild(table)
  document.getElementById("productos").appendChild(boton1)
  document.getElementById("productos").appendChild(boton2)

}
function cancelOrder()
{
  localStorage.removeItem("productsCar")
  showTable()
}
function confirmarOrder()
{
  console.log(JSON.parse(localStorage.getItem("productsCar")));
}
showCategorie('Burguers').then()
//showTable()

document.getElementById('Burgers').addEventListener('click', function () {
  showCategorie('Burguers').then()
})
document.getElementById('Tacos').addEventListener('click', function () {
  showCategorie('Tacos').then()
})
document.getElementById('Salads').addEventListener('click', function () {
  showCategorie('Salads').then()
})
document.getElementById('Desserts').addEventListener('click', function () {
  showCategorie('Desserts').then()
})
document
  .getElementById('Drinks & Sides')
  .addEventListener('click', function () {
    showCategorie('Drinks and Sides').then()
  })
document.getElementById('order').addEventListener('click', function () {
  showTable()
})
document.getElementById('cancel').addEventListener('click', function () {
  cancelOrder()
})

/*document.getElementById('modalbot').addEventListener('click', function () {
  showTable()
}) */

