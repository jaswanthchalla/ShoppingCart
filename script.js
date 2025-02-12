const products = [
    // Mobiles
    { id: 1, name: 'Samsung Galaxy S24 Ultra', price: 99999.99, category: 'mobiles', image: 'images/samsungGalaxyS24Ultra.jpeg' },
    { id: 2, name: 'Samsung Galaxy A35 5G', price: 23899.99, category: 'mobiles', image: 'images/samsungGalaxyA35.jpeg' },
    { id: 3, name: 'iphone 16', price: 69999.99, category: 'mobiles', image: 'images/iphone16.jpeg' },
    { id: 4, name: 'OnePlus 9', price: 49999.99, category: 'mobiles', image: 'images/oneplus9.jpeg' },
    { id: 5, name: 'Google Pixel 9 Pro', price: 124999.99, category: 'mobiles', image: 'images/googlePixel9Pro.jpeg' },
    { id: 6, name: 'Motorola Edge 50 Fusion 5G', price: 20599.99, category: 'mobiles', image: 'images/motorolaEdge50Fusion.jpeg' },
    { id: 7, name: 'Infinix Note 40 Pro 5G', price: 17999.99, category: 'mobiles', image: 'images/InfinixNote40Pro5G.jpeg' },
    { id: 8, name: 'Vivo Y29 5G', price: 13999.99, category: 'mobiles', image: 'images/VivoY295G.jpeg' },
    
    // Laptops
    { id: 9, name: 'Dell XPS 13', price: 149999.99, category: 'laptops', image: 'images/DellXPS13.jpeg' },
    { id: 10, name: 'Apple MacBook Pro M3', price: 136989.99, category: 'laptops', image: 'images/AppleMacBookProM3.jpeg' },
    { id: 11, name: 'Lenovo ThinkPad X1 Carbon Gen 11', price: 136989.99, category: 'laptops', image: 'images/LenovoCarbonGen11.jpeg' },
    { id: 12, name: 'Samsung Galaxy Book Pro 360', price: 124999.99, category: 'laptops', image: 'images/SamsungGalaxyBookPro360.jpeg' },
    { id: 13, name: 'Acer Swift 5', price: 119999.99, category: 'laptops', image: 'images/AcerSwift5.jpeg' },
    { id: 14, name: 'Asus ROG Zephyrus G15', price: 159999.99, category: 'laptops', image: 'images/AsusROGZephyrusG15.jpeg' },
    { id: 15, name: 'HP Spectre x360 14', price: 1099.99, category: 'laptops', image: 'images/HPSpectre.jpeg' },
    
    // Electronics
    { id: 16, name: 'Audio-Technica ATH-CKS50TW2 Wireless Earbuds', price: 12804.99, category: 'electronics', image: 'images/AudioTechnicaEarbuds.jpeg' },
    { id: 17, name: 'AirPods Pro', price: 19899.99, category: 'electronics', image: 'images/AirpodsPro.jpeg' },
    { id: 18, name: 'Samsung Full HD Smart TV', price: 26490.99, category: 'electronics', image: 'images/SamungFullHDSmartTV.jpeg' },
    { id: 19, name: 'PS5', price: 54989.99, category: 'electronics', image: 'images/ps5.jpeg' },
    { id: 20, name: 'Apple Watch Series 8', price: 79899.99, category: 'electronics', image: 'images/appleWatch.jpeg' },
    { id: 21, name: 'iPad Air', price: 58099.99, category: 'electronics', image: 'images/ipadAir.jpeg' },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Close cart functionality
document.addEventListener('click', (event) => {
    const cartBody = document.getElementById('cart-body');
    const cartSymbol = document.querySelector('.cart-symbol');
    
    if (cartBody.classList.contains('selected') && !cartBody.contains(event.target) && !cartSymbol.contains(event.target)) {
        cartBody.classList.remove('selected');
    }
    
});

function showOrHideCart() {
    const cartBody = document.getElementById('cart-body');
    cartBody.classList.toggle('selected');
}

const hamburgerMenu = document.querySelector('.hamburger-menu');
const navItems = document.querySelector('.nav-items');

hamburgerMenu.addEventListener('click', () => {
    navItems.classList.toggle('selected');
    event.stopPropagation();
});

document.addEventListener('click', (event) => {
    if (navItems.classList.contains('selected') && !navItems.contains(event.target)) {
        navItems.classList.remove('selected');
    }
});

function updateProductDisplay(category) {
    const navItemsAll = document.querySelectorAll('.nav-items a');
    navItemsAll.forEach(item => item.classList.remove('selected'));
    document.querySelector(`[id="${category}"]`).classList.add('selected');
    
    let filteredProducts = products;
    if(category !== 'all'){ 
        filteredProducts = products.filter(p => p.category === category);
    }
    showProducts(filteredProducts);
    
    // Close mobile menu after selection
    if (window.innerWidth <= 700) {
        navItems.classList.remove('selected');
    }
}

function showProducts(productsToBeShown = products) {
    const productList = document.getElementById('products-list');
    productList.innerHTML = "";
    productsToBeShown.forEach(product => {
        productList.innerHTML +=`
            <div class="item-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3><br/>
                <p>Rs.${product.price}</p>
                <div class="select-quantity">
                <button onclick="updateSelectQuantity(${product.id}, 'decrease')">-</button>
                <span id="quantity-${product.id}">1</span>
                <button onclick="updateSelectQuantity(${product.id}, 'increase')">+</button>
                </div>
                <button onclick="addItemToCart(${product.id})" class="add-to-cart">Add to Cart</button>
            </div>`;
    });
}

function updateSelectQuantity(productId, action) {
    const quantityEle = document.getElementById(`quantity-${productId}`);
    let quantity = parseInt(quantityEle.textContent);
    
    if (action === 'increase') {
        quantity++;
    } 
    else if (action === 'decrease' && quantity > 1) {
        quantity--;
    }
    
    quantityEle.textContent = quantity;
}

function addItemToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById(`quantity-${productId}`).textContent);
    const isExists = cart.find(item => item.id === productId);

    if (isExists) {
        isExists.quantity += quantity;
    } 
    else {
        cart.push({ ...product, quantity: quantity });
    }

    const cartSymbol = document.querySelector('.cart-symbol');
    cartSymbol.classList.add('cart-bounce');
    setTimeout(() => cartSymbol.classList.remove('cart-bounce'), 500);

    // Reset quantity to 1
    document.getElementById(`quantity-${productId}`).textContent = '1';
    
    updateCartList();
}

function updateCartList() {
    const cartItems = document.getElementById('cart-items');
    const itemCount = document.getElementById('item-count');
    const totalPrice = document.getElementById('total-price');

    cartItems.innerHTML = "";

    cart.forEach(item => {
        cartItems.innerHTML += `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p>Rs.${item.price}</p>
            </div>
            <div class="update-cart-quantity">
                <button onclick="event.stopPropagation(); eveupdateCartItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="event.stopPropagation(); updateCartItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
                <button onclick="event.stopPropagation(); removeFromCart(${item.id})">🗑️</button>
            </div>
        </div>
    `});

    itemCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    totalPrice.textContent = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartItemQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        updateCartList();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartList();
}

function emptyCart() {
    cart = [];
    updateCartList();
}


// Initialize the app
showProducts();
updateCartList();

