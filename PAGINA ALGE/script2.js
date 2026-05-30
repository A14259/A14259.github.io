// ================== HELPERS ==================
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

document.addEventListener('DOMContentLoaded', function () {

    // ================== MENÚ RESPONSIVE ==================
    const mobileMenuToggle = $('.mobile-menu-toggle');
    const navLinks = $('#primary-menu');
    const backdrop = $('.nav-backdrop');
    const groups = $$('.nav-group');
    const mqDesktop = window.matchMedia('(min-width: 993px)');

    function openMenu() {
        if (!navLinks) return;

        navLinks.classList.add('active');

        if (backdrop) {
            backdrop.hidden = false;
            requestAnimationFrame(() => backdrop.classList.add('show'));
        }

        if (mobileMenuToggle) {
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
        }

        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        if (!navLinks) return;

        navLinks.classList.remove('active');

        if (backdrop) {
            backdrop.classList.remove('show');

            setTimeout(() => {
                backdrop.hidden = true;
            }, 200);
        }

        if (mobileMenuToggle) {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }

        document.body.style.overflow = '';

        groups.forEach(group => {
            group.classList.remove('open');

            const btn = $('.nav-dropdown-toggle', group);

            if (btn) {
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function (e) {
            e.stopPropagation();

            navLinks.classList.contains('active')
                ? closeMenu()
                : openMenu();
        });
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeMenu);
    }

    groups.forEach(group => {
        const btn = $('.nav-dropdown-toggle', group);

        if (!btn) return;

        btn.addEventListener('click', function (e) {
            if (mqDesktop.matches) return;

            e.preventDefault();
            e.stopPropagation();

            const isOpen = group.classList.toggle('open');
            btn.setAttribute('aria-expanded', String(isOpen));
        });
    });

    if (navLinks) {
        $$('.nav-link:not(.nav-dropdown-toggle), .nav-sublink', navLinks).forEach(link => {
            link.addEventListener('click', function () {
                if (!mqDesktop.matches) closeMenu();
            });
        });
    }

    // ================== ANIMACIÓN ON SCROLL ==================
    const animatedElements = document.querySelectorAll('.mv-card, .value-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(element);
    });

    // ================== WHATSAPP FLOAT ==================
    const whatsappButton = document.getElementById('whatsappButton');
    const questionsContainer = document.getElementById('questionsContainer');
    const questionItems = document.querySelectorAll('.question-item');

    const whatsappNumber = '525573916947';

    if (whatsappButton && questionsContainer) {
        whatsappButton.addEventListener('click', function (e) {
            e.stopPropagation();
            questionsContainer.classList.toggle('show');
            this.classList.toggle('active');
        });

        questionItems.forEach(item => {
            item.addEventListener('click', function () {
                const question = this.getAttribute('data-question');
                const message = encodeURIComponent(`Hola, tengo una consulta: ${question}`);

                window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

                questionsContainer.classList.remove('show');
                whatsappButton.classList.remove('active');
            });
        });

        document.addEventListener('click', function (event) {
            const isButton = whatsappButton.contains(event.target);
            const isContainer = questionsContainer.contains(event.target);

            if (!isButton && !isContainer && questionsContainer.classList.contains('show')) {
                questionsContainer.classList.remove('show');
                whatsappButton.classList.remove('active');
            }
        });
    }
});
