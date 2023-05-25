<?php
    class controller_home {
        function view() {
            // echo VIEW_PATH_HOME;
            common::load_view('top_page_home.html', VIEW_PATH_HOME . 'home.html');
        }

        function brand_carrusel() {
            // echo json_encode("dentro de brand");
            echo json_encode(common::load_model('home_model', 'get_brand'));
        }

        function bodywork() {
            // echo json_encode('Dentro de bodywork');
            echo json_encode(common::load_model('home_model', 'get_category'));
        }
        
        function type() {
            // echo json_encode('Dentro de type');
            echo json_encode(common::load_model('home_model', 'get_type'));
        }

        function most_visited() {
            // echo json_encode('Dentro de visited');
            echo json_encode(common::load_model('home_model', 'get_most_visited'));
        }
    }
?>