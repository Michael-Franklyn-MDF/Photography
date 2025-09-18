// Lightbox functionality for gallery images
// Adds modal overlay to enlarge images when clicked

document.addEventListener('DOMContentLoaded', function() {
  function createLightbox(imgSrc, altText) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.tabIndex = 0;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    // Create image
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = altText;
    img.className = 'lightbox-image';

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close');

    // Close on click or Escape
    function closeLightbox() {
      document.body.removeChild(overlay);
    }
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeLightbox();
    });
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeLightbox();
    });

    overlay.appendChild(img);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    overlay.focus();
  }

  // Attach to all gallery images
  const galleryImages = document.querySelectorAll('.favorite-grid img, .gallery-grid img');
  galleryImages.forEach(function(img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function() {
      createLightbox(img.src, img.alt);
    });
  });
});
