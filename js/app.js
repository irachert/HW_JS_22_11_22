let productBackup = [];

function renderProducts(products) {
  let htmlStr = '';
  for (let product of products) {
    htmlStr += `
    <div class="card-group border border-light  col-lg-3 col-md-4 col-sm-6 col-xs-12 ">
     <div class="">
        <img class= "card-img-top" src=${product.image} alt="image" >
     </div>
     <div class="">
      <h5 class = "card-title">${product.title}</h5>
      <h6 class = "card-title">Category:${product.category}</h6>
      <p class="text-danger font-weight-bold">${product.price}$</p>
     </div>
   </div>
 `
  }
  document.querySelector('#products').innerHTML = htmlStr;
}

const search = document.getElementById('search');
search.onkeyup = function (e) {
  const searchValue = e.currentTarget.value.trim().toLowerCase();
  filterProducts(searchValue);
};

function filterProducts(searchValue) {
  const filteredProducts = productBackup.filter(function (product) {
    return product.title.toLowerCase().indexOf(searchValue) >= 0 || product.category.toLowerCase().indexOf(searchValue) >= 0;
  });
  renderProducts(filteredProducts);
}


fetch('https://fakestoreapi.com/products').then(response => response.json()).then((data) => {
  productBackup = data.map(function (el) {
    return {
      title: el.title,
      image: el.image,
      category: el.category,
      price: el.price
    }
  })
  renderProducts(productBackup);
})




