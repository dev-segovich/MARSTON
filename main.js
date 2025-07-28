const isLocalhost = window.location.hostname === "localhost";
const basePath = isLocalhost ? "/MARSTON/" : "/";

document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar-container");

    // Si el navbar se carga dinámicamente (todas las páginas excepto index)
    if (navbarContainer) {
    fetch(basePath + "navbar.html")
        .then(res => res.text())
        .then(html => {
        navbarContainer.innerHTML = html;
        initNavbar(navbarContainer); // NUEVO
        });
    } else {
    // Si el navbar ya está en el DOM (index.html)
    const navbar = document.querySelector("nav.navbar");
    if (navbar) initNavbar(document);
    }

    function initNavbar(scope) {
    // Ajustar enlaces del navbar
    scope.querySelectorAll("a.nav-link").forEach(link => {
        const href = link.getAttribute("href");
        if (href && !href.startsWith("http") && !href.startsWith("#")) {
        link.setAttribute("href", basePath + href.replace(/^\//, ""));
        }
    });

    // Ajustar logo
    const logo = scope.querySelector(".navbar-logo");
    if (logo) logo.setAttribute("src", basePath + "img/Logo.webp");

    const logoLink = scope.querySelector(".logo-link");
    if (logoLink) logoLink.setAttribute("href", basePath + "index.html");

    // Cargar idioma por defecto
    const defaultLang = localStorage.getItem("lang") || "en";
    loadLanguage(defaultLang);

    // Eventos de idioma
    scope.querySelectorAll(".lang-option").forEach(option => {
        option.addEventListener("click", e => {
        e.preventDefault();
        const selectedLang = option.getAttribute("data-lang");
        loadLanguage(selectedLang);
        });
    });
    }
});


// SCROLL SUAVE DEL INDEX
$(document).ready(function() {
  $('.navbar-nav a').on('click', function(event) {
    const target = $(this).attr('href');

    // Si es el selector de idioma, no interceptar
    if ($(this).hasClass('lang-option')) return;

    // Ignorar enlaces vacíos o que sean solo "#"
    if (!target || target === "#") return;

    // Si es un ancla interna
    if (target.startsWith('#')) {
      event.preventDefault();
      const $target = $(target);
      if ($target.length) {
        $('html, body').animate({
          scrollTop: $target.offset().top - 110
        }, 800);
      }
    }
  });
});


// CAROUSEL DE IMAGENES
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

// ANIMACION DE LAS 3 COLUMNAS DEL PORTFOLIO EN INDEX
const projectContainer = document.querySelector('.project-container');

if (projectContainer) {
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
        proyecto2Info.style.opacity = 0.3;
        proyecto3Info.style.opacity = 0.3;
    });

    proyecto2Link.addEventListener('mouseover', () => {
        proyecto1Imagen.style.opacity = 0;
        proyecto2Imagen.style.opacity = 1;
        proyecto3Imagen.style.opacity = 0;
        proyecto1Columna.style.opacity = 0;
        proyecto2Columna.style.opacity = 0;
        proyecto3Columna.style.opacity = 0;
        proyecto1Info.style.opacity = 0.3;
        proyecto2Info.style.opacity = 1;
        proyecto3Info.style.opacity = 0.3;
    });

    proyecto3Link.addEventListener('mouseover', () => {
        proyecto1Imagen.style.opacity = 0;
        proyecto2Imagen.style.opacity = 0;
        proyecto3Imagen.style.opacity = 1;
        proyecto1Columna.style.opacity = 0;
        proyecto2Columna.style.opacity = 0;
        proyecto3Columna.style.opacity = 0;
        proyecto1Info.style.opacity = 0.3;
        proyecto2Info.style.opacity = 0.3;
        proyecto3Info.style.opacity = 1;
    });
}


// ANIMACION DEL INDEX DE LOS TEXTOS EN PC
document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.querySelectorAll('.filling-box'); // Selecciona todos los contenedores de títulos
    boxes.forEach(box => {
        const title = box.querySelector('.filling-title'); // Selecciona el título dentro del contenedor
        const fillingText = box.nextElementSibling ? box.nextElementSibling.querySelector('.filling-text') : null; // Selecciona el texto correspondiente

        box.addEventListener('mouseenter', function() {
            title.style.transform = 'scaleX(0)'; // Comprime el título
            
            // Esperar a que la animación de desaparición del texto termine
            setTimeout(() => {
                if (fillingText) {
                    fillingText.style.opacity = '1'; // Mostrar el texto
                    fillingText.style.transform = 'translateX(0)'; // Mover a la posición final
                } else {
                    // Si no hay fillingText, busca el anterior
                    const prevFillingText = box.previousElementSibling ? box.previousElementSibling.querySelector('.filling-text') : null;
                    if (prevFillingText) {
                        prevFillingText.style.opacity = '1'; // Mostrar el texto
                        prevFillingText.style.transform = 'translateX(0)'; // Mover a la posición final desde la derecha
                    }
                }
            }, 500); // Esperar 500ms (la duración de la animación)
        });

        box.addEventListener('mouseleave', function() {
            if (fillingText) {
                fillingText.style.opacity = '0'; // Ocultar el texto
                fillingText.style.transform = 'translateX(-100%)'; // Mover a la posición final
            } else {
                // Si no hay fillingText, busca el anterior
                const prevFillingText = box.previousElementSibling ? box.previousElementSibling.querySelector('.filling-text') : null;
                if (prevFillingText) {
                    prevFillingText.style.opacity = '0'; // Ocultar el texto
                    prevFillingText.style.transform = 'translateX(100%)'; // Mover a la posición final hacia la derecha
                }
            }

            // Esperar a que la animación de desaparición del texto termine
            setTimeout(() => {
                title.style.transform = 'scaleX(1)'; // Restablecer la transformación del título
            }, 500); // Esperar 500ms (la duración de la animación)
        });
    });
});

// FILTRO DE TARJETAS DE PORTFOLIO
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        const cards = document.querySelectorAll('.project-card');

        cards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block'; // Mostrar tarjeta
            } else {
                card.style.display = 'none'; // Ocultar tarjeta
            }
        });
    });
});

// SELECTOR DE LENGUAJE
// Cargar el idioma por defecto desde localStorage o usar "en" si no está definido

function loadLanguage(lang) {
  const page = document.body.getAttribute("data-page") || "index"; // Por defecto 'index'
  
  fetch(basePath + `lang/${lang}.json`)
    .then((res) => res.json())
    .then((translations) => {
      const commonTranslations = translations.common || {};
      const pageTranslations = translations[page] || {};

      // Combinar traducciones comunes + específicas
      const merged = { ...commonTranslations, ...pageTranslations };

      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const translation = merged[key];

        if (translation) {
          if ((el.tagName === "INPUT" || el.tagName === "TEXTAREA") && el.hasAttribute("placeholder")) {
            // Si es input/textarea con placeholder
            el.placeholder = translation;
          } else if (el.tagName === "OPTION") {
            // Si es una opción de <select>
            el.textContent = translation;
          } else {
            // Para el resto de elementos
            el.innerHTML = translation;
          }
        }
      });

      const currentLang = document.getElementById("current-language");
      if (currentLang) currentLang.innerText = lang.toUpperCase();
      localStorage.setItem("lang", lang);
    })
    .catch(err => console.error("Error loading language:", err));
}


