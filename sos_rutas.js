document.addEventListener('DOMContentLoaded', function () {
    // Obtener la URL completa del archivo JSON utilizando la función del plugin
    const jsonFileURL = colHorariosPluginData.plugin_url + '/sos_rutas.json';

    // Cargar y parsear el archivo JSON para obtener las colonias disponibles
    fetch(jsonFileURL)
        .then(response => response.json())
        .then(data => {
            const coloniasSelect = document.getElementById('colonia-select');

            // Obtener todas las colonias disponibles y eliminar duplicados
            let coloniasDisponibles = [];
            data.horarios.forEach(horario => {
                horario.rutas.forEach(ruta => {
                    coloniasDisponibles = coloniasDisponibles.concat(ruta.destinos);
                });
            });
            coloniasDisponibles = [...new Set(coloniasDisponibles)];

            // Ordenar las colonias alfabéticamente
            coloniasDisponibles.sort();

            // Agregar opciones al select
            coloniasDisponibles.forEach(colonia => {
                const option = document.createElement('option');
                option.value = colonia;
                option.textContent = colonia;
                coloniasSelect.appendChild(option);
            });
        });

    // Manejar el envío del formulario
    const form = document.getElementById('colonia-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const coloniaSelect = document.getElementById('colonia-select');
        const coloniaSeleccionada = coloniaSelect.value;

        // Obtener el horario para la colonia seleccionada
        fetch(jsonFileURL)
            .then(response => response.json())
            .then(data => {
                let horariosEncontrados = [];

                data.horarios.forEach(horario => {
                    horario.rutas.forEach(ruta => {
                        if (ruta.destinos.includes(coloniaSeleccionada)) {
                            horariosEncontrados.push({
                                dias: horario.dias,
                                horario: horario.horario,
                                ruta: ruta.nombre
                            });
                        }
                    });
                });

                // Mostrar los horarios encontrados en el DOM
                const resultadoHorarios = document.getElementById('resultado-horarios');
                resultadoHorarios.innerHTML = '';

                if (horariosEncontrados.length > 0) {
                    horariosEncontrados.forEach(horario => {
                        const p = document.createElement('p');
                        // p.textContent = `Colonia: ${coloniaSeleccionada}, Ruta: ${horario.ruta}, Días: ${horario.dias}, Horario: ${horario.horario}`;
                        p.innerHTML = `En ${coloniaSeleccionada}, pasa la ${horario.ruta}, los días:<br> <span class="rutasForm__resultadoDias">${horario.dias}</span>, en <span class="rutasForm__resultadoHorario">${horario.horario}</span>`;
                        resultadoHorarios.appendChild(p);
                    });
                } else {
                    const p = document.createElement('p');
                    p.textContent = 'No se encontraron horarios para la colonia seleccionada.';
                    resultadoHorarios.appendChild(p);
                }
            });
    });
});