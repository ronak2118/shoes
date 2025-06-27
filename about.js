document.addEventListener('DOMContentLoaded', () => {
    const portfolioButtons = document.querySelectorAll('.portfolio-btn');
    const modal = document.getElementById('portfolioModal');
    const closeModalBtn = document.querySelector('.close-button'); // Renamed to avoid conflict with function
    const portfolioModalBody = document.querySelector('.portfolio-modal-body');

    // Sample data for team members' portfolios
    const teamPortfolios = {
        
        

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
