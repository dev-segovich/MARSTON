
    $(document).ready(function() {
        // Agregar un evento de clic a los enlaces del navbar
        $('.navbar-nav a').on('click', function(event) {

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
    

    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('#navbar').addClass('scrolled');
        } else {
            $('#navbar').removeClass('scrolled');
        }
    });

    const projectContainer = document.querySelector('.project-container');

    const proyecto1Link = document.querySelector('.proyecto1-link');
    const proyecto2Link = document.querySelector('.proyecto2-link');
    const proyecto3Link = document.querySelector('.proyecto3-link');
    
    const proyecto1Imagen = document.querySelector('.proyecto1');
    const proyecto2Imagen = document.querySelector('.proyecto2');
    const proyecto3Imagen = document.querySelector('.proyecto3');
    
    const proyecto1Columna = document.querySelector('.proyecto1-link .project-image');
    const proyecto2Columna = document.querySelector('.proyecto2-link .project-image');
    const proyecto3Columna = document.querySelector('.proyecto3-link .project-image');

    const proyecto1Info = document.querySelector('.proyecto1-info');
    const proyecto2Info = document.querySelector('.proyecto2-info');
    const proyecto3Info = document.querySelector('.proyecto3-info');

    projectContainer.addEventListener('mouseout', () => {
        proyecto1Imagen.style.opacity = 0;
        proyecto2Imagen.style.opacity = 0;
        proyecto3Imagen.style.opacity = 0;
        proyecto1Columna.style.opacity = 1;
        proyecto2Columna.style.opacity = 1;
        proyecto3Columna.style.opacity = 1;
        proyecto1Info.style.opacity = 1;
        proyecto2Info.style.opacity = 1;
        proyecto3Info.style.opacity = 1;
    });

    proyecto1Link.addEventListener('mouseover', () => {
      proyecto1Imagen.style.opacity = 1;
      proyecto2Imagen.style.opacity = 0;
      proyecto3Imagen.style.opacity = 0;
      proyecto1Columna.style.opacity = 0;
      proyecto2Columna.style.opacity = 0;
      proyecto3Columna.style.opacity = 0;
      proyecto1Info.style.opacity = 1;
      proyecto2Info.style.opacity = 0.1;
      proyecto3Info.style.opacity = 0.1;
    });
    
    proyecto2Link.addEventListener('mouseover', () => {
      proyecto1Imagen.style.opacity = 0;
      proyecto2Imagen.style.opacity = 1;
      proyecto3Imagen.style.opacity = 0;
      proyecto1Columna.style.opacity = 0;
      proyecto2Columna.style.opacity = 0;
      proyecto3Columna.style.opacity = 0;
      proyecto1Info.style.opacity = 0.1;
      proyecto2Info.style.opacity = 1;
      proyecto3Info.style.opacity = 0.1;
    });
    
    proyecto3Link.addEventListener('mouseover', () => {
      proyecto1Imagen.style.opacity = 0;
      proyecto2Imagen.style.opacity = 0;
      proyecto3Imagen.style.opacity = 1;
      proyecto1Columna.style.opacity = 0;
      proyecto2Columna.style.opacity = 0;
      proyecto3Columna.style.opacity = 0;
      proyecto1Info.style.opacity = 0.1;
      proyecto2Info.style.opacity = 0.1;
      proyecto3Info.style.opacity = 1;
    });

