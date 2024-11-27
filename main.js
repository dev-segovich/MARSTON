
    $(document).ready(function() {
        // Agregar un evento de clic a los enlaces del navbar
        $('.navbar-nav a').on('click', function(event) {
            // Prevenir el comportamiento predeterminado del enlace
            event.preventDefault();

            // Obtener el destino del enlace
            var target = $(this).attr('href');

            // Desplazarse suavemente a la sección correspondiente
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 800); // 800 es la duración de la animación en milisegundos
        });
    });


    let index = 0;

    function moveSlide(step) {
        const slides = document.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;
    
        // Asegura que el índice se mantenga dentro del rango
        index = (index + step + totalSlides) % totalSlides; 
    
        const carousel = document.querySelector('.carousel');
        const containerWidth = document.querySelector('.carousel-container').offsetWidth; // El ancho del contenedor
        carousel.style.transform = `translateX(${-index * containerWidth}px)`; // Usa el ancho del contenedor, no el de la imagen
    }
    

