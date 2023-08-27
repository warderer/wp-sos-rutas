<?php
/**
 * Plugin Name: Buscador de Rutas SOS de la Isla
 * Description: Plugin para mostrar los horarios disponibles para una colonia.
 * Version: 2.25
 * Author: Artice: Agencia de Diseño
 */

function enqueue_custom_scripts() {
    if (is_page('rutas')) {
        wp_enqueue_script('colonia-horarios-script', plugin_dir_url(__FILE__) . 'sos_rutas.js', array(), '1.0', true);
        // Cargar el archivo CSS
        wp_enqueue_style('colonia-horarios-styles', plugin_dir_url(__FILE__) . 'sos_styles.css', array(), '1.0');
        // Pasar la URL del plugin al script
        wp_localize_script('colonia-horarios-script', 'colHorariosPluginData', array('plugin_url' => plugin_dir_url(__FILE__)));
    }
}
add_action('wp_enqueue_scripts', 'enqueue_custom_scripts');

function mostrar_formulario_colonia() {
    ob_start();
    ?>
    <form id="colonia-form" class="rutasForm">
        <select id="colonia-select" name="colonia" class="rutasForm__select">
            <option value="">Selecciona una colonia o calle</option>
        </select>
        <input type="submit" value="Buscar" class="rutasForm__buttonSubmit" />
    </form>
    <div id="resultado-horarios" class="rutasForm__resultados"></div>
    <?php
    return ob_get_clean();
}
add_shortcode('colonia_horarios_form', 'mostrar_formulario_colonia');