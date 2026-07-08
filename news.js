/* =========================================================
   NEWS.JS — Simple client-side search filter for news cards
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('news-search-input');
  const newsCards = document.querySelectorAll('.news-card');
  const emptyState = document.getElementById('news-empty');

  if (!searchInput || !newsCards.length) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    newsCards.forEach(card => {
      const title = card.dataset.title ? card.dataset.title.toLowerCase() : '';
      const match = title.includes(query);
      card.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });

    if (emptyState) emptyState.classList.toggle('show', visibleCount === 0);
  });
});
