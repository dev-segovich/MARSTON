
let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${-currentSlide * 100}%)`;
    });
}

function moveSlide(direction) {
    showSlide(currentSlide + direction);
}

// Muestra el primer slide al cargar
showSlide(currentSlide);
