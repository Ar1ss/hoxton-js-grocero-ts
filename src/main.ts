import './style.css'
import './reset.css'

// @ts-nocheck
/*

This is how an item object should look like

{
  id: 1, // <- the item id matches the icon name in the assets/icons folder
  name: "beetroot",
  price: 0.35 // <- You can come up with your own prices
}

*/

type StoreItem = {
  id: number;
  name: string;
  price: number;
  inCart: number;
}

type State = {
  storeItems: StoreItem[]
}

let state: State = {
  storeItems: [
    {
      id: 1,
      name: "beetroot",
      price: 0.40,
      inCart: 0,
    },
    {
      id: 2,
      name: "carrot",
      price: 0.35,
      inCart: 2,
    },
    {
      id: 3,
      name: "apple",
      price: 0.35,
      inCart: 3,
    },
    {
      id: 4,
      name: "apricot",
      price: 0.35,
      inCart: 4,
    },
    {
      id: 5,
      name: "avocado",
      price: 0.35,
      inCart: 5,
    },
    {
      id: 6,
      name: "bananas",
      price: 0.35,
      inCart: 6,
    },
    {
      id: 7,
      name: "bell-pepper",
      price: 0.35,
      inCart: 7,
    },
    {
      id: 8,
      name: "berry",
      price: 0.35,
      inCart: 8,
    },
    {
      id: 9,
      name: "blueberry",
      price: 0.35,
      inCart: 9,
    },
    {
      id: 10,
      name: "eggplant",
      price: 0.35,
      inCart: 10,
    },
  ],
};

function getItemImagePath(item : StoreItem) {
  let id = String(item.id).padStart(3, "0");
  return `assets/icons/${id}-${item.name}.svg`;
}

function getCartItems() {
  return state.storeItems.filter((item) => item.inCart > 0);
}

function getTotal() {
  let cartItems = getCartItems();
  let total = 0;

  for (let item of cartItems) {
    total += item.price * item.inCart;
  }

  return total;
}

function increaseQuantity(item : StoreItem) {
  if(item.inCart === 0) {

  item.inCart++;
}
}

function decreaseQuantity(item : StoreItem) {
  if (item.inCart > 0) {
    item.inCart--;
  }
}

function renderStoreItems() {
  let storeUl = document.querySelector(".store--item-list");
  storeUl.textContent = "";

  for (let item of state.storeItems) {
    let storeItemEl = document.createElement("li");

    let iconDiv = document.createElement("div");
    iconDiv.className = ".store--item-icon";

    let iconImg = document.createElement("img");
    iconImg.src = getItemImagePath(item);

    let addBtn = document.createElement("button");
    addBtn.textContent = `Add to cart`;
    addBtn.addEventListener("click", function () {
      increaseQuantity(item);
      render();
    });

    iconDiv.append(iconImg);
    storeItemEl.append(iconDiv, addBtn);
    storeUl.append(storeItemEl);
  }
}

function renderCartItems() {
  let cartUl = document.querySelector(".cart--item-list");
  cartUl.textContent = "";

  let cartItems = getCartItems();

  for (let item of cartItems) {
    let cartLi = document.createElement("li");

    let itemImg = document.createElement("img");
    itemImg.className = "cart--item-icon";
    itemImg.src = getItemImagePath(item);
    itemImg.alt = item.name;

    let itemNameP = document.createElement("p");
    itemNameP.textContent = item.name;

    let removeBtn = document.createElement("button");
    removeBtn.className = "quantity-btn remove-btn center";
    removeBtn.textContent = "-";
    removeBtn.addEventListener("click", function () {
      decreaseQuantity(item);
      render();
    });

    let quantitySpan = document.createElement("span");
    quantitySpan.className = "quantity-text center";
    quantitySpan.textContent = String(item.inCart);

    let addBtn = document.createElement("button");
    addBtn.className = "quantity-btn add-btn center";
    addBtn.textContent = "+";
    addBtn.addEventListener("click", function () {
      increaseQuantity(item);
      render();
    });

    cartLi.append(itemImg, itemNameP, removeBtn, quantitySpan, addBtn);
    cartUl.append(cartLi);
  }
}

function renderTotal() {
  let total = getTotal();
  let totalEl = document.querySelector(".total-number");
  totalEl.textContent = `Total: ${total.toFixed(2)}`;
}

function render() {
  renderStoreItems();
  renderCartItems();
  renderTotal();
}

render();
