document.addEventListener('DOMContentLoaded', () => {
    const portfolioButtons = document.querySelectorAll('.portfolio-btn');
    const modal = document.getElementById('portfolioModal');
    const closeModalBtn = document.querySelector('.close-button'); // Renamed to avoid conflict with function
    const portfolioModalBody = document.querySelector('.portfolio-modal-body');

    // Sample data for team members' portfolios
    const teamPortfolios = {
        
        priyanka: {
            image: 'images/priyanka.jpeg',
            name: 'Priyanka Kumari Sah',
            role: 'Head of Materials Innovation',
            about: "Priyanka is a pioneer in sustainable materials research, constantly seeking new eco-friendly solutions for our footwear. Her work is crucial in Shoe Haven's commitment to environmental responsibility and material excellence.",
            details: {
                name: 'Priyanka Kumari Sah',
                phone: '+977-9702147841',
                experience: '8 Years',
                address: 'Kathmandu',
                freelance: 'Available',
                behance: 'Priyanka Kumari Sah' // Example custom detail
            },
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#'
            },
            cv: '#'
        },
        anubhav: {
            image: 'images/anubhav.jpeg',
            name: 'Anubhav Pradhan',
            role: 'Production Manager',
            about: "Anubhav ensures every shoe we produce meets the highest standards of quality and efficiency. His expertise in supply chain management and manufacturing processes is vital to our seamless operation and timely deliveries.",
            details: {
                name: 'Anubhav Pradhan',
                phone: '+977-9745556666',
                experience: '12 Years',
                address: 'Budhanilkantha',
                freelance: 'Available',
                github: 'Anubhav Pradhan' // Example custom detail
            },
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#'
            },
            cv: '#'
        },
        pralon: {
            image: 'images/pralon.jpeg',
            name: 'Pralon Basnet',
            role: 'Marketing & Brand Strategist',
            about: "Pralon is the creative force behind our brand's voice and market presence. He crafts compelling narratives and campaigns that resonate with our customers, bringing the Shoe Haven story to life.",
            details: {
                name: 'Pralon Basnet',
                phone: '+977-9842474528',
                experience: '7 Years',
                address: 'Bhaktapur, Kathmandu',
                freelance: 'Available',
                instagram: 'Pralon Basnet' // Example custom detail
            },
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#'
            },
            cv: '#'
        }
    };

    // Function to open the modal and populate content
    function openPortfolioModal(memberId) {
        const memberData = teamPortfolios[memberId];

        if (memberData) {
            // Build the details grid dynamically
            let detailsHtml = '';
            for (const key in memberData.details) {
                // Capitalize first letter for display
                const label = key.charAt(0).toUpperCase() + key.slice(1);
                detailsHtml += `
                    <div class="portfolio-modal-detail-item">
                        <strong>${label}:</strong> ${memberData.details[key]}
                    </div>
                `;
            }

            // Build social links dynamically
            let socialHtml = '';
            if (memberData.social.facebook) {
                socialHtml += `<a href="${memberData.social.facebook}" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>`;
            }
            if (memberData.social.twitter) {
                socialHtml += `<a href="${memberData.social.twitter}" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>`;
            }
            if (memberData.social.linkedin) {
                socialHtml += `<a href="${memberData.social.linkedin}" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>`;
            }


            portfolioModalBody.innerHTML = `
                <img src="${memberData.image}" alt="${memberData.name}" class="portfolio-modal-image">
                <div class="portfolio-modal-info">
                    <h2>${memberData.name}</h2>
                    <p class="role">${memberData.role}</p>
                    <p class="portfolio-modal-about-me">
                        ${memberData.about}
                    </p>
                    <div class="portfolio-modal-details-grid">
                        ${detailsHtml}
                    </div>
                    <div class="portfolio-modal-social">
                        ${socialHtml}
                    </div>
                    <a href="${memberData.cv}" class="download-cv-btn" target="_blank">Download CV</a>
                </div>
            `;
            modal.classList.add('active'); // Use classList.add to show the modal
            document.body.style.overflow = 'hidden'; // Prevent scrolling the background
        }
    }

    // Event listener for opening the modal
    portfolioButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const memberId = event.target.closest('.team-member').dataset.memberId;
            openPortfolioModal(memberId);
        });
    });

    // Event listener for closing the modal using the 'x' button
    closeModalBtn.addEventListener('click', () => { // Use closeModalBtn here
        modal.classList.remove('active'); // Use classList.remove to hide the modal
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    // Close modal if user clicks outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) { // Check if the click is on the modal backdrop
            modal.classList.remove('active'); // Use classList.remove to hide the modal
            document.body.style.overflow = 'auto';
        }
    });
});