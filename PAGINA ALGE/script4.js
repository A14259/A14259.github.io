// FILTRO
document.querySelectorAll('.gallery-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;
        document.querySelectorAll('.gallery-card').forEach(card => {
            card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
        });
    });
});

// MODAL VARIABLES
const modal = document.getElementById('galleryModal');
const modalMediaContainer = document.getElementById('modalMediaContainer');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalDate = document.getElementById('modalDate');
let currentVideo = null;

// ABRIR MODAL
document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', () => {
        modal.style.display = 'block';
        modalMediaContainer.innerHTML = '';

        const title = card.querySelector('.gallery-title')?.textContent || '';
        const category = card.querySelector('.gallery-category')?.textContent || '';
        const date = card.querySelector('.gallery-date')?.textContent || '';

        modalTitle.textContent = title;
        modalCategory.textContent = category;
        modalDate.textContent = date;

        // VIDEO MP4
        if (card.classList.contains('video') && card.dataset.video) {
            const video = document.createElement('video');
            video.src = card.dataset.video;
            video.className = "modal-video";
            video.controls = true;
            modalMediaContainer.appendChild(video);
            currentVideo = video;
            return;
        }

        // IMAGEN O GIF
        const img = document.createElement('img');
        img.src = card.querySelector('.gallery-media').src;
        img.className = "modal-media";
        modalMediaContainer.appendChild(img);
    });
});

// CERRAR MODAL
document.querySelector('.close-modal').onclick = () => closeModal();
window.onclick = e => { if (e.target === modal) closeModal(); };

function closeModal(){
    modal.style.display = 'none';
    if(currentVideo){
        currentVideo.pause();
        currentVideo = null;
    }
}
