
const subcategories = {
    all: ['All Items',
        'Shirts', 'Trousers', 'Shoes', 'Jackets', 'Accessories',
        'Tops', 'Dresses', 'Skirts', 'Bags',
        'Clothing', 'Toys',
        'Jewelry', 'Watches', 'Sunglasses',
        'Sneakers', 'T-Shirts', 'Sports', 'Beauty'
    ],
    men: ['All Items', 'Shirts', 'Trousers','Sneakers','Suits', 'Shoes', 'Jackets', 'Accessories'],
    women: ['All Items', 'Tops', 'Dresses', 'Skirts', 'Suits', 'Shoes', 'Accessories'],
    kids_girls: ['All Items', 'Clothing', 'Shoes','Suits', 'Toys', 'Accessories'],
    kids_boys: ['All Items', 'Clothing', 'Shoes','Suits', 'Toys', 'Accessories'],
    accessories: ['All Items', 'Jewelry', 'Watches', 'Bags', 'Sunglasses'],
    unisex: ['All Items', 'Sneakers', 'T-Shirts', 'Sports', 'Beauty']
};

const products = {
    all: [
        { id: 1, name: "Men's Casual Shirt", category: "men", subcategory: "shirts", price: "$45.00", image: "images/hero/men-main.jpeg" },
        { id: 2, name: "Women's Summer Dress", category: "women", subcategory: "dresses", price: "$65.00", image: "images/summer.jpeg" },
        { id: 3, name: "Unisex Sneakers", category: "unisex", subcategory: "shoes", price: "$75.00", image: "images/unisex-sneaker.jpeg" },
        { id: 4, name: "Men's Running Shoes", category: "men", subcategory: "shoes", price: "$90.00", image: "images/mens-running-shoe.jpeg" },
        { id: 5, name: "Women's Handbag", category: "women", subcategory: "accessories", price: "$55.00", image: "images/handbags.jpeg" },
        { id: 6, name: "Accessory Pack", category: "accessories", subcategory: "jewelry", price: "$25.00", image: "images/necklace.jpeg" },
        { id: 7, name: "Kids T-Shirt", category: "kids_boys", subcategory: "clothing", price: "$20.00", image: "images/hero/kids-hex.jpeg" },
        { id: 8, name: "Kids Sneakers", category: "kids_girls", subcategory: "shoes", price: "$40.00", image: "images/kids-sneaker.jpeg" }
    ]
};

let currentCategory = 'all';
let currentSubcategory = 'all items';
let cart = [];

// ==== DOM ELEMENTS ====
const filterBtns = document.querySelectorAll('.filter-btn');
const productsContainer = document.getElementById('products-container');
const productCountElement = document.getElementById('product-count');
const cartNotification = document.getElementById('cart-notification');
const cartCountElement = document.querySelector('.cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartModalCount = document.getElementById('cart-modal-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const closeCartBtn = document.querySelector('.close-cart');
const subcategorySidebar = document.querySelector('.subcategory-sidebar');
const subcategoryOverlay = document.querySelector('.sidebar-overlay');
const subcategoryList = document.querySelector('.subcategories-list');
const closeSidebarBtn = document.querySelector('.close-sidebar');
// ==== EVENT LISTENERS ====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        currentSubcategory = 'all items';
        displaySubcategories(currentCategory);
        openSidebar();
        filterProducts();
    });
});

document.querySelector('.cart-icon').addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
});

closeCartBtn.addEventListener('click', closeCart);
subcategoryOverlay.addEventListener('click', closeSidebar);
closeSidebarBtn.addEventListener('click', closeSidebar);


// ==== FUNCTIONS ====

function displaySubcategories(category) {
    subcategoryList.innerHTML = '';
    subcategories[category].forEach(sub => {
        const btn = document.createElement('button');
        btn.className = 'subcategory-btn';
        if (sub.toLowerCase() === 'all items') btn.classList.add('active');
        btn.textContent = sub;
        btn.dataset.subcategory = sub.toLowerCase();
        btn.addEventListener('click', e => {
            document.querySelectorAll('.subcategory-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentSubcategory = e.target.dataset.subcategory;
            filterProducts();
        });
        subcategoryList.appendChild(btn);
    });
}

function filterProducts() {
    const items = products.all.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesSub = currentSubcategory=== 'all items' || product.subcategory === currentSubcategory.toLowerCase();
        return matchesCategory && matchesSub;
    });
    renderProducts(items);
}

function renderProducts(items) {
    productsContainer.innerHTML = '';
    productCountElement.textContent = items.length;
    items.forEach(product => {
        const productEl = document.createElement('div');
        productEl.className = 'product-item';
        productEl.innerHTML = `
            <div class="product-image">
                <img src="${product.image}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productsContainer.appendChild(productEl);
    });
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

function addToCart(e) {
    const id = parseInt(e.target.dataset.id);
    const product = products.all.find(p => p.id === id);
    if (product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;  
        } else {
            product.quantity = 1; 
            cart.push(product);
        }
        updateCartCount();
        showCartNotification('Item added to cart!');
    }
}

function updateCartCount() {
    cartCountElement.textContent = cart.length;
}

function showCartNotification(message = 'Item added to cart!') {
    cartNotification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    cartNotification.classList.add('show');
    setTimeout(() => {
        cartNotification.classList.remove('show');
    }, 5000);
}

function openCart() {
    cartModal.classList.add('active');
    renderCartItems();
}

function closeCart() {
    cartModal.classList.remove('active');
}

function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>No cart yet</p>';
        cartModalCount.textContent = '0';
        cartTotalPrice.textContent = '$0.00';
        return;
    }
    let total = 0;
    cart.forEach((item, index) => {
        const price = parseFloat(item.price.replace('$', ''));
        total += price * item.quantity; 
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}">
            </div>
            <div class="cart-item-details">
                <h4 class='cart-item-title'>${item.name}</h4>
                <p class="cart-item-price">${item.price}</p>
                <div class="quantity-controls">
                    <button class="decrease-quantity" data-index="${index}">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="item-quantity" data-index="${index}">
                    <button class="increase-quantity" data-index="${index}">+</button>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', removeFromCart);
    });
    document.querySelectorAll('.increase-quantity').forEach(btn => {
        btn.addEventListener('click', increaseQuantity);
    });
    document.querySelectorAll('.decrease-quantity').forEach(btn => {
        btn.addEventListener('click', decreaseQuantity);
    });
    document.querySelectorAll('.item-quantity').forEach(input => {
        input.addEventListener('change', updateQuantity);
    });

    cartModalCount.textContent = cart.length;
    cartTotalPrice.textContent = `$${total.toFixed(2)}`;
}

let confirmYesHandler = null;
let confirmNoHandler = null;
let modalClickHandler = null;
function removeFromCart(e) {
    const index = parseInt(e.target.dataset.index);
    const item = cart[index];
    const modal = document.getElementById('confirmationModal');
    const message = document.getElementById('confirmationMessage')

    if (confirmYesHandler){
        document.getElementById('confirmYes').removeEventListener('click', confirmYesHandler);
    };

    if (confirmNoHandler) {
        document.getElementById('confirmNo').removeEventListener('click', confirmNoHandler);
    };

    if (modalClickHandler){
        modal.removeEventListener('click', modalClickHandler);
    };

    message.textContent = `Are you sure you want to remove "${item.name}" from your cart?`;
    modal.style.display = 'flex';


    confirmYesHandler = () => {
        const [removedItem] = cart.splice(index, 1);
        updateCartCount();
        renderCartItems();
        showCartNotification(`${removedItem.name} removed from cart!`);
        modal.style.display = 'none'
    }
    
    confirmNoHandler = () =>{
        modal.style.display = 'none';
    }
    
    modalClickHandler = (e) =>{
        if(e.target === modal) {
            modal.style.display = 'none';
        }
    };

    document.getElementById("confirmYes").addEventListener("click", confirmYesHandler);
    document.getElementById("confirmNo").addEventListener("click", confirmNoHandler);
    modal.addEventListener("click", modalClickHandler);
    
}

// ==== Sidebar Functions ====
function openSidebar() {
    subcategorySidebar.classList.add('active');
    subcategoryOverlay.classList.add('active');
    

    displaySubcategories(currentCategory);
}

function closeSidebar() {
    subcategorySidebar.classList.remove('active');
    subcategoryOverlay.classList.remove('active');
    
}

// ==== Quantity Functions ====
function increaseQuantity(e) {
    const index = parseInt(e.target.dataset.index);
    const item = cart[index];
    item.quantity += 1;
    renderCartItems(); 
}

function decreaseQuantity(e) {
    const index = parseInt(e.target.dataset.index);
    const item = cart[index];
    if (item.quantity > 1) {
        item.quantity -= 1;
        renderCartItems();  
    }
}

function updateQuantity(e) {
    const index = parseInt(e.target.dataset.index);
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
        renderCartItems();  
    } else {
        e.target.value = cart[index].quantity;  
    }
}

// ==== INITIAL LOAD ====
displaySubcategories(currentCategory);
filterProducts();
updateCartCount();

document.querySelector('.checkout-btn')?.addEventListener('click', () => {
    if (cart.length > 0) {
        localStorage.setItem('checkoutProducts', JSON.stringify(cart));
        window.location.href = "/payments/payment.html";
    } else {
        alert('Your cart is empty!');
    }
});


document.querySelector('.mobile-menu-toggle').addEventListener('click', function(){
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');

    this.classList.toggle('active');

    const isExpanded = navMenu.classList.contains('active');
    this.setAttribute('aria-expanded', isExpanded);
    this.setAttribute('aria-label', isExpanded ? 'Close navigation' : 'Open navigation');
})
