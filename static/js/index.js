"use strict";
const quantity = document.getElementById("quantity");
let value = quantity.value;
const decrement = document.getElementById("decrement");
const increment = document.getElementById("increment");
const addCart = document.getElementById("add-cart");
const thumbnails = document.querySelectorAll("#display-thumbnail img");
const displayImg = document.getElementById("display-large");
let selected
const Select = (nodeIndex) => {
  selected = document.querySelector(".thumbnail-selected");
  if (selected) {
    selected.classList.remove("thumbnail-selected");
  }
  thumbnails[nodeIndex].classList.add("thumbnail-selected");
  let source = thumbnails[nodeIndex].src;
  source = source.substring(0,source.length-14);
  source = source + ".jpg";
  displayImg.src=source
}
function CartItem(name, value) {
  this.name = name;
  this.quantity = value;
}

window.onload = () => {
  increment.addEventListener("click", () => {
    value = quantity.value;
    value++;
    quantity.value = value;
  })
  decrement.addEventListener("click", () => {
    value = quantity.value;
    if (value >= 2) {
      value--;
      quantity.value = value;
    }
  })
  quantity.addEventListener("change", () => {
    value = quantity.value;
    if (value < 1) {
      quantity.value = 1;
    }
  })
  addCart.addEventListener("click", () => {
    value = quantity.value;
    let LEFallSneakers = new CartItem("Fall Limited Edition Sneakers", value);
    sessionStorage.setItem(LEFallSneakers.name, LEFallSneakers.quantity);
  })
  thumbnails.forEach((node,index) => {
    node.addEventListener("click", () => {
      Select(index);
    })
  })
  Select(0)
}
