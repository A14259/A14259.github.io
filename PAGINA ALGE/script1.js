// ================== HELPERS ==================
const $  = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================
  // 1) MENÚ RESPONSIVE + DROPDOWN ACCESIBLE
  // =========================================================
  const toggleBtn = $('.mobile-menu-toggle');
  const menu      = $('#primary-menu');
  const backdrop  = $('.nav-backdrop');
  const groups    = $$('.nav-group');
  const mqDesktop = window.matchMedia('(min-width: 993px)');

  function openMenu(){
    if (!menu || !backdrop || !toggleBtn) return;
    menu.classList.add('active');
    backdrop.hidden = false;
    requestAnimationFrame(()=> backdrop.classList.add('show'));
    toggleBtn.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu(){
    if (!menu || !backdrop || !toggleBtn) return;
    menu.classList.remove('active');
    backdrop.classList.remove('show');
    toggleBtn.setAttribute('aria-expanded','false');
    setTimeout(()=>{ backdrop.hidden = true; }, 200);
    document.body.style.overflow = '';
    // Cierra acordeones abiertos
    groups.forEach(g=>{
      g.classList.remove('open');
      const btn = $('.nav-dropdown-toggle', g);
      if(btn) btn.setAttribute('aria-expanded','false');
    });
  }

  if (toggleBtn && menu && backdrop) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = menu.classList.contains('active');
      isOpen ? closeMenu() : openMenu();
    });
    backdrop.addEventListener('click', closeMenu);
  }

  // Acordeón (móvil) para grupos con dropdown
  groups.forEach(group=>{
    const btn = $('.nav-dropdown-toggle', group);
    if(!btn) return;
    btn.addEventListener('click', (e)=>{
      if (mqDesktop.matches) return; // En desktop el hover muestra el dropdown
      e.preventDefault();
      const isOpen = group.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  // Cerrar menú al seguir un enlace (en móvil)
  if (menu) {
    $$('.nav-link, .nav-sublink', menu).forEach(a=>{
      a.addEventListener('click', () => { if(!mqDesktop.matches) closeMenu(); });
    });
  }

  // Al pasar a desktop, resetea estados
  mqDesktop.addEventListener('change', (e)=>{ if(e.matches) closeMenu(); });

  // =========================================================
  // 2) HERO CAROUSEL (fade entre videos)
  // =========================================================
  (function initHeroCarousel(){
    const slides      = $$('.carousel-slide');
    if (!slides.length) return;

    const prevButton  = $('.carousel-control.prev');
    const nextButton  = $('.carousel-control.next');
    const indicators  = $$('.indicator');
    let currentIndex  = 0;
    let slideInterval;

    function showSlide(index) {
      slides.forEach(s => s.classList.remove('active'));
      if (indicators.length) indicators.forEach(i => i.classList.remove('active'));
      slides[index].classList.add('active');
      if (indicators[index]) indicators[index].classList.add('active');
      currentIndex = index;
    }
    const nextSlide = () => showSlide((currentIndex + 1) % slides.length);
    const prevSlide = () => showSlide((currentIndex - 1 + slides.length) % slides.length);

    function startAutoSlide() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 20000); // 20s por slide
    }

    if (nextButton) nextButton.addEventListener('click', () => { clearInterval(slideInterval); nextSlide(); startAutoSlide(); });
    if (prevButton) prevButton.addEventListener('click', () => { clearInterval(slideInterval); prevSlide(); startAutoSlide(); });
    if (indicators.length) {
      indicators.forEach(ind => {
        ind.addEventListener('click', function(){
          const idx = parseInt(this.getAttribute('data-index')) || 0;
          clearInterval(slideInterval);
          showSlide(idx);
          startAutoSlide();
        });
      });
    }

    showSlide(currentIndex);
    startAutoSlide();
  })();

  // =========================================================
  // 3) CLIENTS CAROUSEL (cards horizontales)
  // =========================================================
  (function initClientsCarousel(){
    const carouselTrack     = $('.carousel-track');
    const clientCards       = $$('.client-card');
    const prevButtonClients = $('.clients-carousel .prev');
    const nextButtonClients = $('.clients-carousel .next');

    if (!carouselTrack || !clientCards.length || !prevButtonClients || !nextButtonClients) return;

    let currentIndex = 0;
    const gap = 20;
    const getCardWidth = () => (clientCards[0]?.offsetWidth || 300) + gap;
    const getVisible   = () => window.innerWidth < 768 ? 1 : (window.innerWidth < 992 ? 2 : 3);

    let cardWidth   = getCardWidth();
    let visibleCards = getVisible();

    function updateCarousel() {
      const translateX = -currentIndex * cardWidth;
      carouselTrack.style.transform = `translateX(${translateX}px)`;
      prevButtonClients.disabled = currentIndex === 0;
      nextButtonClients.disabled = currentIndex >= clientCards.length - visibleCards;
    }

    nextButtonClients.addEventListener('click', () => {
      if (currentIndex < clientCards.length - visibleCards) {
        currentIndex++;
        updateCarousel();
      }
    });
    prevButtonClients.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    window.addEventListener('resize', () => {
      cardWidth = getCardWidth();
      visibleCards = getVisible();
      currentIndex = Math.min(currentIndex, Math.max(0, clientCards.length - visibleCards));
      updateCarousel();
    });

    updateCarousel();
  })();

  // =========================================================
  // 4) ANIMACIONES ON-SCROLL (tarjetas)
  // =========================================================
  (function initScrollAnimations(){
    const animated = $$('.feature-card, .service-card, .client-card');
    if (!animated.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animated.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
  })();

  // =========================================================
  // 5) WHATSAPP FLOAT (opcional, con comprobaciones)
  // =========================================================
  (function initWhatsApp(){
    const whatsappButton   = $('#whatsappButton');
    const questionsContainer = $('#questionsContainer');
    const questionItems    = $$('.question-item');
    if (!whatsappButton || !questionsContainer) return;

    const whatsappNumber = '521234567890'; // <-- Cambia por tu número

    whatsappButton.addEventListener('click', () => {
      questionsContainer.classList.toggle('show');
      whatsappButton.classList.toggle('active');
    });

    questionItems.forEach(item => {
      item.addEventListener('click', function() {
        const question = this.getAttribute('data-question') || '';
        const message = encodeURIComponent(`Hola, tengo una consulta: ${question}`);
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        questionsContainer.classList.remove('show');
        whatsappButton.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      const isButton   = whatsappButton.contains(e.target);
      const isContainer= questionsContainer.contains(e.target);
      if (!isButton && !isContainer && questionsContainer.classList.contains('show')) {
        questionsContainer.classList.remove('show');
        whatsappButton.classList.remove('active');
      }
    });
  })();

  // =========================================================
  // 6) BLOQUE "STATES" (si existe en tu HTML). Evita errores si no está.
  // =========================================================
  (function initStates(){
    const states          = $$('.state');
    if (!states.length) return; // no hay mapa/estados en esta página

    const stateName       = $('#stateName');
    const clientCount     = $('#clientCount');
    const stateDescription= $('#stateDescription');
    const stateInfo       = $('#stateInfo');
    const stateDetails    = $('#stateDetails');

    states.forEach(state => {
      state.addEventListener('mouseover', function() {
        states.forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        const d = this.dataset;
        if (stateName) stateName.textContent = d.name || '';
        if (clientCount) clientCount.textContent = d.clients || '';
        if (stateDescription) stateDescription.textContent = d.description || '';
        if (stateInfo) stateInfo.classList.remove('active');
        if (stateDetails) stateDetails.classList.add('active');
      });

      state.addEventListener('click', function() {
        states.forEach(s => s.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // Estado por defecto (si existe)
    const nl = $('.state[data-name="Nuevo León"]');
    if (nl) {
      nl.classList.add('active');
      if (stateName) stateName.textContent = "Nuevo León";
      if (clientCount) clientCount.textContent = "12";
      if (stateDescription) stateDescription.textContent = "Sede de importantes empresas industriales";
      if (stateInfo) stateInfo.classList.remove('active');
      if (stateDetails) stateDetails.classList.add('active');
    }
  })();

});

// =========================================================
// MÚSICA DE FONDO
// =========================================================

const music = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
const notification =
document.getElementById('song-notification');

let isPlaying = false;

if (music && musicToggle) {

    // volumen suave
    music.volume = 0.25;

    musicToggle.addEventListener('click', () => {

        if (!isPlaying) {

            music.play();

            musicToggle.innerHTML =
                '<i class="fas fa-volume-up"></i>';

            musicToggle.classList.add('playing');

            isPlaying = true;

            notification.classList.add('show');

setTimeout(() => {
    notification.classList.remove('show');
}, 4000);

        } else {

            music.pause();

            musicToggle.innerHTML =
                '<i class="fas fa-volume-mute"></i>';

            musicToggle.classList.remove('playing');

            isPlaying = false;
        }
    });
}

function openVideo(videoSrc) {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("modalVideo");

    if (!modal || !video) return;

    video.pause();
    video.removeAttribute("src");
    video.load();

    video.src = videoSrc;
    modal.style.display = "flex";

    video.play();
}

document.querySelector(".close-video")?.addEventListener("click", () => {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("modalVideo");

    if (!modal || !video) return;

    video.pause();
    video.removeAttribute("src");
    video.load();

    modal.style.display = "none";
});