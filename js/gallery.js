/* =========================================================
   GALLERY.JS — Filter grid + fullscreen modal viewer
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  /* ---------- Filter ---------- */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !match);
      });
    });
  });

  /* ---------- Modal Viewer ---------- */
  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');
  const modalPrev = document.getElementById('modal-prev');
  const modalNext = document.getElementById('modal-next');

  let currentIndex = 0;

  const getVisibleItems = () =>
    Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));

  const openModal = (index) => {
    const visible = getVisibleItems();
    currentIndex = index;
    const img = visible[currentIndex].querySelector('img');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  const showRelative = (offset) => {
    const visible = getVisibleItems();
    currentIndex = (currentIndex + offset + visible.length) % visible.length;
    const img = visible[currentIndex].querySelector('img');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
  };

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      const visible = getVisibleItems();
      const idx = visible.indexOf(item);
      openModal(idx);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalNext.addEventListener('click', () => showRelative(1));
  modalPrev.addEventListener('click', () => showRelative(-1));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') showRelative(1);
    if (e.key === 'ArrowLeft') showRelative(-1);
  });

});
