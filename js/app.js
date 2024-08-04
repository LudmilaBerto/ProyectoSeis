// Vinculo URL base de API star wars de Peliculas

function peliculas() {
    fetch('https://swapi.dev/api/films/')
    .then(response => response.json())
    .then (response => mostrarPeliculas(response.results))
    
}

function mostrarPeliculas(peliculas){
    const tarjeta=document.querySelector('#contenedorPeliculas')
    for( let pelicula of peliculas){
        tarjeta.innerHTML+=`<div class="contenedortarjetaPersonajes">
                                <h3>${pelicula.episode_id}. ${pelicula.title}</h3>
                                <p>${pelicula.opening_crawl}</p>
                                <h5>(${pelicula.director}, ${pelicula.release_date})</h5>

                            </div>`

    }
}

peliculas()

// Vinculo URL base de API star wars de Personajes

function personajes(){
    fetch('https://swapi.dev/api/people/')
    .then(response => response.json())
    .then(response => mostrarPersonajes(response.results))

}

function mostrarPersonajes(personajes){
    const tarjetaPersonaje=document.querySelector('#contenedor-personajes')

    for(let personaje of personajes){
        tarjetaPersonaje.innerHTML+=`<div class="tarjetaPersonaje">
                                    <h3>${personaje.name}</h3>
                                    <p><b>Género:</b> ${personaje.gender}</p>
                                    </div> `
    }
    

    

}


personajes()

// -----------------------------------------------------------------------------------------------

// Vinculo URL base de API star wars de Naves espaciales.

function fetchNaves(){
    
    fetch('https://swapi.dev/api/starships/')
    .then(response => response.json())
    .then(response => mostrarNaves(response.results))


}

function mostrarNaves(Naves){

    const tarjetaNave=document.querySelector('#contenedor-naves')
   
    for(let Nave of Naves){
        let pasajeros= Nave.passengers==='n/a'? 'no hay datos': Nave.passengers
        let velocidadMaxAtmosfera= Nave.max_atmosphering_speed==='n/a'? 'no hay datos': Nave.max_atmosphering_speed

        tarjetaNave.innerHTML+=`<div class="tarjetaNave">
                                <h3>${Nave.name}</h3>
                                <p><b>Tipo de Nave Espacial: </b>${Nave.starship_class}</p>
                                <p><b>Modelo: </b>${Nave.model}</p>
                                <p><b>Fabricante: </b>${Nave.manufacturer}</p>
                                <p><b>Pasajeros: </b>${pasajeros}</p>
                                <p><b>Velocidad máx. de atmósfera: </b>${velocidadMaxAtmosfera}</p>
                                <p><b>Capacidad de carga: </b>${Nave.cargo_capacity}</p>
                                </div>`
    }

}

fetchNaves()

// -----------------------------------------------------------------------------------------------

// Vinculo URL base de API star wars de PLANETAS.

function fetchPlanetas(){

    fetch('https://swapi.dev/api/planets/')
    .then(response=>response.json())
    .then(response => mostrarPlanetas(response.results))

}

function mostrarPlanetas(planetas){
    const tarjetaPlaneta=document.querySelector('#contenedor-planetas')


    for(let planeta of planetas){
      
        let gravedad= planeta.gravity==='N/A'? 'no hay datos definidos': planeta.gravity

        tarjetaPlaneta.innerHTML+=`<div class="tarjetaPlaneta">
                                <h3>${planeta.name}</h3>
                                <p><b>Terreno: </b>${planeta.terrain}</p>
                                <p><b>Superficie del Agua: </b>${planeta.surface_water}</p>
                                <p><b>Periodo de Rotación: </b>${planeta.rotation_period}</p>
                                <p><b>Población: </b>${planeta.population}</p>
                                <p><b>Periodo Orbital: </b>${planeta.orbital_period}</p>
                                <p><b>Gravedad: </b>${gravedad}</p>
                                <p><b>Diametro: </b>${planeta.climate}</p>
                                </div>`
    }


}

fetchPlanetas()

