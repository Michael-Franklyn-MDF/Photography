// Lightbox functionality for gallery images
// Adds modal overlay to enlarge images when clicked

document.addEventListener('DOMContentLoaded', function() {

  // Get all gallery images for navigation
  const galleryImages = document.querySelectorAll('.favorite-grid img, .gallery-grid img');

  function createLightbox(imgSrc, altText) {
    // Find current image index
    let currentIndex = Array.from(galleryImages).findIndex(img => img.src === imgSrc);

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

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-next';
    nextBtn.innerHTML = '&#8594;';
    nextBtn.setAttribute('aria-label', 'Next image');

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-prev';
    prevBtn.innerHTML = '&#8592;';
    prevBtn.setAttribute('aria-label', 'Previous image');

    function closeLightbox() {
      document.body.removeChild(overlay);
    }

    function showImage(index) {
      if (index < 0) index = galleryImages.length - 1;
      if (index >= galleryImages.length) index = 0;
      img.src = galleryImages[index].src;
      img.alt = galleryImages[index].alt;
      currentIndex = index;
    }

    nextBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      showImage(currentIndex + 1);
    });
    prevBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      showImage(currentIndex - 1);
    });

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeLightbox();
    });
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
      if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    });

    overlay.appendChild(img);
    overlay.appendChild(prevBtn);
    overlay.appendChild(nextBtn);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    overlay.focus();
  }

  // Attach to all gallery images
  galleryImages.forEach(function(img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function() {
      createLightbox(img.src, img.alt);
    });
  });
});
