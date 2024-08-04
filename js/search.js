const apiUrl = 'https://swapi.dev/api/';
const categorias = {
    'films': 'peliculas',
    'people': 'personajes',
    'starships': 'navesespaciales',
    'planets': 'planetas'
};

// Función para buscar en la API
async function buscarEnApi(query, category) {
    const url = `${apiUrl}${category}/?search=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

// Función para mostrar sugerencias
async function mostrarSugerencias() {
    const query = document.getElementById('inputBuscador').value.trim();
    const sugerenciasDiv = document.getElementById('sugerencias');
    sugerenciasDiv.innerHTML = ''; // Limpiar sugerencias previas

    if (query === '') {
        sugerenciasDiv.style.display = 'none'; // Ocultar si no hay texto
        return;
    }

    let resultadosTotales = [];

    for (let categoria in categorias) {
        const resultados = await buscarEnApi(query, categoria);
        resultados.forEach(result => {
            resultadosTotales.push({ ...result, category: categoria });
        });
    }

    resultadosTotales.forEach(result => {
        const div = document.createElement('div');
        div.classList.add('sugerencia');
        div.textContent = result.name || result.title;
        div.dataset.category = result.category;
        div.dataset.id = result.url; // Guardar la URL para usarla más tarde
        div.addEventListener('click', () => {
            mostrarResultados(result); // Mostrar resultados detallados del resultado seleccionado
        });
        sugerenciasDiv.appendChild(div);
    });

    sugerenciasDiv.style.display = 'block'; // Mostrar sugerencias
}

// Función para mostrar resultados detallados
async function mostrarResultados(selectedResult) {
    const query = selectedResult.name || selectedResult.title;
    const categoria = selectedResult.category;

    // Ocultar el contenido no relacionado
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });

    // Obtener el ID del contenedor de resultados
    const contenedorId = `contenedor${capitalizeFirstLetter(categorias[categoria])}`;
    const contenedor = document.getElementById(contenedorId);
    if (contenedor) {
        contenedor.innerHTML = ''; // Limpiar contenedor
        const resultados = await buscarEnApi(query, categoria);
        resultados.forEach(result => {
            const item = document.createElement('div');
            item.classList.add('resultado');
            item.innerHTML = `<h3>${result.name || result.title}</h3>
                              <p>${result.description || 'No hay descripción disponible'}</p>`;
            contenedor.appendChild(item);
        });

        // Mostrar la sección de resultados en la parte superior de la página
        const resultadoSection = document.querySelector(`#${categorias[categoria]}`);
        if (resultadoSection) {
            resultadoSection.style.display = 'block';
            resultadoSection.scrollIntoView({ behavior: 'smooth' }); // Desplazar hacia la sección de resultados
        }
    }

    // Ocultar las sugerencias
    document.getElementById('sugerencias').style.display = 'none';
}

// Función para capitalizar la primera letra de una cadena
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Función para volver a mostrar la página de inicio
function mostrarPaginaInicio() {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('inicio').style.display = 'block'; // Mostrar la sección de inicio
}

// Eventos del buscador
document.getElementById('inputBuscador').addEventListener('input', mostrarSugerencias);

document.getElementById('BotonBuscar').addEventListener('click', (e) => {
    e.preventDefault();
    realizarBusqueda();
});

document.getElementById('inputBuscador').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        realizarBusqueda();
    }
});

// Funcionalidad para el icono de la "equis" en el input
const equisInput = document.getElementById('equis-input');
const inputBuscador = document.getElementById('inputBuscador');
const sugerenciasDiv = document.getElementById('sugerencias');

inputBuscador.addEventListener('keyup', () => {
    if (inputBuscador.value.length > 0) {
        equisInput.style.display = 'block';
    } else {
        equisInput.style.display = 'none';
        sugerenciasDiv.innerHTML = ''; // Limpiar sugerencias al borrar el texto
    }
});

equisInput.addEventListener('click', () => {
    inputBuscador.value = '';
    equisInput.style.display = 'none';
    sugerenciasDiv.innerHTML = ''; // Limpiar sugerencias al borrar el texto
});

// Botón para volver a la página de inicio (añadir en el HTML)
document.getElementById('volverInicio').addEventListener('click', mostrarPaginaInicio);
