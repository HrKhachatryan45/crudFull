//this part must be transported to the main js file
const addProductToCart = (p) => {
    let product = JSON.parse(decodeURIComponent(p))
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
    window.dispatchEvent(new Event('cartUpdated'))
    renderHtml()
}


const removeProductFromCart = (id) => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (!Array.isArray(cart)) {
        cart = [];
    }

    cart = cart.filter((productX) => productX.id.toString() != id.toString())
    localStorage.setItem('cart',JSON.stringify(cart))

    window.dispatchEvent(new Event('cartUpdated'))
    renderHtml()

}




const token = JSON.parse(localStorage.getItem('token'))

        const getProducts = async () =>{
            const response = await fetch("http://localhost:8080/admin/getProducts")
            const json = await response.json()
            return json
        }
        const renderHtml = async () => {
            const arr = await getProducts()
     
       document.getElementsByClassName("d1")[0].innerHTML = ''
        const cont = document.getElementsByClassName("d1")[0]

          const user = JSON.parse(localStorage.getItem('user'));
        if (user && !user.isAdmin) {
            
        
              arr.forEach((element,index) => {
                let cart = JSON.parse(localStorage.getItem('cart'))
            if (!Array.isArray(cart)) {
                cart = [];
            }
            let exists = cart.find((productX) => productX.id.toString() == element.id.toString())
        const encodedProduct = encodeURIComponent(JSON.stringify(element));
                    
                    const div = document.createElement("div")
                    div.className = "bella";
                    div.innerHTML = `
                        <img src="../../${element.imagePath}">
                        <h1> ${element.title} </h1>
                        <p> $${element.price}</p>
                        <button onclick="${exists 
                            ? `removeProductFromCart(${element.id})` 
                            : `addProductToCart('${encodedProduct}')`}" id="${!exists ? 'buxankaX':'kalabokX'}">
                            ${exists ? 'Remove From Cart' : 'Add To Cart'}
                        </button>
                    `
                    console.log(element);
                    console.log(index);
                    
                    cont.appendChild(div)
                    
                })
        }else{
                arr.forEach((element,index) => {
                    const safe = encodeURIComponent(JSON.stringify(element))
                    
                    const div = document.createElement("div")
                    div.className = "bella";
                    div.innerHTML = `
                        <img src="../../${element.imagePath}">
                        <h1> ${element.title} </h1>
                        <p> $${element.price}</p>
                        <button onclick="convertToUpdate('${safe}', ${index})" id='buxanka'><i class="fas fa-pen"></i></button>
                        <button onclick="deleteProduct(${element.id})" id='kalabok'> <i class="fas fa-trash"></i></button>
                    `
                    console.log(element);
                    console.log(index);
                    
                    cont.appendChild(div)
                    
                })

        }

        }
        
        renderHtml()


        const convertToUpdate = (el,index) => {
            const element = JSON.parse(decodeURIComponent(el))
            
              const cont =   document.getElementsByClassName('bella')[index];
              console.log(cont);
              
              const h1 = cont.querySelector('h1');
            if (h1) cont.removeChild(h1);

            const p = cont.querySelector('p');
            if (p) cont.removeChild(p);
            const editBtn = cont.querySelector('#buxanka');
            if (editBtn) cont.removeChild(editBtn);

            const deleteBtn = cont.querySelector('#kalabok');
            if (deleteBtn) cont.removeChild(deleteBtn);

              const input1  = document.createElement('input')
              input1.value = element.title;

               const input2  = document.createElement('input')
              input2.value = element.price;

              const newBtn = document.createElement('button');
                newBtn.innerText = 'Update';
                newBtn.addEventListener('click', () => {
                    updateProduct(element.id, input1.value, input2.value);
                });

              
              cont.appendChild(input1)
              cont.appendChild(input2)
              cont.appendChild(newBtn)
        }

        const updateProduct = async (id,title,price) => {

                const response = await fetch("http://localhost:8080/admin/updateProduct/"+ id,{
                    method:"PUT",
                    headers:{'Content-Type':'application/json','Authorization':'Bearer ' + token },
                    body:JSON.stringify({title,price})
                 })
            const json = await response.json()
            console.log(json);
            
             await renderHtml()
        }

        const addProduct = async (event) => {
            event.preventDefault()
            const title = document.querySelectorAll("input")[0].value
            const price = document.querySelectorAll("input")[1].value
            const file = document.querySelectorAll("input")[2].files[0]

            console.log(file);
            

            const formData = new FormData()

            formData.append("title", title)
            formData.append("price", price)
            formData.append("productImage", file)

            const response = await fetch("http://localhost:8080/admin/addProduct",{
                method:"POST", 
                headers:{'Authorization':'Bearer ' + token },
                body:formData
            })
            const json = await response.json()

            await renderHtml()

                document.querySelectorAll("input")[0].value = ''
             document.querySelectorAll("input")[1].value = ''
             document.querySelectorAll("input")[2].files[0] = ''

        }
        
        const deleteProduct = async (id) => {
                 const response = await fetch("http://localhost:8080/admin/deleteProduct/"+ id,{
                    method:"DELETE",
                    headers:{'Authorization':'Bearer ' + token },
                 })
            const json = await response.json()
             await renderHtml()
        }