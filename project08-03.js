"use strict";
/*    JavaScript 7th Edition
      Chapter 8
      Project 08-03

      Project to build a pizza using object oriented programming
      Author: Eskedar Dessie
      Date:   03/17/2023

      Filename: project08-03.js
*/

/*---------------- Object Code ----------------------*/

// Pizza object class
function Pizza() {
  this.size = "";
  this.crust = "";
  this.toppings = [];
}

Pizza.prototype.addTopping = function (topping) {
  this.toppings.push(topping);
};

Pizza.prototype.addToCart = function (cart) {
  cart.items.push(this);
};

Pizza.prototype.summarize = function () {
  let summary = "Pizza: " + this.size + " " + this.crust + " with ";
  for (let i = 0; i < this.toppings.length; i++) {
    summary += this.toppings[i].name + " (" + this.toppings[i].side + "), ";
  }
  return summary.slice(0, -2);
};

// Topping object class
function Topping() {
  this.name = "";
  this.side = "";
}

// Shopping cart object
let cart = {
  items: [],
  addItem: function (foodItem) {
    this.items.push(foodItem);
  },
};

// Update cart
function updateCart() {
  let myPizza = buildPizza();
  cart.addItem(myPizza);
  console.log(cart);

  let summary = document.createElement("p");
  summary.textContent = myPizza.summarize();
  document.getElementById("cartBox").appendChild(summary);

  let cartContents = document.createElement("ul");
  for (let i = 0; i <cart.items.length; i++) {
    let cartItem = document.createElement("li")
    cartItem.textContext = cart.items[i].summarize();
    cartContents.appendChild(cartItem) 
  }

  document.getElementById("cartContents").innerHTML = ""
  document.getElementById("cartContents").appendChild(cartContents)

  clearPizzaImage();
  clearToppings();
}

// Build pizza
function buildPizza() {
  let myPizza = new Pizza();
  myPizza.size = pizzaSizeBox.value;
  myPizza.crust = pizzaCrustBox.value;

  let checkedToppings = document.querySelectorAll(
    'input[name="topping"]:checked'
  );
  for (let i = 0; i < checkedToppings.length; i++) {
    let myTopping = new Topping();
    myTopping.name = checkedToppings[i].name;
    myTopping.side = checkedToppings[i].value;
    myPizza.addTopping(myTopping);
  }
  return myPizza;
}

/*----------------------------- Interface Code -------------------------*/

let pizzaPreviewBox = document.getElementById("previewBox"); // pizza image
let pizzaSizeBox = document.getElementById("pizzaSize"); // pizza size selection
let pizzaCrustBox = document.getElementById("pizzaCrust"); // pizza crust selection
let toppingOptions = document.querySelectorAll("input.topping"); // pizza topping option buttons
let addToCart = document.getElementById("addToCart"); // Add to Cart button
let cartBox = document.getElementById("cart"); // Shopping cart box

// Add event handlers for the pizza toppings
for (let i = 0; i < toppingOptions.length; i++) {
  toppingOptions[i].onclick = drawPizza;
}

// Event Handler for the addToCart button
addToCart.onclick = updateCart;

// Clear the pizza image
function clearPizzaImage() {
  while (pizzaPreviewBox.firstChild) {
    pizzaPreviewBox.removeChild(pizzaPreviewBox.firstChild);
  }
}

// Unselect all toppings
function clearToppings() {
  let noTopping = document.querySelectorAll("input.topping[value='none']");
  for (let i = 0; i < noTopping.length; i++) {
    noTopping[i].checked = true;
  }
}

/* Function to draw the pizza image  */
function drawPizza() {
  // Erase current pizza image
  clearPizzaImage();
  // Determine which toppings have been checked
  let checkedToppings = document.querySelectorAll("input.topping:checked");

  // Draw the individual toppings
  for (let i = 0; i < checkedToppings.length; i++) {
    if (checkedToppings[i].value !== "none") {
      let toppingImage = document.createElement("img");
      toppingImage.src = checkedToppings[i].name + ".png";
      toppingImage.className = checkedToppings[i].value;
      pizzaPreviewBox.appendChild(toppingImage);
    }
  }
}

// Function to build the pizza
// function buildPizza() {
//   let checkedToppings = document.querySelectorAll("input.topping:checked");
// }

// Function to add the built pizza to the shopping cart
/***function updateCart() {


} ***/
