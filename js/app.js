const API_URL = "https://6852a7200594059b23ce857f.mockapi.io";
async function fetchData(endpoint, callback) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    const data = await response.json();
    callback(data);
  } catch (err) {
    console.log(err);
  }
}
const butnBtn = document.querySelector(".butn");
const popapEl = document.querySelector(".popap");
const redBtn = document.querySelector(".red");
butnBtn.addEventListener("click", () => {
  popapEl.style.display = "block";
});
redBtn.addEventListener("click", () => {
  popapEl.style.display = "none";
});
window.onload = () => {
  fetchData("/car", createCard);
};
const wrapperEl = document.querySelector(".wrapper");
function createCard(data) {
  wrapperEl.innerHTML = "";
  const fr = document.createDocumentFragment();
  data.forEach((car) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <div class="card__img">
        <img src="${car.image}" alt="">
      </div>
      <div class="card__body">
        <h3 class="card__title">${car.name}</h3>
        <p class="card__brand">${car.brand}</p>
        <p class="color">${car.color}</p>
        <strong class="card__price">${car.price}</strong>
        <p class="card__gr">${car.guarantee}</p>
        <button data-id="${car.id}" name="delete-btn" class="card__btn">Delete</button>
      </div>
    `;
    fr.appendChild(div);
  });
  wrapperEl.appendChild(fr);
}
const formEl = document.querySelector(".form");
const inputName = document.querySelector(".input-name");
const inputBrand = document.querySelector(".input-brand");
const inputColor = document.querySelector(".input-color");
const inputPrice = document.querySelector(".input-price");
const inputGuarantee = document.querySelector(".input-guarantee");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  let newCar = {
    name: inputName.value,
    brand: inputBrand.value,
    color: inputColor.value,
    price: inputPrice.value,
    guarantee: inputGuarantee.value,
  };

  fetch(`${API_URL}/car`, {
    method: "POST",
    body: JSON.stringify(newCar),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    inputName.value = "";
    inputBrand.value = "";
    inputColor.value = "";
    inputPrice.value = "";
    inputGuarantee.value = "";
    popapEl.style.display = "none";
    fetchData("/car", createCard);
  });
});
wrapperEl.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest("button[name='delete-btn']");
  if (deleteBtn) {
    const id = deleteBtn.dataset.id;
    const isConfor = confirm("Ishonchingiz komilmi , O'chirilsinmi bu card?");
    if (isConfor) {
      fetch(`${API_URL}/car/${id}`, { method: "DELETE" }).then(() => {
        fetchData("/car", createCard);
      });
    }
  }
});
