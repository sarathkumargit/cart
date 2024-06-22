const stock_products = [
    {
        id: 1,
        name: "apple iphone x",
        brand: "apple",
        image: "img.jpg",
        mrp: 1000,
        price: 500
    },
    {
        id: 2,
        name: "apple iphone x",
        brand: "apple",
        image: "img.jpg",
        mrp: 1000,
        price: 500
    },
    {
        id: 3,
        name: "apple iphone x",
        brand: "apple",
        image: "img.jpg",
        mrp: 1000,
        price: 500
    },
    {
        id: 4,
        name: "apple iphone x",
        brand: "apple",
        image: "img.jpg",
        mrp: 1000,
        price: 500
    },
    {
        id: 5,
        name: "apple iphone x",
        brand: "apple",
        image: "img.jpg",
        mrp: 1000,
        price: 500
    },
    {
        id: 6,
        name: "apple iphone x",
        brand: "apple",
        image: "img.jpg",
        mrp: 1000,
        price: 500
    },
    {
        id: 7,
        name: "apple iphone x",
        brand: "apple",
        image: "img.jpg",
        mrp: 1000,
        price: 500
    },
    {
        id: 8,
        name: "apple iphone x",
        brand: "apple",
        image: "img.jpg",
        mrp: 1000,
        price: 500
    },
];

 
const productSection = document.getElementById("ProductPage");
const btnCart= document.getElementById("btnCart");
const myModal= new bootstrap.Modal("#myModal");
const cartCount = document.querySelector(".cart-count");
const modalDiv= document.getElementById("myModal");
const tbody=document.getElementById("tbody");
                  

let cartItems =[];



function loadStockProducts() {
    let output = "";

    stock_products.forEach((product) => {
        output += `
        <div class="col">
            <div class="card h-100">
                <img class="card-img-top" src="${product.image}" alt="${product.name}">
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5>${product.name}</h5>
                        <span class="text-muted"><b>Brand</b>: ${product.brand}</span></br>
                        <span class="text-muted text-decoration-line-through">price: ${product.mrp}/-</span>
                        <span class="fw-bold text-success">${product.price}/-</span>
                    </div>
                </div>
                <div class="card-footer p-4 bg-transparent border-top-0">
                    <div class="text-center">
                        <button class="btn btn-primary btnProduct" data-id="${product.id}">
                            <i class="bi bi-cart-fill"></i>
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    });

    productSection.innerHTML = output;

    const productBtns= document.querySelectorAll(".btnProduct");
    productBtns.forEach((btn)=>{
                     
   btn.addEventListener("click", addToCart);
    });

}   

loadStockProducts();
btnCart.addEventListener("click",function(){
    myModal.show();
});

function addToCart(){
    this.disabled= true;
    this.innerHTML='<i class="bi bi-cart-fill"> </i> Added to Cart';
    const pid = this.dataset.id;
    const product_details = stock_products.filter((product)=> product.id== pid)[0];
    
    const product = {
        ...product_details,
        quantity: 1,
        amount: product_details.price,
    };
        cartItems.push(product);
        cartCount.textContent = cartItems.length;
        updateTotal();    
}
modalDiv.addEventListener("shown.bs.modal", () => {
    let output = '';
    cartItems.forEach((product) => {
      output += `
        <tr>
          <td><img src='${product.image}' class='img-fluid' width="100px"></td>
         
            <td>${product.name}</td>
            <td>${product.price.toFixed(2)}</td>
            <td><input type='number' style='width:80px' class='form-control txtQty' value='${product.quantity}' min=1 data-id='${product.id}'></td>
       
            <td>${product.amount.toFixed(2)}</td>
            <td><button class='btn btn-danger btn-sm btnDelete' data-id='${product.id}'> 
            <i class="bi bi-trash"></i>
            </button></td>
            
             </tr>
      `;
    });
    
    tbody.innerHTML = output;
const removeBtns = document.querySelectorAll(".btnDelete");
removeBtns.forEach((btn) => {
  btn.addEventListener("click", removeFromCart);
});

const txtQtys=document.querySelectorAll(".txtQty");
txtQtys.forEach((txt)=>{
    txt.addEventListener("change", updateQty);
});

});
  
function removeFromCart() {
    const id = this.dataset.id;
    const tr = this.closest("tr");
    cartItems = cartItems.filter((product) => product.id != id);
    tr.remove();
    updateTotal();
}
function updateQty() {
    const id = this.dataset.id;
    const newQty = this.value;
    const amountTd=this.parentElement.nextElementSibling;

    const productIndex = cartItems.findIndex((product) => product.id == id);
                                                                
    cartItems[productIndex].quantity = newQty;
    cartItems[productIndex].amount = newQty * cartItems[productIndex].price;
    amountTd.textContent = (newQty * cartItems[productIndex].price).toFixed (2);
    updateTotal();
 
}
    
  
 
  modalDiv.addEventListener("hide.bs.modal", () => {
    cartCount.textContent = cartItems.length;

    const productBtns = document.querySelectorAll(".btnProduct");
    productBtns.forEach((btn) => {
      const pid = btn.dataset.id;
      if (!isIdPresent(pid)) {
        btn.disabled = false;
      }
    });
    

  });
  
  function updateTotal() {
    let totalAmount = 0;
    cartItems.forEach((product) => {
      totalAmount += product.amount;
  });

  const totalTd = document.querySelector(".total");
  totalTd.textContent = `Total Rs :${totalAmount.toFixed(2)}`;


  }
  const isIdPresent = (id) => {
    for (const product of cartItems) {
      if (product.id === id) {
        return true;
      }
    }
    return false;
  };
  