"use strict";
//hamburger functionality
const modal = document.getElementById("modalBg");
const showModal = display => {
  modal.style.display="block";
  eval("show" + display + "()");
  modal.addEventListener("click", () => hideModal(display));
}
const hideModal = display => {
  modal.style.display = "none";
  eval("hide" + display + "()");
}
const hamburger = document.querySelector("#hamburger img")
const hamburgerMenu = document.getElementById("hamburger-menu");
const showHamburger = () => {
  hamburgerMenu.style.display="block";
  hamburger.src="images/icon-close.svg";
  hamburger.addEventListener("click", () => hideModal("Hamburger"))
}
const hideHamburger = () => {
  hamburgerMenu.style.display="none";
  hamburger.src="images/icon-menu.svg";
  hamburger.addEventListener("click", () => showModal("Hamburger"));
}

//image display desktop
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

let value = quantity.value;
function CartItem(name, value) {
  this.name = name;
  this.quantity = value;
}

window.onload = () => {
  //quantity input changes
  const quantity = document.getElementById("quantity");
  quantity.addEventListener("change", () => {
    value = quantity.value;
    if (value < 1) {
      quantity.value = 1;
    }
  })
  //increment button functionality
  const increment = document.getElementById("increment");
  increment.addEventListener("click", () => {
    value = quantity.value;
    value++;
    quantity.value = value;
  })
  //decrement button functionality
  const decrement = document.getElementById("decrement");
  decrement.addEventListener("click", () => {
    value = quantity.value;
    if (value >= 2) {
      value--;
      quantity.value = value;
    }
  })
  //add to cart button functionality
  const addCart = document.getElementById("add-cart");
  addCart.addEventListener("click", () => {
    value = quantity.value;
    let LEFallSneakers = new CartItem("Fall Limited Edition Sneakers", value);
    sessionStorage.setItem(LEFallSneakers.name, LEFallSneakers.quantity);
  })
  //"carousel" functionality
  thumbnails.forEach((node,index) => {
    node.addEventListener("click", () => {
      Select(index);
    })
  })
  //hamburger menu invokation
  hamburger.addEventListener("click", () => showModal("Hamburger"));
  Select(0)
}
