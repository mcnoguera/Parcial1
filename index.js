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
/* <h1 class="burger-txt col-12"> Burgers</h1>
           <div class="card m-5" style="width: 18rem;">
               <img src="https://i.imgur.com/1EKrQIi.png" class="card-img-top" alt="...">
               <div class="card-body">
                 <h5 class="card-title">Card title</h5>
                 <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                 <a href="#" class="btn btn-primary">add to car</a>
               </div>
             </div> */


async function showCategorie(param) {
  data = await fetchData()
  productsList = data.filter((value) => value.name === param)[0].products
  h2 = document.createElement('h2')
  h2.classList.add("burger-txt");
  h2.classList.add("col-12");
  h2.innerHTML = param
  container_list = document.createElement('div');
  container_list.classList.add("container");
  container_row = document.createElement('div');
  container_row.classList.add("row");
  container_list.appendChild(container_row);
  productsList.map((product) => {
    container_col = document.createElement('div');
    container_col.classList.add("col-4");
    div = document.createElement('div')
    div.classList.add("card");
    div.classList.add("m-5");
    //div.classList.add("card-size");
    img = document.createElement('img')
    div.classList.add("card-img-top");
    img.src = product.image;
    container_body = document.createElement('div');
    container_body.classList.add("card-body");
    h5 = document.createElement('h5');
    h5.classList.add("card-title");
    h5.innerHTML = product.name;
    p = document.createElement('p');
    p.classList.add("card-text");
    p.innerHTML = product.description;
    price = document.createElement('h5');
    price.innerHTML = product.price;
    a = document.createElement('a');
    a.classList.add("btn");
    a.classList.add("btn-primary");
    a.innerHTML = "Add to car";
    console.log(product)
    container_body.appendChild(h5);
    container_body.appendChild(p);
    container_body.appendChild(price);
    container_body.appendChild(a);
    div.appendChild(img);
    div.appendChild(container_body);
    container_col.appendChild(div);
    container_row.appendChild(container_col);
  })
  document.getElementById('productos').appendChild(h2)
  document.getElementById('productos').appendChild(div)
  document.getElementById('productos').appendChild(container_list)
}

showCategorie('Burguers').then()