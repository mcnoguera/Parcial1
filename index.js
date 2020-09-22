async function fetchData() {
    response = await fetch(
      'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json'
    )
    json = await response.json()
    return json
  }
  
  function addToCart(id, name, description, unitPrice, amount) {
    listProducts = localStorage.getItem(cart)
  
    localStorage.setItem(listProducts)
  }
  
  async function showCategories() {
    data = await fetchData()
    data.map((value) => {
      h2 = document.createElement('h2')
      h2.innerHTML = value.name
      div = document.createElement('div')
      value.products.map((product) => {
        console.log(product)
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
    console.log(productsList)
    h2 = document.createElement('h2')
    h2.innerHTML = param
    div = document.createElement('div')
    productsList.map((product) => {
      console.log(product)
      card = document.createElement('div')
      card.innerHTML = product.name
      div.appendChild(card)
    })
    document.getElementById('productos').appendChild(h2)
    document.getElementById('productos').appendChild(div)
  }
  
  showCategorie('Burguers').then()