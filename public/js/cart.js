//this part must be transported to the main js file
const addProductToCart = (product) => {
    const isLoggedIn = JSON.parse(localStorage.getItem('user'))
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart'))
    if (!Array.isArray(cart)) {
        cart = [];
    }
    let exists = cart.find((productX) => productX.id.toString() == product.id.toString())
    if (!exists) {
       cart.push(product);
       localStorage.setItem('cart',JSON.stringify(cart))
    }
}


const removeProductFromCart = (id) => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (!Array.isArray(cart)) {
        cart = [];
    }

    cart = cart.filter((productX) => productX.id.toString() != id.toString())
    localStorage.setItem('cart',JSON.stringify(cart))
}



const showCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = ""; 

   const isLoggedIn = JSON.parse(localStorage.getItem('user'))
    if (!isLoggedIn) {
        cartItemsDiv.innerHTML = `<p style="text-align:center; color:gray;">Your are not logged in </p>`;
        return;
    }


  if (cart.length === 0) {
    cartItemsDiv.innerHTML = `<p style="text-align:center; color:gray;">Your cart is empty.</p>`;
    return;
  }
  

  cart.forEach((product) => {
    const item = document.createElement("div");
    item.className = "cart-item";

    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="cart-item-img" />
      <div class="cart-item-details">
        <div class="cart-item-title">${product.name}</div>
        <div class="cart-item-price">$${product.price}</div>
      </div>
      <button class="remove-btn" onclick="removeProductFromCart('${product.id}'); showCart();">Remove</button>
    `;

    cartItemsDiv.appendChild(item);
  });
};

showCart();
