document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const {key} = link.dataset;

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

        const info = infoMap[key] || "More details coming soon.";
        content.innerHTML = `<h3>${key}</h3><p>${info}</p>`;
        popup.classList.remove("hidden");
        popupBackdrop.classList.add("show");

        const closeBtn = popup.querySelector(".close-popup");
        closeBtn.addEventListener("click", () => {
            popup.classList.add('hidden');
            popupBackdrop.classList.remove("show");
        });

        popupBackdrop.addEventListener("click", () =>{
            popup.classList.add("hidden");
            popupBackdrop.classList.remove("show");
        });
    });
});

// Hero carousel function
document.addEventListener("DOMContentLoaded", function () {
    const heroCarousel = document.querySelector(".hero-carousel");
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-section .dot");
    const prevBtn = document.querySelector(".hero-section .carousel-btn.prev");
    const nextBtn = document.querySelector(".hero-section .carousel-btn.next");


    let currentIndex = 0;
    const slideCount = slides.length;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove("active"));
        slides[index].classList.add('active')
        dots[index].classList.add('active');
    }
    
    function nextSlide(){
        currentIndex = (currentIndex + 1) % slideCount;
        showSlide(currentIndex)
    }
    function prevSlide(){
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        showSlide(currentIndex)
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
});

document.addEventListener('DOMContentLoaded', function() {
    // Dynamic product generation with verified paths
    const products = [
        // Special Collections (10 each)
            ...generateProducts("Formal Suit", "special-collections", 10, 99.99, 399.99),
            ...generateProducts("Evening Dress", "special-collections", 10, 129.99, 599.99),
            ...generateProducts("Silk Tie Set", "special-collections", 10, 39.99, 149.99),
            ...generateProducts("Velvet Blazer", "special-collections", 10, 119.99, 449.99),
            ...generateProducts("Bridal Gown", "special-collections", 10, 199.99, 899.99),

            // New Arrivals (5 each)
            ...generateProducts("Casual Shirt", "new-arrival", 5, 24.99, 59.99, true),
            ...generateProducts("Designer Jeans", "new-arrival", 5, 49.99, 129.99, true),
            ...generateProducts("Oversized Hoodie", "new-arrival", 5, 34.99, 79.99, true),
            ...generateProducts("Linen Pants", "new-arrival", 5, 29.99, 69.99, true),
            ...generateProducts("Cropped Jacket", "new-arrival", 5, 44.99, 109.99, true),

            // On Sale (5 each)
            ...generateProducts("Winter Coat", "on-sale", 5, 59.99, 199.99, false, true),
            ...generateProducts("Cashmere Sweater", "on-sale", 5, 49.99, 179.99, false, true),
            ...generateProducts("Leather Gloves", "on-sale", 5, 19.99, 49.99, false, true),
            ...generateProducts("Wool Scarf", "on-sale", 5, 14.99, 39.99, false, true),
            ...generateProducts("Denim Jacket", "on-sale", 5, 39.99, 129.99, false, true),

            // Accessories (5 each)
            ...generateProducts("Premium Watch", "accessories", 5, 79.99, 299.99),
            ...generateProducts("Leather Belt", "accessories", 5, 29.99, 89.99),
            ...generateProducts("Designer Sunglasses", "accessories", 5, 49.99, 199.99),
            ...generateProducts("Silk Pocket Square", "accessories", 5, 9.99, 29.99),
            ...generateProducts("Statement Necklace", "accessories", 5, 19.99, 79.99),

            // Unisex (5 each)
            ...generateProducts("Canvas Sneakers", "unisex", 5, 34.99, 89.99, true),
            ...generateProducts("Oversized T-shirt", "unisex", 5, 14.99, 39.99, true),
            ...generateProducts("Utility Joggers", "unisex", 5, 29.99, 69.99, true),
            ...generateProducts("Trench Coat", "unisex", 5, 69.99, 249.99, true),
            ...generateProducts("Beanie Hat", "unisex", 5, 9.99, 24.99, true)
    ];

    function generateProducts(baseName, category, count, minPrice, maxPrice, isNew = false, isOnSale = false) {
        const categoryFolders = {
            "special-collections": "special-collections",
            "accessories": "accessories",
            "new-arrival": "new-arrival",
            "on-sale": "on-sale",
            "unisex": "unisex"
        };
        
        const subcategories = ["male", "female", "kids-male", "kids-female", "unisex"];
        const sizes = ["xs", "s", "m", "l", "xl", "xxl", "one-size"];
        const types = ["shirt", "suit", "dress", "kaftan", "skirt", "jeans", "shoes", "slippers"];
        const colors = ["black", "blue", "red", "white"];
        const extensions = ['jpg','jpeg', 'png', 'webp'];
    
        const generatedProducts = [];
        
        for (let i = 1; i <= count; i++) {
            const subcategory = subcategories[Math.floor(Math.random() * subcategories.length)];
            const size = sizes[Math.floor(Math.random() * sizes.length)];
            const type = types[Math.floor(Math.random() * types.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const price = (Math.random() * (maxPrice - minPrice) + minPrice).toFixed(2);
            const productId = `${category}-${subcategory}-${type}-${color}-${i}`;
            

            const imagePath = `/collections/images/placeholders/${
                category === 'unisex' ? 'unisex-placeholder.jpeg' :
                category === 'on-sale' ? 'sale-placeholder.jpeg' :
                category === 'accessories' ? 'accessories-placeholder.jpeg' :
                category === 'special-collections' ? 'premium-placeholder.jpeg' : 
                category === 'new-arrival' ? 'new-arrival-placeholder.jpg' :
                'default-placeholder.jpg'
            }`;
            // const folder = categoryFolders[category] || "unisex";
            // const imagePath = `/collections/images/${folder}/${subcategory}/${type}/${type}-${color}`;

            // const possiblePaths = extensions.map(ext => `${imagePath}.${ext}`);
            
            generatedProducts.push({
                id: productId,
                name: `${subcategory === 'male' ? "Men's" : 
                    subcategory === 'female' ? "Women's" :
                    subcategory === 'kids-male' ? "Boys" :
                    subcategory === 'kids-female' ? "Girls" : "Unisex"} ${baseName} ${color}`,
                price: parseFloat(price),
                image: imagePath, // will use possiblePaths when i load all the images
                category: category,
                subcategory: subcategory,
                type: type,
                color: color,
                size: size,
                isNew: isNew,
                isOnSale: isOnSale,
                popularity: Math.floor(Math.random() * 10) + 1
            });
            console.log(`Generated image path for ${productId}: ${imagePath}`);
        }
        return generatedProducts;
    }
    // DOM Elements
    const collectionsGrid = document.getElementById('collections');
    const sortBySelect = document.getElementById('sort-by');
    const categorySelect = document.getElementById('category');
    const subcategorySelect = document.getElementById('subcategory');
    const sizeSelect = document.getElementById('size');
    const resetButton = document.getElementById('reset-filters');
    const loadingIndicator = document.getElementById('loading-indicator');

    // Initial render
    renderProducts(products);

    // Event listeners
    [sortBySelect, categorySelect, subcategorySelect, sizeSelect].forEach(select => {
        select.addEventListener('change', function() {
            loadingIndicator.style.display = 'flex';
            setTimeout(() => {
                handleFilterChange();
            }, 100);
        });
    });

    resetButton.addEventListener('click', resetFilters);

    // Filter and render functions
    function handleFilterChange() {
        try {
            const filteredProducts = filterProducts();
            renderProducts(filteredProducts);
        } catch (error) {
            console.error("Filtering error:", error);
            collectionsGrid.innerHTML = '<p class="no-products">Error loading products. Please try again.</p>';
        } finally {
            loadingIndicator.style.display = 'none';
        }
    }

    function filterProducts() {
        const sortValue = sortBySelect.value;
        const categoryValue = categorySelect.value;
        const subcategoryValue = subcategorySelect.value;
        const sizeValue = sizeSelect.value;
        
        let filtered = [...products];
        
        if (categoryValue !== 'all') {
            if (categoryValue === 'new') {
                filtered = filtered.filter(product => product.isNew);
            } else if (categoryValue === 'sale') {
                filtered = filtered.filter(product => product.isOnSale);
            } else {
                filtered = filtered.filter(product => product.category === categoryValue);
            }
        }
        
        if (subcategoryValue !== 'all') {
            filtered = filtered.filter(product => product.subcategory === subcategoryValue);
        }
        
        if (sizeValue !== 'all') {
            filtered = filtered.filter(product => product.size === sizeValue);
        }
        
        switch(sortValue) {
            case 'newest':
                filtered.sort((a, b) => b.isNew - a.isNew);
                break;
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'popular':
                filtered.sort((a, b) => b.popularity - a.popularity);
                break;
            default:
                break;
        }
        
        return filtered;
    }

    function renderProducts(productsToRender) {
        collectionsGrid.innerHTML = '';
        
        if (productsToRender.length === 0) {
            collectionsGrid.innerHTML = '<p class="no-products">No products match your filters.</p>';
            return;
        }
        
        productsToRender.forEach(product => {
            const genderLabel = product.subcategory === 'male' ? "Men's" : "Women's";
            const displayText = `${genderLabel} ${product.type.charAt(0).toUpperCase() + product.type.slice(1)}`;

            const productCard = document.createElement('div');
            productCard.className = 'product-card';


            const imageContainer = document.createElement('div');
            imageContainer.className = 'product-image';
            
            const img = document.createElement('img');
            img.alt = displayText;

            const tryImage = (index = 0) => {
                if (index < product.image.length) {
                    img.onerror = () => tryImage(index + 1);
                    img.src = product.image[index];
                } else{
                    img.src = '/collections/images/placeholders/default-placeholder.jpg';
                    img.onerror = null;
                }
            };

            tryImage(0);

            if (product.isOnSale) {
                imageContainer.innerHTML = `<span class="sale-badge">SALE</span>`;
            }

            if (product.lyNew) {
                imageContainer.innerHTML = `<span class="new-badge">NEW</span>`;
            }
            imageContainer.appendChild(img);

            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${displayText}" 
                        onerror="this.onerror=null;this.src='/collections/images/placeholders/premium-placeholder.jpg'">
                    ${product.isOnSale ? '<span class="sale-badge">SALE</span>' : ''}
                    ${product.isNew ? '<span class="new-badge">NEW</span>' : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-details">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        <span class="product-size" data-size="${product.size.toUpperCase()}">${product.size.toUpperCase()}</span>
                    </div>
                    <a href="/products/products.html?id=${product.id}" class="shop-now-button">View Details</a>
                    <button class="add-to-cart" data-id="${product.id}">Shop Now</button>
                </div>
            `;
            collectionsGrid.appendChild(productCard);
        });

        // Add event listeners to all "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                addToCart(productId);
            });
        });
    }

    // Cart functionality
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    size: product.size,
                    quantity: 1
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = `/products/products.html?id=${productId}`;
        }
    }

    function resetFilters() {
        sortBySelect.value = 'newest';
        categorySelect.value = 'all';
        subcategorySelect.value = 'all';
        sizeSelect.value = 'all';
        loadingIndicator.style.display = 'flex';
        setTimeout(() => {
            handleFilterChange();
        }, 100);
    }

    // Mobile menu toggle
    document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        const isExpanded = navMenu.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
        this.setAttribute('aria-label', isExpanded ? 'Close navigation' : 'Open navigation');
    });
});