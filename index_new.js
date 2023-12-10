document.addEventListener('DOMContentLoaded', function() {
    const cipherLinks = document.querySelectorAll('.cipher-button');

    setInterval(function() {
        cipherLinks.forEach(function(link) {
            const randomXHref = Math.floor(Math.random() * 41) - 20;
            const randomYHref = Math.floor(Math.random() * 41) - 20;

            link.style.transform = `translate(${randomXHref}px, ${randomYHref}px)`;

            const randomXContent = Math.floor(Math.random() * 41) - 20;
            const randomYContent = Math.floor(Math.random() * 41) - 20;

            link.innerHTML = `<span style="transform: translate(${randomXContent}px, ${randomYContent}px)">${link.textContent}</span>`;
        });
    }, 5000); // Change the interval time (in milliseconds) as needed
});
