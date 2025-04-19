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




document.querySelector(".mobile-menu-toggle").addEventListener('click', function(){
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');

    this.classList.toggle('active');

    const isExpanded = navMenu.classList.contains('active');
    this.setAttribute('aria-expanded', isExpanded);
    this.setAttribute('aria-label', isExpanded ? 'Close navigation' : 'Open navigation');
});

document.querySelector('.contact-form').addEventListener('submit', function(e){
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon');

    this.reset();
})