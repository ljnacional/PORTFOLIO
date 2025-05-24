document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('page-container');

    function loadPage(url) {
        container.classList.add('fade-out');
        setTimeout(() => {
            fetch(url)
                .then(response => response.text())
                .then(html => {
                    // Extract just the part you want to insert
                    const temp = document.createElement('div');
                    temp.innerHTML = html;

                    const newContent = temp.querySelector('#page-container')?.innerHTML || temp.innerHTML;
                    container.innerHTML = newContent;

                    container.classList.remove('fade-out');
                    container.classList.add('fade-in');
                });
        }, 300);
    }

    // Intercept nav links
    document.querySelectorAll('a[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const url = link.getAttribute('data-page');
            history.pushState(null, '', url);
            loadPage(url);
        });
    });

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        loadPage(location.pathname);
    });

    // Initial load
    loadPage(location.pathname);
});
