let carts = document.querySelectorAll('.add-button');

let products = [
    {
        name: 'Dune',
        tag: 'F001',
        price: 75,
        inCart: 0
    },
    {
        name: 'Dracula',
        tag: 'F002',
        price: 40,
        inCart: 0
    },
    {
        name: 'The Young Elites',
        tag: 'F003',
        price: 48,
        inCart: 0
    },
    {
        name: 'Moneyball: The Art of Winning an Unfair Game',
        tag: 'NF001',
        price: 88,
        inCart: 0
    },
    {
        name: 'Hiroshima',
        tag: 'NF002',
        price: 76,
        inCart: 0
    },
    {
        name: 'Commitment: My Autobiography',
        tag: 'NF003',
        price: 78,
        inCart: 0
    },
    {
        name: 'Home Body',
        tag: 'P001',
        price: 25,
        inCart: 0
    },
    {
        name: ' Odyssey',
        tag: 'P002',
        price: 100,
        inCart: 0
    },
    {
        name: 'My Greenhouse',
        tag: 'P003',
        price: 18,
        inCart: 0
    },
    {
        name: 'The Cat in the Hat',
        tag: 'K001',
        price: 25,
        inCart: 0
    },
    {
        name: 'he Tale of Peter Rabbit',
        tag: 'K002',
        price: 25,
        inCart: 0
    },
    {
        name: 'The Ugly Duckling',
        tag: 'K003',
        price: 12,
        inCart: 0
    },
    {
        name: 'The Subtle Art Of Not Giving A F***',
        tag: 'SH001',
        price: 60,
        inCart: 0
    },
    {
        name: 'The Secret',
        tag: 'SH002',
        price: 88,
        inCart: 0
    },
    {
        name: '12 Rules For Life',
        tag: 'SH003',
        price: 80,
        inCart: 0
    }
    

];

for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if( productNumbers ) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.tag;
    
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        } 
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = { 
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost( product, action ) {
    let cart = localStorage.getItem("totalCost");

    if( action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if(cart != null) {
        
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);
    
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('.products');
    
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map( (item, index) => {
            productContainer.innerHTML += 
            `<div class="product">
                <span class="sm-hide">${item.name}</span>
            </div>
            <div class="price sm-hide">RM ${item.price}.00</div>
            <div class="quantity">
                <ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>   
            </div>
            <div class="total">RM${item.inCart * item.price}.00</div>`;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Price To Pay</h4>
                <h4 class="basketTotal">RM${cart}.00</h4>
            </div>`

        deleteButtons();
        manageQuantity();
    }
}


function discount(){
    let productNumbers = localStorage.getItem('cartNumbers'); //getting total item count
    productNumbers = parseInt(productNumbers); //changing to int

    let total = localStorage.getItem("totalCost");
    total = parseInt(total);

    var discount = 0;
    

    if(productNumbers >= 5 && productNumbers <= 10) {
    
        discount = total - (total*0.05);
        document.getElementById("demo").innerHTML= discount;
        
    
    } else if ( productNumbers > 10) {
        discount = total - (total*0.15);
        document.getElementById("demo").innerHTML= discount;
        
    }else {
        document.getElementById("demo").innerHTML= "DISCOUNT NOT APPLICABLE";
    }

    
}

function postage()
{

    let postage_fee = localStorage.getItem("totalCost");

    if(postage_fee > 100) {
    
        document.getElementById("test").innerHTML= "FREE POSTAGE";
        
    
    } else {
        postage_fee+10;
        document.getElementById("test").innerHTML= "POSTAGE FEE : RM10 ";
    }
    
}

onLoadCartNumbers();
displayCart();
discount();
postage();
