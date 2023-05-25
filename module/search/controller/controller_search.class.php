<?php
    class controller_search {

        function search_brand() {
            // echo json_encode("hola search_brand");
            echo json_encode(common::load_model('search_model', 'get_search_brand'));
        }

        function search_model_null() {
            // echo json_encode('hola search_model_null');
            echo json_encode(common::load_model('search_model', 'get_search_model_null'));
        }
        
        function search_model() {
            // echo json_encode('hola search_model');
            echo json_encode(common::load_model('search_model', 'get_search_model', $_POST['brand']));
        }

        function autocomplete() {
            // echo json_encode($_POST['sdata']);
            echo json_encode(common::load_model('search_model', 'get_autocomplete', $_POST['sdata']));
        }
    }
?>