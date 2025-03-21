// PROJECTOS DE EL PORTFOLIO

const projects = [
    {
        category: 'multifamily',
        link: '2900 W Broward/2900 W Broward.html',
        image: 'img/Broaward.webp',
        title: '2900 W Broward',
        subtitle: 'Fort Lauderdale, FL'
    },
    {
        category: 'commercial',
        link: 'B&D/B&D.html',
        image: 'img/BbD.webp',
        title: 'B&D Trap',
        subtitle: 'Fort Lauderdale, FL'
    },
    {
        category: 'mixed-use',
        link: 'One Nine Vine/One Nine Vine.html',
        image: 'img/OneNineVine.webp',
        title: 'One Nine Vine',
        subtitle: 'Kansas, MO'
    },
    {
        category: 'multifamily',
        link: 'Gardner/Gardner.html',
        image: 'img/Gardner.webp',
        title: 'Gardner',
        subtitle: 'Kansas, MO'
    },
    {
        category: 'mixed-use',
        link: 'Pompano/1207 Pompano.html',
        image: 'img/pompano.webp',
        title: '1207 Pompano',
        subtitle: 'Pompano Beach, FL'
    },
    {
        category: 'multifamily',
        link: '475 Riverland/475 Riverland.html',
        image: 'img/Riverland.webp',
        title: '475 Riverland Apartments',
        subtitle: 'Fort Lauderdale, FL'
    },
    {
        category: 'mixed-use',
        link: 'One Nine Vine II/One Nine Vine II.html',
        image: 'img/OneNineVine2.webp',
        title: 'One Nine Vine II',
        subtitle: 'Kansas, MO'
    },
    
    // Agrega más proyectos según sea necesario
];

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

$(window).scroll(function() {
    if ($(window).scrollTop() > 50) {
        $('#navbar').addClass('scrolled');
    } else {
        $('#navbar').removeClass('scrolled');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////

const filterButtons = document.querySelectorAll('.filter-button');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Obtener el valor del filtro desde el atributo data-filter
        const filterValue = button.getAttribute('data-filter');
        
        // Llamar a la función de filtrado y generación de tarjetas
        filterAndGenerateCards(filterValue);
        
        // Actualizar la clase activa en los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active'); // Resaltar el botón activo
    });
});

// FUNCION QUE CREA LAS tarjetas

function createProjectCard(id, category, projectLink, image, title, subtitle) {
    // Determinar el tamaño de la tarjeta según el ID
    const size = (id === 1 || id === 6 || id === 7) ? 'large-card' : 'small-card';

    // Crear el contenedor de la tarjeta
    const card = document.createElement('div');
    card.className = `${size} project-card`; // Asignar clases según el tamaño
    card.setAttribute('data-category', category);
    card.setAttribute('data-id', id);

    // Crear el enlace
    const link = document.createElement('a');
    link.href = projectLink; // Cambia esto según sea necesario

    // Crear la imagen del proyecto
    const projectImage = document.createElement('div');
    projectImage.className = 'project-image';
    projectImage.style.backgroundImage = `url('${image}')`; // Asignar la imagen

    // Crear la información del proyecto
    const projectInfo = document.createElement('div');
    projectInfo.className = 'project-info';

    // Crear el título
    const projectTitle = document.createElement('h4');
    projectTitle.className = 'project-title';
    projectTitle.textContent = title; // Asignar el título

    // Crear el subtítulo
    const projectSubtitle = document.createElement('p');
    projectSubtitle.className = 'project-subtitle';
    projectSubtitle.textContent = subtitle; // Asignar el subtítulo

    // Agregar el título y subtítulo a la información del proyecto
    projectInfo.appendChild(projectTitle);
    projectInfo.appendChild(projectSubtitle);

    // Agregar la imagen y la información al enlace
    link.appendChild(projectImage);
    link.appendChild(projectInfo);

    // Agregar el enlace a la tarjeta
    card.appendChild(link);

    return card; // Devolver la tarjeta creada
}

// FUNCION QUE LLAMA A CREAR LAS TARJETAS Y MUESTRA SOLAMENTE LAS QUE ESTEN EN LA CATEGORIA
function filterAndGenerateCards(filterCategory) {
    // Filtrar los proyectos según la categoría seleccionada
    const filteredProjects = projects.filter(project => {
        return filterCategory === 'all' || project.category === filterCategory;
    });

    // Limpiar el contenedor antes de agregar las nuevas tarjetas
    const projectCatalog = document.querySelector('.collage-container');
    projectCatalog.innerHTML = ''; // Limpiar el contenido existente

    // Generar y agregar las tarjetas filtradas al contenedor
    filteredProjects.forEach((project, index) => {
        const card = createProjectCard(
            index + 1, // Autoincrementar el ID
            project.category,
            project.link,
            project.image,
            project.title,
            project.subtitle
        );
        projectCatalog.appendChild(card);

        // Usar setTimeout para permitir que la tarjeta se renderice antes de agregar la clase visible
        setTimeout(() => {
            card.classList.add('visible');
        }, 10); // Un pequeño retraso para permitir que el navegador procese el DOM
    });

    // Llamar a la función para ajustar la altura y posición de las tarjetas
    adjustCollageHeightAndPositionCards();
}

// FUNCION NECESARIA PARA CALCULAR LA ALTURA DEL CONTENEDOR
function calculateHeight(rows) {
    if (rows <= 0) {
        return 0;
    }

    // Calcular la altura de la fila actual
    let currentHeight = (rows % 2 === 0) ? 0.25 : 0.5;
    return (currentHeight + calculateHeight(rows - 1));
}

// AJUSTA ALTURA DE CONTENEDOR Y POSICION DE LAS TARJETAS
function adjustCollageHeightAndPositionCards() {
    const collageContainer = document.querySelector('.collage-container');
    const cards = collageContainer.querySelectorAll('.large-card, .small-card');

    // Obtener el ID más alto de las tarjetas
    let maxId = 0;
    cards.forEach(card => {
        const cardId = parseInt(card.getAttribute('data-id'));
        if (cardId > maxId) {
            maxId = cardId;
        }
    });

    // Calcular el número de filas
    const rowCount = Math.ceil(maxId / 3); // Número de filas
    
    // Calcular la nueva altura usando la fórmula
    const windowWidth = collageContainer.clientWidth;
    const newHeight = (calculateHeight(rowCount) * windowWidth); // (rowCount * 3/4 * ancho de pantalla)

    // Aplicar la nueva altura al contenedor
    collageContainer.style.height = `${newHeight}px`;

    // Obtener el ancho y la altura del contenedor
    const containerWidth = collageContainer.clientWidth

    cards.forEach(card => {
        const cardId = parseInt(card.getAttribute('data-id')); // Obtener el ID como número
        const column = (cardId - 1) % 6; // Determina la columna de 0 a 5
        const row = Math.floor((cardId - 1) / 6); // Determinar la fila (1-indexed)

        // Calcular la posición top
        const topPosition = (containerWidth / 2) * (row); // Multiplicar por (row - 1) para obtener la posición correcta
        const topsix = (topPosition/2);
        
        // Asignar las posiciones
        switch (column) {
            case 0:
                card.style.top = `${(0 + row) * (containerWidth * 3 / 4)}px`; // Posición en la parte superior
                card.style.left = "0px"; // A la izquierda
                break;
            case 1:
                card.style.top = `${(0 + row) * (containerWidth * 3 / 4)}px`; // Posición en la parte superior
                card.style.left = "50%"; // A la derecha de la tarjeta grande
                break;
            case 2:
                card.style.top = `${(0 + row) * (containerWidth * 3 / 4)}px`; // Posición en la parte superior
                card.style.left = "75%"; // A la derecha de la tarjeta grande
                break;
            case 3:
                card.style.top = `${(1 + row) * (containerWidth / 2)}px`; // Debajo de la tarjeta grande
                card.style.left = "0px"; // A la izquierda
                break;
            case 4:
                card.style.top = `${(1 + row) * (containerWidth / 2)}px`; // Debajo de la tarjeta grande
                card.style.left = "25%"; // A la derecha de la tarjeta pequeña de la izquierda
                break;
            case 5:
                card.style.top = `${(1 + row) * (containerWidth / 4)}px`; // Debajo de las pequeñas
                card.style.left = "50%"; // A la izquierda
                break;
            default:
                break;
        }
    });
}

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

// Llamar a la función al cargar la página
window.addEventListener('load', () => {
    handleResize();
    if (window.innerWidth >= 1024)
        // Llamar a la función inicialmente para mostrar todos los proyectos
        filterAndGenerateCards(category);
});

// Llamar a la función al redimensionar la ventana
window.addEventListener('resize', () => {
    handleResize();
    if (window.innerWidth >= 1024)
        adjustCollageHeightAndPositionCards()
});

// FUNCION PARA ACTIVAR Y DESACTIVAR LA VERSION PC Y MOBILE
function handleResize() {
    const projectFilter = document.querySelector('.project-filter');
    const catalogSection = document.querySelector('.project-catalog');
    const mobileFilter = document.querySelector('.mobile-filter');
    const mobileCatalogSection = document.querySelector('.mobile-catalog');

    if (window.innerWidth < 1024) {
        // Ocultar la sección del catálogo y desactivar funciones
        catalogSection.classList.add('hidden');
        projectFilter.classList.add('hidden');
        mobileCatalogSection.classList.remove('hidden');
        mobileFilter.classList.remove('hidden');
        

        // Aquí puedes desactivar las funciones que no quieres que se ejecuten
        // Por ejemplo, puedes eliminar los event listeners o no llamar a las funciones
    } else {
        // Mostrar la sección del catálogo y ocultar la sección móvil
        catalogSection.classList.remove('hidden');
        projectFilter.classList.remove('hidden');
        mobileCatalogSection.classList.add('hidden');
        mobileFilter.classList.add('hidden');

        // Aquí puedes volver a activar las funciones si es necesario
        // Por ejemplo, puedes volver a agregar los event listeners
    }
}

// Función para filtrar las tarjetas
function filterProjects(filterCategory) {
    const cards = document.querySelectorAll('.mobile-card'); // Seleccionar todas las tarjetas

    cards.forEach(card => {
        const category = card.getAttribute('data-category'); // Obtener la categoría de la tarjeta

        // Mostrar u ocultar la tarjeta según la categoría seleccionada
        if (filterCategory === 'all' || category === filterCategory) {
            card.style.display = 'block'; // Mostrar tarjeta
        } else {
            card.style.display = 'none'; // Ocultar tarjeta
        }
    });
}

// Agregar event listeners a los botones de filtro
const filterMobileButtons = document.querySelectorAll('.filter-mobile-button');

filterMobileButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter'); // Obtener el valor del filtro
        filterProjects(filterValue); // Llamar a la función de filtrado

        // Resaltar el botón activo
        filterMobileButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active'); // Agregar clase activa al botón seleccionado
    });
});

// Llamar a la función inicialmente para mostrar todos los proyectos
filterProjects('all');