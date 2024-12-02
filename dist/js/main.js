document.addEventListener('DOMContentLoaded', () => {
    // Мобильное меню
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.header__btn');

    function toggleMenu() {
        sidebar.classList.toggle('sidebar--open');
        menuToggle.classList.toggle('header__btn--active');
        document.body.style.overflow = sidebar.classList.contains('sidebar--open') ? 'hidden' : '';
    }

    menuToggle?.addEventListener('click', toggleMenu);

    // Анимация появления элементов
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    fadeElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });

    // Поиск
    const searchInput = document.querySelector('.search__input');
    const tableRows = document.querySelectorAll('.table tbody tr');

    searchInput?.addEventListener('input', (e) => {
        const searchText = e.target.value.toLowerCase();

        tableRows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchText) ? '' : 'none';
        });
    });

    // Пагинация
    const paginationPages = document.querySelectorAll('.pagination__page');
    
    paginationPages.forEach(page => {
        page.addEventListener('click', () => {
            paginationPages.forEach(p => p.classList.remove('pagination__page--active'));
            page.classList.add('pagination__page--active');
        });
    });
});