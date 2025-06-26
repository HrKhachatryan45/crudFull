const removeProductFromCart = (id) => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (!Array.isArray(cart)) {
        cart = [];
    }



    cart = cart.filter((productX) => productX.id.toString() != id.toString())
    localStorage.setItem('cart',JSON.stringify(cart))
    window.dispatchEvent(new Event('cartUpdated'))

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
      <img src="../../${product.imagePath}" alt="${product.title}" class="cart-item-img" />
      <div class="cart-item-details">
        <div class="cart-item-title">${product.title}</vdiv>
        <div class="cart-item-price">$${product.price}</div>
      </div>
      <button class="remove-btn" onclick="removeProductFromCart('${product.id}'); showCart();">Remove</button>
    `;

    cartItemsDiv.appendChild(item);
  });
};

showCart();
