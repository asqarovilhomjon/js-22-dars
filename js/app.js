const API__URL = "https://dummyjson.com"
const skeleton = document.querySelector(".skeleton")
const wrapper = document.querySelector(".wrapper")
const seemore = document.querySelector(".seemore");
const collection = document.querySelector(".collection");



for(let i = 0; i < 12; i++){
    let div = document.createElement("div")
    div.classList.add("skeleton__item")
    div.innerHTML = `
                <div class="skeleton__image skeleton__anime"></div>
                <div class="skeleton__line skeleton__anime"></div>
                <div class="skeleton__line skeleton__anime"></div>
                <div class="skeleton__line skeleton__anime"></div>
    `
    skeleton.append(div)
}



let perPageCount = 6;
let offset = 1;
let category = "";
async function fetchData(api,limit, category){
    let reponse = await fetch(`${api}/products${category}?limit=${limit}`);
    reponse
        .json()
        .then(res => createCard(res))
        .catch(err => console.log(err))
        .finally(() => {
            skeleton.style.display = "none";
        })
}

fetchData(API__URL, perPageCount, category);

function createCard(data) {
  while (wrapper.firstChild) {
    wrapper.firstChild.remove();
  }
  console.log(data.products[0]);
  data.products.forEach((product) => {
    let cardItem = document.createElement("div");
    cardItem.classList.add("card");
    cardItem.dataset.id = product.id;
    cardItem.innerHTML = `
        
        <img src=${product.images[0]} alt="">
        <h3>${product.title}</h3>
        <p class= "desc" title ="${product.description}">${product.description}</p>
        <button class="link">Buy now</button>
        `;
    wrapper.appendChild(cardItem);
  });
}


seemore.addEventListener("click", () => {
    offset++;
    fetchData(API__URL, perPageCount * offset, category);
  });
  async function fetchCategory(api) {
    let response = await fetch(`${api}/products/category-list`);
    response
        .json()
        .then((res) => createCategory(res));
  }
  fetchCategory(API__URL);


  function createCategory(data) {
    data.forEach((category) => {
      let list = document.createElement("li");
      list.className = "item";
      list.innerHTML = `
          <data value="/category/${category}">${category}</data>
          `;
      collection.appendChild(list);
    });
  }
  collection.addEventListener("click", (e) => {
    if (e.target.tagName === "DATA") {
      let val = e.target.value;
      let category = val;
      fetchData(API__URL, perPageCount * offset, category);
    }
  });


wrapper.addEventListener("click", (e) => {
  const t = e.target.closest(".card")
  console.log(t);
  const id = t.dataset.id;
  if(e.target.tagName === "IMG") {
    window.open(`./pages/product.html?id=${id}`, "_self")
  } else if (e.target.closest(".link")) {
    window.open(`./pages/product.html?id=${id}`, "_self")
  }
});




  
 