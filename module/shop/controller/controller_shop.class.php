<?php
    class controller_shop {
        function view() {
            // echo VIEW_PATH_HOME;
            common::load_view('top_page_shop.html', VIEW_PATH_SHOP . 'shop.html');
        }

        function all_cars() {
            // echo json_encode("dentro de all_cars");
            echo json_encode(common::load_model('shop_model', 'get_all_cars', [$_POST['items'],$_POST['total_items']]));
        }

        function details_car() {
            // echo json_encode("dentro de details_car");
            echo json_encode(common::load_model('shop_model', 'get_details_car', $_POST['id_car']));
        }

        function filter() {
            // echo json_encode("dentro de filter");
            echo json_encode(common::load_model('shop_model', 'get_filter', [$_POST['filter'],$_POST['items'],$_POST['total_items']]));
        }

        function filters_search() {
            // echo json_encode("dentro de filters_search");
            echo json_encode(common::load_model('shop_model', 'get_filters_search'));
        }

        function contador_visitas() {
            // echo json_encode("dentro de contador_visitas");
            echo json_encode(common::load_model('shop_model', 'get_contador_visitas',$_POST['id_car']));
        }

        function count_all() {
            // echo json_encode("dentro de count_all");
            echo json_encode(common::load_model('shop_model', 'get_count_all'));
        }

        function count_home() {
            echo json_encode("dentro de count_home");
            // echo json_encode(common::load_model('shop_model', 'get_count_home'));
        }

        function count_shop() {
            // echo json_encode("dentro de count_shop");
            echo json_encode(common::load_model('shop_model', 'get_count_shop', $_POST['filter']));
        }

        function count_cars_related() {
            // echo json_encode("dentro de count_cars_related");
            echo json_encode(common::load_model('shop_model', 'get_count_cars_related', [$_POST['brand_name'],$_POST['id_car']]));
        }

        function coches_relacionados() {
            // echo json_encode("dentro de coches_relacionados");
            echo json_encode(common::load_model('shop_model', 'get_coches_relacionados',[$_POST['brand_name'],$_POST['id_car'],$_POST['items'],$_POST['total_items']]));
        }

        function control_likes() {
            // echo json_encode("dentro de control_likes");
            echo json_encode(common::load_model('shop_model', 'get_control_likes', [$_POST['id_car'],$_POST['token']]));
        }

        function load_likes_user() {
            // echo json_encode("dentro de load_likes_user");
            echo json_encode(common::load_model('shop_model', 'get_load_likes_user', $_POST['token']));
        }
    }
?>