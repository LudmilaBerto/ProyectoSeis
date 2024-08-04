// Le doy funcionalidad al formulario de contacto
document.addEventListener('DOMContentLoaded', () => {
    let btnEnviar = document.querySelector('#btnEnviar');
    let formRegistro = document.querySelector('#formContacto');

        // Validacion del form
    formRegistro.addEventListener('submit', function(e) {
        e.preventDefault();
   
        // Traigo form, input, boton...
        let nombre = document.querySelector('#nombre').value;
        let email = document.querySelector('#email').value;
        let areaTexto = document.querySelector('#areaTexto').value;
        // traigo las p para los mensajes de aviso
        let mensajeN = document.querySelector('#mensajeN');
        let mensajeE = document.querySelector('#mensajeE');
        let mensajeA = document.querySelector('#mensajeA');
        let mensajeExito = document.querySelector('#mensajeExito');

        let esValido = validarForm(nombre, email, areaTexto);
    });

    function validarForm(nombre, email, areaTexto) {
        if (nombre === "" || email === "" || areaTexto === "") {
            mensajeN.textContent = 'Por favor, complete todos los campos';
            mensajeE.textContent = 'Por favor, complete todos los campos';
            mensajeA.textContent = 'Por favor, complete todos los campos';
            return;
        } else {
            mensajeN.textContent = 'Los campos están llenos';
            mensajeE.textContent = 'Los campos están llenos';
            mensajeA.textContent = 'Los campos están llenos';
            mensajeExito.style.color = "green";
            mensajeExito.textContent = "Mensaje enviado";
            return;
        }
        return true;
    }

    btnEnviar.addEventListener('click', validarForm);
});
