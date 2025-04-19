
// Product data
const trendingProducts = [
    {
        title: "Summer Floral Dress",
        description: "Lightweight floral print dress with ruffled sleeves. Perfect for summer outings and beach vacations.",
        price: "GHS 500",
        image: "images/floral.jpeg",
        link: "#",
        category: "Dresses",
        rating: 4.5
    },
    {
        title: "Designer Handbag",
        description: "Premium leather handbag with multiple compartments. Fits all your daily essentials in style.",
        price: "GHS 2,000",
        image: "images/handbags.jpeg",
        link: "#",
        category: "Accessories",
        rating: 4.8
    },
    {
        title: "Strappy Heels",
        description: "Elegant strappy heels with comfortable cushioning. Available in multiple colors.",
        price: "GHS 1,500",
        image: "images/strappy.jpeg",
        link: "#",
        category: "Shoes",
        rating: 4.3
    },
    {
        title: "Silk Blouse",
        description: "Luxury silk blouse with delicate embroidery. Perfect for both office and evening wear.",
        price: "GHS 500",
        image: "images/silk.jpeg",
        link: "#",
        category: "Tops",
        rating: 4.7

    },
    {
        title: "Denim Jacket",
        description: "Classic denim jacket with stylish distressing.",
        price: "GHS 1,000",
        image: "images/denim.jpeg",
        link: "#",
        category: "Outerwear",
        rating: 4.4
    },
    {
        title: "Knit Sweater",
        description: "Cozy knit sweater for chilly evenings.",
        price: "GHS 1,200",
        image: "images/sweater.jpeg",
        link: "#",
        category: "Sweaters",
        rating: 4.8
    },
    {
        title: "Linen Pants",
        description: "Breathable linen pants for summer comfort.",
        price: "GHS 600",
        image: "images/pants.jpeg",
        link: "#",
        category: "Bottoms",
        rating: 4.3
    },
    {
        title: "Statement Earrings",
        description: "Handcrafted geometric earrings with gold plating.",
        price: "GHS 200",
        image: "images/earrings.jpeg",
        link: "#",
        category: "Jewelry",
        rating: 4.7
    },
    {
        title: "Mens leather shoe",
        description: "Comfortable leather shoe for casual wear. Available in multiple colors.",
        price: "GHS 1,500",
        image: "images/men-leather-shoe.jpeg",
        link: "#",
        category: "Shoes",
        rating: 4.5
    },
    {
        title: "Blanket",
        description: "Comfortable and stylish blanket with a soothing warmth.",
        price: "GHS 1,000",
        image: "images/blanket.jpeg",
        link: "#",
        category: "Home & Garden",
        rating: 4.2
    }
];

const newArrivals = [
    {
        title: "Evening Gown",
        description: "Stunning floor-length evening gown with sequin detailing. Made for special occasions.",
        price: "GHS 3,500",
        image: "images/gown.jpeg",
        link: "#",
        category: "Dresses",
        rating: 4.9
    },
    {
        title: "Statement Necklace",
        description: "Bold statement necklace with semi-precious stones. Elevates any outfit instantly.",
        price: "GHS 1,200",
        image: "images/necklace.jpeg",
        link: "#",
        category: "Jewelry",
        rating: 4.6

    },
    {
        title: "Leather Jacket",
        description: "Classic biker-style leather jacket with quilted detailing. Timeless wardrobe staple.",
        price: "GHS 2,000",
        image: "images/jacket.jpeg",
        link: "#",
        category: "Outerwear",
        rating: 4.7

    },
    {
        title: "Silk Scarf",
        description: "Luxury silk scarf with vibrant print. Can be worn multiple ways.",
        price: "GHS 70",
        image: "images/scarf.jpeg",
        link: "#",
        category: "Accessories",
        rating: 4.4

    },
    {
        title: "Wide-Leg Pants",
        description: "Elegant wide-leg pants for office wear.",
        price: "GHS,800",
        image: "images/pants.jpeg",
        link: "#",
        category: "Bottoms",
        rating: 4.5
    },
    {
        title: "Ankle Boots",
        description: "Stylish ankle boots for any occasion.",
        price: "GHS 2,500",
        image: "images/boots.jpeg",
        link: "#",
        category: "Shoes",
        rating: 4.8
    },
    {
        title: "Cashmere Sweater",
        description: "Ultra-soft cashmere sweater in classic fit.",
        price: "GHS 300",
        image: "images/Sweaters.jpeg",
        link: "#",
        category: "Sweaters",
        rating: 4.9
    },
    {
        title: "Woven Belt",
        description: "Handwoven leather belt with brass buckle.",
        price: "GHS 100",
        image: "images/belt.jpeg",
        link: "#",
        category: "Accessories",
        rating: 4.4
    },
    {
        title: "Canvas Shirt",
        description: "Comfortable canvas shirt in classic fit.",
        price: "GHS 250",
        image: "images/canvas-shirt.jpeg",
        link: "#",
        category: "Tops",
        rating: 4.5
    },
    {
        title: "Jordan Canvas",
        description: "Stunning jordan canvas sneaker in classic fit.",
        price: "GHS 2,500",
        image: "images/jordan-canvas-white.jpeg",
        link: "#",
        category: "Shoes",
        rating: 4.8
    }

];
// Initialize carousels
document.addEventListener('DOMContentLoaded', function() {
    initCarousel('trending-carousel', 'trendingDots', 'trendingPrevBtn', 'trendingNextBtn', trendingProducts);
    initCarousel('new-arrivals-carousel', 'newArrivalsDots', 'newArrivalsPrevBtn', 'newArrivalsNextBtn', newArrivals);
});

// Single product carousel function
function initCarousel(containerId, dotsId, prevBtnId, nextBtnId, items) {
    const carouselContainer = document.getElementById(containerId);
    const carouselDots = document.getElementById(dotsId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    
    
    const itemsPerSlide = 2;
    const totalSlides = Math.ceil(items.length / itemsPerSlide);
    let currentSlide = 0;

    // Create product cards index
    items.forEach((item) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${item.image}" alt="${item.title}">
                <span class="product-category">${item.category}</span>
            </div>
            <div class="product-info">
                <h3>${item.title}</h3>
                <div class="product-rating">
                    ${generateStarRating(item.rating)}
                    <span>${item.rating}</span>
                </div>
                <p class="price">${item.price}</p>
                <p class="description">${item.description}</p>
                <div class="product-actions">
                    <button class="add-to-cart" 
                    data-product='${JSON.stringify({
                        title: item.title,
                        price: item.price,
                        image: item.image
                    })}'>
                    Add to Cart
                    </button>
                    <a href="${item.link}" class="shop-now">Shop Now</a>
                </div>
            </div>
        `;
        carouselContainer.appendChild(productCard);
    });
        // Create dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            carouselDots.appendChild(dot);
        }
    

    // Update carousel position
    function updateCarousel() {
        const slideWidth = 100 / itemsPerSlide;
        carouselContainer.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
        
        // Update active dot
        document.querySelectorAll(`#${dotsId} .dot`).forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        
    
    }

    // Previous slide
    function prevSlide() {
        if (currentSlide > 0){
            currentSlide--;
            updateCarousel();
        }
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto-rotate carousel (optional)
    let autoRotate = setInterval(nextSlide, 5000);

    // Pause auto-rotation on hover
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        autoRotate = setInterval(nextSlide, 5000);
    });

    function generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        return stars;
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const heroCarousel = document.querySelector('.hero-carousel');
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-section .dot");
    const prevBtn = document.querySelector(".hero-section .carousel-btn.prev");
    const nextBtn = document.querySelector(".hero-section .carousel-btn.next");

    let currentIndex = 0;
    const slideCount = slides.length;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
        slides[index].classList.add("active");
    }

    function nextSlide(){
        currentIndex = (currentIndex + 1) % slideCount;
        showSlide(currentIndex);
    }
    function prevSlide(){
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        showSlide(currentIndex);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
        });
    })

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    let autoRotate = setInterval(nextSlide, 6000);

    heroCarousel.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });

    heroCarousel.addEventListener('mouseleave', () => {
        autoRotate = setInterval(nextSlide, 6000);
    });
    
    showSlide(currentIndex);
})

document.addEventListener('DOMContentLoaded', function() {
    const brands = [
        {name: "Alisa", tangline: "Iconic", image: "alisa.jpeg"},
        {name: "Balanciaga", tangline: "Natural", image: "balanciaga.png"},
        {name: "Chanel", tangline: "New Look", image: "chanel.png"},
        {name: "Dior", tangline: "Elegant", image: "dior.png"},
        {name: "Givenchy", tangline: "Modern", image: "givenchy.png"},
        {name: "Louis", tangline: "Minimalist", image: "louis.png"},
        {name:"Versace", tangline: "Authentic", image: "versace.png"},
    ];

    const carousel = document.querySelector(".brand-carousel");
    const prevBtn = document.querySelector(".brand-carousel-btn.prev");
    const nextBtn = document.querySelector(".brand-carousel-btn.next");


    brands.forEach(brand => {
        const card = document.createElement("div");
        card.className = "brand-card";
        card.innerHTML = `
            <img src="images/brands/${brand.image}" alt="${brand.name}">
            <div>${brand.tangline}</div>
        `;
        carousel.appendChild(card);
    })
    let scrollAmount = 0;
  const cardWidth = 220; // Width + gap
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;

  nextBtn.addEventListener('click', () => {
    scrollAmount = Math.min(scrollAmount + cardWidth, maxScroll);
    carousel.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  prevBtn.addEventListener('click', () => {
    scrollAmount = Math.max(scrollAmount - cardWidth, 0);
    carousel.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  // Auto-scroll
  let autoScroll = setInterval(() => {
    if (scrollAmount >= maxScroll) {
      scrollAmount = 0;
      carousel.scrollTo({ left: 0, behavior: 'instant' });
    } else {
      scrollAmount += cardWidth;
      carousel.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, 3000);

  // Pause on hover
  carousel.addEventListener('mouseenter', () => clearInterval(autoScroll));
  carousel.addEventListener('mouseleave', () => {
    autoScroll = setInterval(() => {
      if (scrollAmount >= maxScroll) {
        scrollAmount = 0;
        carousel.scrollTo({ left: 0, behavior: 'instant' });
      } else {
        scrollAmount += cardWidth;
        carousel.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    }, 3000);
  });
})
// Cart Elements
const cartElements = {
    notification: document.getElementById('cart-notification'),
    count: document.querySelector('.cart-count'),
    modal: document.getElementById('cart-modal'),
    itemsContainer: document.getElementById('cart-items'),
    modalCount: document.getElementById('cart-modal-count'),
    totalPrice: document.getElementById('cart-total-price'),
    closeBtn: document.querySelector('.close-cart'),
    overlay: document.querySelector('.overlay')
};

// Cart State
let cart = [];
document.addEventListener('DOMContentLoaded', function() {
    initCart();
    setupEventListeners();
});

// Cart Functions
function addToCart(product) {
    if (!product || !product.title || !product.price || !product.image) {
        console.error('Invalid product data:', product);
        return;
    }

    const existingItem = cart.find(item => item.title === product.title);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`${product.title} quantity increased to ${existingItem.quantity}`);
    } else {
        cart.push({
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
        showNotification(`${product.title} added to cart`);
    }
    
    updateCart();
}

let confirmYesHandler = null;
let confirmNoHandler = null;
let modalClickHandler = null;
function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
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

        message.textContent = `Are you sure you want to remove "${item.title}" from your cart?`;
        modal.style.display = 'flex';

        confirmYesHandler = () => {
            const removedItem = cart.splice(index, 1)[0];
            updateCart();
            showNotification(`${removedItem.title} removed from cart`);
            modal.style.display = 'none';
        }

        confirmNoHandler = ()  => {
            modal.style.display = 'none';
        }
        
        modalClickHandler = (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        };
        document.getElementById("confirmYes").addEventListener("click", confirmYesHandler);
        document.getElementById("confirmNo").addEventListener("click", confirmNoHandler);
        modal.addEventListener("click", modalClickHandler);
    }
}

function updateCart() {
    // Update counts
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartElements.count) cartElements.count.textContent = totalItems;
    if (cartElements.modalCount) cartElements.modalCount.textContent = totalItems;
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (parsePrice(item.price) * item.quantity), 0);
    if (cartElements.totalPrice) {
        cartElements.totalPrice.textContent = `GHS ${total.toFixed(2)}`;
    }
    
    renderCartItems();
    saveCart();
}

function parsePrice(priceStr) {
    return parseFloat(priceStr.replace(/[^\d.]/g, '')) || 0;
}

function renderCartItems() {
    if (!cartElements.itemsContainer) return;
    
    cartElements.itemsContainer.innerHTML = cart.length
        ? cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <p class="price">GHS ${parsePrice(item.price).toFixed(2)} × ${item.quantity}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-index="${index}">−</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            </div>
        `).join('')
        : '<p class="empty-cart">Your cart is empty</p>';
    
    setupCartItemEvents();
}

function setupCartItemEvents() {
    const newContainer = cartElements.itemsContainer.cloneNode(true);
    cartElements.itemsContainer.parentNode.replaceChild(newContainer, cartElements.itemsContainer);
    cartElements.itemsContainer = newContainer;
    
    cartElements.itemsContainer.addEventListener('click', function(e) {
        const target = e.target;
        if (!target.dataset.index) return;
        
        const index = parseInt(target.dataset.index);
        if (isNaN(index)) return;
        
        if (target.classList.contains('remove-item')) {
            removeFromCart(index);
        } else if (target.classList.contains('minus')) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
                updateCart();
            }
        } else if (target.classList.contains('plus')) {
            cart[index].quantity += 1;
            updateCart();
        }
    });
}

function showNotification(message) {
    if (!cartElements.notification) return;
    
    cartElements.notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    cartElements.notification.classList.add('show');
    setTimeout(() => {
        cartElements.notification.classList.remove('show');
    }, 3000);
}

function openCart() {
    if (cartElements.modal) cartElements.modal.classList.add('active');
    if (cartElements.overlay) cartElements.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    if (cartElements.modal) cartElements.modal.classList.remove('active');
    if (cartElements.overlay) cartElements.overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function saveCart() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
        console.error('Failed to save cart:', e);
    }
}

function initCart() {
    try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            cart = cart.filter(item => 
                item && 
                item.title && 
                item.price && 
                item.image && 
                typeof item.quantity === 'number'
            );
            updateCart();
        }
    } catch (e) {
        console.error('Error loading cart:', e);
        localStorage.removeItem('cart');
        cart = [];
    }
}

function setupEventListeners() {
    // Cart button
    document.querySelector('.cart-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
    });
    
    // Close button
    cartElements.closeBtn?.addEventListener('click', closeCart);

    // Overlay
    cartElements.overlay?.addEventListener('click', closeCart);
    document.querySelector('.checkout-btn')?.addEventListener('click', () => {
        if (cart.length > 0) {
            localStorage.setItem('checkoutProducts', JSON.stringify(cart))
            alert(`Proceeding to checkout with ${cart.reduce((total, item) => total + item.quantity, 0)} items`);
            window.location.href = "/payments/payment.html";
            cart = [];
            updateCart();
        } else {
            alert('Your cart is empty!');
        }
    });
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart') && e.target.dataset.product) {
            try { 
                const product = JSON.parse(e.target.dataset.product);
                addToCart(product);
            } catch (error) {
                console.error('Error parsing product data:', error);
            }
        }
    });
}
window.addToCart = addToCart;

document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const key = link.dataset.key;

        if (key === "Contact Us"){
            window.location.href = "/contact/contact.html";
            return;
        }
        const popup = link.closest('.links-column').querySelector(".footer-popup");
        const content = popup.querySelector(".popup-content");
        const popupBackdrop = document.querySelector(".footer-popup-backdrop");

        const infoMap = {
            "New Arrivals": "Check out our freshest pieces just added to the store.",
            "Best Sellers": "These products are loved the most by our customers.",
            "All Categories": "Browse all types of fashion and accessories in one place.",
            "Gift Cards": "Purchase gift cards for your loved ones.",
            "Size Guide": "Find your perfect fit using our detailed size chart.",
        
            "Current Promotions": "Save big with our limited time offers and discounts.",
            "Bundle Deals": "Get more for less with our bundle packages.",
            "Clearance Sale": "Final chance deals with massive markdowns.",
            "Holiday Specials": "Celebrate the season with special fashion collections.",
            "Student Discount": "Enjoy exclusive discounts with a valid student ID.",
        
            "Shipping Info": "We offer reliable shipping services nationwide. Orders are processed within 1-2 business days and typically delivered within 3-5 business days depending on your location. You'll receive a tracking link once your order ships. We also offer express delivery at checkout.",
            "Returns & Exchanges": "Not happy with your purchase? No worries! You can return or exchange items within 7 days of delivery, provided they are unused, unwashed, and in original packaging. Contact our support team to initiate the process. Note: Clearance items are final sale.",
            "Track Your Order": "Once your order is shipped, you will receive an email and SMS with your tracking number. You can use this number to track the current status of your order anytime. If you haven't received a tracking link, please contact our support.",
            "Payment Methods": "We accept a wide range of secure payment options including Mobile Money, Visa/MasterCard, and Bank Transfers. All transactions are encrypted and processed securely. Payment confirmations are sent immediately via email/SMS.",
            "FAQs": "Have questions? We've compiled answers to the most frequently asked questions — from how to order, to size recommendations, delivery times, and return policies. Still stuck? Chat with us or drop us an email anytime.",
            
            "Our Story": `
            <b>Our Mission:</b> To empower every woman with timeless, elegant, and accessible fashion that enhances confidence and celebrates individuality.<br><br>
            <b>Our Vision:</b> To become a leading fashion brand recognized for style, sustainability, and community impact — transforming everyday wardrobes into statements of beauty and purpose.<br><br>
            Founded with passion and purpose, Boutique was born from a dream to offer curated collections that blend elegance, affordability, and sustainability. What started as a small venture now connects thousands of women to fashion they love and trust.
            `,
        
            "Careers": `
            We're more than just a fashion brand — we're a growing family of creatives, strategists, and dreamers. If you're passionate about style, innovation, and making an impact, we want you!<br><br>
            <b>Open Roles:</b><br>
            - Social Media Intern<br>
            - Inventory Manager<br>
            - Graphic Designer<br><br>
            Think you're a fit? Email your CV and portfolio to <a href="mailto:hr@boutique.com">hr@boutique.com</a>.
            `,
        
            "Sustainability": `
            We take conscious fashion seriously. At Cilla'sCollections, sustainability is woven into every stitch.<br><br>
            - We use eco-friendly fabrics and recyclable packaging.<br>
            - We partner with ethical suppliers and local artisans.<br>
            - Our collections are designed for long-term wear, not fast fashion.<br><br>
            By shopping with us, you're supporting a cleaner planet and fair fashion.
            `,

            "Privacy Policy": "We value your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our website and make purchases.",
            "Terms of Service": "These are the terms and conditions that govern the use of our website and services. By using our site, you agree to abide by these terms.",
            "Shipping Policy": "We offer reliable shipping services nationwide. Orders are processed within 1-2 business days and typically delivered within 3-5 business days, depending on your location.",
            "Returns Policy": "If you're not satisfied with your purchase, you can return or exchange items within 7 days of delivery, as long as they are unused, unwashed, and in original packaging."
        };

        document.querySelectorAll('.footer-popup').forEach(p => p.classList.add("hidden"));
        
        const info = infoMap[key] || "More details coming soon."
        content.innerHTML = `<h3>${key}</h3><p>${info}</p>`;
        popup.classList.remove("hidden");
        popupBackdrop.classList.add("show");

        const closeBtn = popup.querySelector(".close-popup");
        closeBtn.addEventListener("click", () => {
            popup.classList.add("hidden");
            popupBackdrop.classList.remove("show")
        });
        
        popupBackdrop.addEventListener("click", () => {
            popup.classList.add("hidden");
            popupBackdrop.classList.remove("show");
        });
    });
});


document.querySelectorAll(".cat-link").forEach(link => {
    link.addEventListener('click', (e) =>{
        e.preventDefault();


        const key = link.dataset.key;
        const categoryNav = link.closest(".category-nav");
        const popup  = categoryNav.querySelector("#category-popup");
        const content = popup.querySelector("#popup-content");
        const popupBackdrop = document.querySelector(".category-popup-backdrop");

        const infoText = {
            "Trending": "Discover the latest in style — explore our Trending selection",
            "Outfit": "Curated ensembles for every occasion — welcome to our Outfits collection.",
            "Dresses": "Grace meets fashion — browse our timeless Dresses.",
            "Shoes": "Elevate every step with our refined Shoe collection.",
            "Accessories": "Complete your look with elegant Accessories made to impress.",
            "Beauty": "Indulge in beauty — where elegance begins within.",
            "Sale": "Exclusive offers await — explore our sophisticated Sale picks."
        }

// document.querySelector(".category-popup").forEach(p => p.classList.add('hidden'));
const info = infoText[key];
content.innerHTML = `<h3>${key}</h3><p>${info}</p>`;
popup.classList.remove("hidden");
popupBackdrop.classList.add('show');

const closeBtn = popup.querySelector(".close-popup");
closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    popupBackdrop.classList.remove("show")
});
        
popupBackdrop.addEventListener("click", () => {
    popup.classList.add("hidden");
    popupBackdrop.classList.remove("show");
        });
    });
});

document.querySelector(".mobile-menu-toggle").addEventListener('click', function(){
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');

    this.classList.toggle('active');

    const isExpanded = navMenu.classList.contains('active');
    this.setAttribute('aria-expanded', isExpanded);
    this.setAttribute('aria-label', isExpanded ? 'Close navigation' : 'Open navigation');
});