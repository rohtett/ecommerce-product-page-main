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

//cart option stuff
let value = quantity.value;
function CartItem(name, picture, quantity, price) {
  this.name = name;
  this.picture = picture
  this.quantity = quantity;
  this.price = price.substring(1,price.length);
}

//cart display functions
const cart = document.getElementById("cart-holder")
const cartOn = () => {
  updateCart();
  setTimeout(() => {
    cart.style.display = "flex";
  },10);
  document.addEventListener("click", () => {
    let ev = event.target;
    ev = ($(ev).parents())
    let cartFound = false;
    for (let i=0; i < ev.length; i++) {
      if (ev[i] === cart) {
        cartFound = true;
      }
    }
    if (!cartFound) {
      cartOff();
    }
  })
}
const cartOff = () => {
  if (cart.style.display == "flex") {
    cart.style.display = "none";
  };
}

const updateCart = () => {
  const cart = document.getElementById("cart-content");
  const cartItems = document.querySelectorAll(".cart-content")
  if (cartItems) {
    cartItems.forEach(item => {
      item.parentElement.removeChild(item)
    })
  }
  if (sessionStorage.length > 0) {
    const template = document.getElementById("cart-item");
    for (let i = 0; i < sessionStorage.length; i++) {
      let cartItem = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)))
      const item = template.content.cloneNode(true);
      item.querySelector("img").src = cartItem.picture;
      item.querySelector(".itemName").textContent = cartItem.name;
      item.querySelector(".itemPrice").textContent = "$" + cartItem.price + " x " + cartItem.quantity;
      item.querySelector(".itemSub").innerHTML = "$" + (cartItem.price * cartItem.quantity).toFixed(2);
      cart.appendChild(item);
    }
  } else {
    const placeholder = document.getElementById("empty-cart");
    const text = placeholder.content.cloneNode(true);
    cart.appendChild(text);
  }
}
const deleteItem = () => {
  let ev = event.target.parentElement;
  //for now, i guess??
  sessionStorage.clear()
  ev.parentElement.removeChild(ev);
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
    let picture = document.querySelector("#display-thumbnail img").src;
    let price = document.getElementById("final-price").innerHTML;
    value = [quantity.value];
    let LEFallSneakers = new CartItem("Fall Limited Edition Sneakers", picture, value, price);
    sessionStorage.setItem(LEFallSneakers.name, JSON.stringify(LEFallSneakers));
  })

  //cart show functionality
  const cartMenu = document.getElementById("cart-menu")
  cartMenu.addEventListener("click", () => {
    cartOn();
  })

  //"carousel" functionality
  thumbnails.forEach((node,index) => {
    node.addEventListener("click", () => {
      select(index);
    })
  })
}
