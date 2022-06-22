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

//cart option stuff
let value = quantity.value;
function CartItem(name, value, price) {
  this.name = name;
  this.quantity = value;
  this.price = price.slice(2);
  this.subtotal = () => value * price;
}
const updateCart = () => {
  for (let i in sessionStorage) {
    console.log(JSON.parse(sessionStorage[i][1]));
  }
}

//image display desktop
const thumbnails = document.querySelectorAll("#display-thumbnail img");
const displayImg = document.querySelector("#display-large img");
const select = (nodeIndex) => {
  let selected = document.querySelector(".thumbnail-selected");
  selected.classList.remove("thumbnail-selected");
  let source = thumbnails[nodeIndex].src;
  thumbnails[nodeIndex].classList.add("thumbnail-selected");
  source = source.substring(0,source.length-14) + ".jpg";
  displayImg.src=source
}
const carouselNext = bool => {
  let nodeIndex = (displayImg.src).substring(91,92);
  if (!bool) {
    nodeIndex = nodeIndex - 2;
  }
  select(nodeIndex);
}
window.onload = () => {
  //hamburger menu invocation
  hamburger.addEventListener("click", () => showModal("Hamburger"));

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
    let price = document.getElementById("final-price").innerHTML;
    value = [quantity.value];
    let LEFallSneakers = new CartItem("Fall Limited Edition Sneakers", value, price);
    sessionStorage.setItem("Cart", JSON.stringify(LEFallSneakers));
    //updateCart();
  })
  //updateCart();

  //"carousel" functionality
  thumbnails.forEach((node,index) => {
    node.addEventListener("click", () => {
      select(index);
    })
  })
}
