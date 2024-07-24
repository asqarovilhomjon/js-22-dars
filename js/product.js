const API__URL = "https://dummyjson.com";
const content = document.querySelector(".content");

async function fetchSingleData(api) {
  let query = new URLSearchParams(window.location.search);
  let id = query.get("id");
  let response = await fetch(`${api}/products/${id}`);
  response
    .json()
    .then((res) => createContent(res))
    .catch((err) => console.log(err));
}
fetchSingleData(API__URL);
function createContent(data) {
  console.log("ok");
  console.log(data);
  content.innerHTML = `
      <div class="content__img">
                <img width="300" src="${data.images[0]}" alt="">
                ${data.images.map(
                    (item) => ( `<img class="little" width="80" src=${item} alt=""></img>`
                  ))
                }
               </div>
               <div class="content__text">
               <div class="icon">
                </div
                <h2>${data.title}</h2>
                <p>${data.description}</p>
                <h3>Price:${data.price}$</h3>
                <button>Buy now</button>
               </div>
    
       
    `;
}