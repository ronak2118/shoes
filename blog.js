document.addEventListener('DOMContentLoaded', () => {
    // Sticky Header
    const header = document.querySelector('.main-header');
    const headerOffset = header.offsetTop;

    function stickyHeader() {
        if (window.pageYOffset > headerOffset) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }
    window.addEventListener('scroll', stickyHeader);

    
    
    // Blog Post Content Data
    const blogPosts = {
        "evolution": {
            title: "The Evolution of Running Shoes: From Tracks to Streets",
            date: "May 15, 2025",
            author: "By ShoeExpert",
            comments: "15 Comments",
            image: "images/evolution.png",
            content: [
                "The history of running shoes is a fascinating journey of innovation and technology. In the early 20th century, running shoes were simple leather creations with minimal cushioning. The 1950s saw the introduction of rubber soles, which provided better traction and durability. However, the real revolution came in the 1970s with the advent of modern running shoes featuring cushioned midsoles and specialized designs for different foot types.",
                "Today's running shoes are marvels of engineering, incorporating advanced materials like ethylene-vinyl acetate (EVA) foam for cushioning, carbon fiber plates for energy return, and breathable mesh uppers for ventilation. Brands continuously push boundaries with technologies like Nike's Air cushioning, Adidas' Boost foam, and Asics' Gel system. The future promises even more personalized footwear with 3D printing and smart shoes that can analyze your running form in real-time."
            ]
        },
        "sneaker-trends": {
            title: "Top Sneaker Trends for Summer 2025",
            date: "May 10, 2025",
            author: "By TrendSpotter",
            comments: "8 Comments",
            image: "images/sneaker trend.png",
            content: [
                "Summer 2025 brings a fresh wave of sneaker trends that blend comfort with cutting-edge style. The 'chunky dad shoe' trend continues but with a sleeker twist, as brands like Balenciaga and New Balance introduce streamlined versions of their popular models. Pastel colorways dominate the scene, with mint green, lavender, and soft pink being particularly popular for warm-weather outfits.",
                "Sustainability remains a key focus, with many brands launching eco-conscious collections featuring recycled materials. Adidas' partnership with Parley for the Oceans yields stylish sneakers made from upcycled ocean plastic, while Allbirds introduces a new plant-based leather alternative. Another notable trend is the rise of 'convertible' sneakers - shoes with interchangeable components that let you customize your look daily."
            ]
        },
        "boot-care": {
            title: "Essential Tips for Maintaining Your Leather Boots",
            date: "May 02, 2025",
            author: "By LeatherMaster",
            comments: "12 Comments",
            image: "images/maintain leather boot.png",
            content: [
                "Proper care can extend the life of your leather boots by years. The first rule is regular cleaning - remove dirt and salt stains after each wear using a soft brush or damp cloth. For deeper cleaning, use a leather-specific cleaner and follow with a conditioner to keep the leather supple. Always let your boots dry naturally away from direct heat sources, which can cause the leather to crack.",
                "Waterproofing is crucial for leather boots. Apply a quality waterproofing treatment every few months, paying special attention to seams and stitching. For scuffs and scratches, use a matching leather cream to blend them in. Store your boots with cedar shoe trees to maintain their shape and absorb moisture. With proper care, a good pair of leather boots can last a decade or more, developing a beautiful patina over time."
            ]
        },
        "sustainable": {
            title: "Sustainable Footwear: Walking Towards a Greener Future",
            date: "April 28, 2025",
            author: "By EcoWarrior",
            comments: "22 Comments",
            image: "images/greener future.png",
            content: [
                "The footwear industry is undergoing a sustainability revolution as consumers demand more eco-friendly options. Traditional shoe manufacturing is resource-intensive, with a single pair typically generating 30 pounds of carbon emissions. In response, innovative brands are pioneering new approaches. Veja uses organic cotton and wild rubber from the Amazon, while Rothy's transforms recycled plastic bottles into stylish flats. Even major players like Nike and Adidas have committed to using 100% recycled polyester in their shoes by 2030.",
                "Beyond materials, companies are rethinking the entire product lifecycle. Some offer repair services to extend shoe life, while others like Thousand Fell have implemented full-circle recycling programs where old shoes are broken down and remade into new ones. The future may see more biodegradable shoes and rental models that reduce overall consumption. As technology advances, sustainable footwear is becoming more accessible and affordable without compromising on style or performance."
            ]
        },
        "formal-guide": {
            title: "A Gentleman's Guide to Choosing Formal Shoes",
            date: "April 20, 2025",
            author: "By StyleCounselor",
            comments: "7 Comments",
            image: "images/gentalman.png",
            content: [
                "Selecting the right formal shoes is essential for any well-dressed gentleman. Oxfords are the most formal option, with their closed lacing system making them perfect for black-tie events and important business meetings. Derbies, with their open lacing, offer slightly more flexibility and are ideal for less formal business settings. For summer events or creative workplaces, loafers provide a sophisticated yet relaxed alternative.",
                "Color is crucial in formal footwear. Black is the most formal and versatile, pairing well with navy, gray, and black suits. Brown shoes offer more personality and work well with earth tones and navy suits (but avoid with black suits). Burgundy is an excellent choice for adding subtle flair. Always match your belt to your shoes, and invest in quality leather that will develop character over time. Remember, well-maintained mid-range shoes look better than neglected expensive ones."
            ]
        },
        // Additional posts for categories and recent posts
        "outfit-pairing": {
            title: "The Art of Shoe Pairing for Outfits",
            date: "April 15, 2025",
            author: "By StyleGuru",
            comments: "9 Comments",
            image: "images/outfit-pairing.jpg",
            content: [
                "Matching shoes to outfits is both an art and a science. The key is to consider color, formality, and proportion. For neutral outfits, use shoes to add a pop of color - red loafers with a navy suit or yellow sneakers with black jeans. With patterned or colorful outfits, opt for neutral shoes that don't compete for attention. The formality of your shoes should match the occasion - oxfords for formal events, derbies for business casual, and sneakers for relaxed settings.",
                "Proportion matters too. Slim-cut pants pair best with sleek shoes, while wider-leg trousers need more substantial footwear to balance the silhouette. For women, the color of your shoes should either match your skin tone for leg-lengthening effect or your outfit for a cohesive look. Remember that shoes can make or break an outfit, so take time to consider all elements before stepping out."
            ]
        },
        "material-innovations": {
            title: "Innovations in Sustainable Shoe Materials",
            date: "April 10, 2025",
            author: "By TechInnovator",
            comments: "14 Comments",
            image: "images/material-innovations.jpg",
            content: [
                "The quest for sustainable footwear has led to remarkable material innovations. Mushroom leather (mycelium) is gaining popularity as a cruelty-free alternative that's biodegradable yet durable. Pineapple leaf fibers (Piñatex) create a leather-like material while supporting farming communities. Some brands are even using apple waste from juice production to make vegan leather. For soles, algae-based foams and natural rubber from sustainable sources are replacing petroleum-based compounds.",
                "Recycled materials are also transforming the industry. Ocean plastics are being spun into yarns for uppers, while recycled car tires find new life as rugged outsoles. Some companies are experimenting with 3D printing to minimize waste in production. These innovations not only reduce environmental impact but often result in lighter, more comfortable shoes. As these technologies scale, sustainable materials will become the norm rather than the exception."
            ]
        },
        "design-process": {
            title: "Behind the Scenes: Our Shoe Design Process",
            date: "April 5, 2025",
            author: "By DesignDirector",
            comments: "6 Comments",
            image: "images/design-process.jpg",
            content: [
                "Creating a new shoe design is a complex journey that typically takes 12-18 months from concept to store shelves. It begins with trend research and consumer insights to identify market needs. Designers then sketch hundreds of concepts, refining them through multiple iterations. The most promising designs move to 3D modeling, where proportions and details are perfected digitally. Physical prototypes are then created, often through a combination of handcraft and 3D printing.",
                "Testing is rigorous, with wear-testers logging hundreds of miles to evaluate comfort and durability. Materials are selected not just for aesthetics but for performance and sustainability. The final production involves coordinating with factories to ensure quality while meeting ethical standards. Throughout this process, designers balance innovation with commercial viability, creating shoes that push boundaries while appealing to real-world consumers. It's this careful alchemy that results in footwear that's both beautiful and functional."
            ]
        },
        "walking-shoes": {
            title: "Comfort Meets Style: The Best Walking Shoes",
            date: "March 28, 2025",
            author: "By ComfortExpert",
            comments: "18 Comments",
            image: "images/walking-shoes.jpg",
            content: [
                "Finding walking shoes that combine all-day comfort with stylish appeal can be challenging. For city walking, look for lightweight shoes with ample cushioning and arch support. Brands like Ecco and Clarks excel at combining orthopedic principles with contemporary designs. The best walking shoes have flexible soles that allow natural foot movement while providing shock absorption for hard pavements.",
                "For travelers, versatile shoes that transition from day to night are ideal. Slip-ons with memory foam insoles offer convenience without sacrificing support. Look for breathable materials to keep feet comfortable in various climates. Many stylish options now incorporate running shoe technology, giving you performance benefits without the athletic look. Remember to replace walking shoes every 300-500 miles, as worn-out cushioning can lead to foot pain and joint issues."
            ]
        }
    };

    // Modal functionality
    const modal = document.getElementById('postModal');
    const modalContent = document.getElementById('modalPostContent');
    const closeModal = document.querySelector('.close-modal');

    function openModal(postId) {
        const post = blogPosts[postId];
        if (!post) return;

        modalContent.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="post-meta">
                <span><i class="far fa-calendar-alt"></i> ${post.date}</span>
                <span><i class="far fa-user"></i> ${post.author}</span>
                <span><i class="far fa-comment"></i> ${post.comments}</span>
            </div>
            <h2>${post.title}</h2>
            ${post.content.map(paragraph => `<p>${paragraph}</p>`).join('')}
        `;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });


    // Read More buttons - fixed selector
    const readMoreButtons = document.querySelectorAll('[data-post]');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const postId = button.getAttribute('data-post');
            if (postId && blogPosts[postId]) {
                openModal(postId);
            }
        });
    });

    

     // Search functionality - fixed
     const searchInput = document.querySelector('.search-bar input[type="text"]');
     const searchButton = document.querySelector('.search-bar button');
     const blogPostCards = document.querySelectorAll('.blog-post-card, .featured-post');
 
     function performSearch() {
         const searchTerm = searchInput.value.toLowerCase().trim();
         
         blogPostCards.forEach(post => {
             const title = post.querySelector('h2, h3').textContent.toLowerCase();
             const content = post.querySelector('p').textContent.toLowerCase();
             
             if (searchTerm === '' || title.includes(searchTerm) || content.includes(searchTerm)) {
                 post.style.display = 'block';
             } else {
                 post.style.display = 'none';
             }
         });
     }
 
     if (searchButton && searchInput) {
         searchButton.addEventListener('click', performSearch);
         searchInput.addEventListener('keypress', (e) => {
             if (e.key === 'Enter') performSearch();
         });
     }

     // Category filtering - fixed
     const categoryLinks = document.querySelectorAll('[data-category]');
     categoryLinks.forEach(link => {
         link.addEventListener('click', (e) => {
             e.preventDefault();
             const category = link.getAttribute('data-category');
             
             blogPostCards.forEach(post => {
                 const title = post.querySelector('h2, h3').textContent.toLowerCase();
                 const content = post.querySelector('p').textContent.toLowerCase();
                 
                 if (category === 'all') {
                     post.style.display = 'block';
                     return;
                 }
 
                 // Improved category matching
                 const matchesCategory = (
                     (category === 'sneaker' && (title.includes('sneaker') || content.includes('sneaker'))) ||
                     (category === 'care' && (title.includes('care') || title.includes('maintain') || content.includes('care'))) ||
                     (category === 'trends' && (title.includes('trend') || content.includes('trend'))) ||
                     (category === 'brands' && (content.includes('brand') || content.includes('nike') || content.includes('adidas'))) ||
                     (category === 'running' && (title.includes('running') || content.includes('running')))
                 );
 
                 post.style.display = matchesCategory ? 'block' : 'none';
             });
         });
     });

     // Tag filtering - fixed
    const tagLinks = document.querySelectorAll('[data-tag]');
    tagLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tag = link.getAttribute('data-tag');
            
            blogPostCards.forEach(post => {
                const title = post.querySelector('h2, h3').textContent.toLowerCase();
                const content = post.querySelector('p').textContent.toLowerCase();
                
                post.style.display = (title.includes(tag) || content.includes(tag)) ? 'block' : 'none';
            });
        });
    });
});