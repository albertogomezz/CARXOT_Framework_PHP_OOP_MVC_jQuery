<?php
    class controller_cart {
        function view() {
            // echo VIEW_PATH_HOME;
            common::load_view('top_page_cart.html', VIEW_PATH_CART . 'cart.html');
        }

        function load_cart() {
            // echo json_encode('Dentro de load_cart php');
            echo json_encode(common::load_model('cart_model', 'get_load_cart', $_POST['token']));
        }

        function delete_cart() {
            // echo json_encode('Dentro de delete cart');
            echo json_encode(common::load_model('cart_model', 'get_delete_cart', [$_POST['id_car'], $_POST['token']]));
        }

        function insert_cart() {
            // echo json_encode("dentro insert cart");
            echo json_encode(common::load_model('cart_model', 'get_insert_cart', [$_POST['id_car'], $_POST['token']]));
        }

        function sumar_qty() {
            // echo json_encode('Dentro de sumar qty');
            echo json_encode(common::load_model('cart_model', 'get_sumar_qty', [$_POST['id_car'], $_POST['token']]));
        }

        function restar_qty() {
            // echo json_encode('Dentro de visited');
            echo json_encode(common::load_model('cart_model', 'get_restar_qty', [$_POST['id_car'], $_POST['token']]));
        }

        function checkout() {
            // echo json_encode('Dentro de checkout');
            echo json_encode(common::load_model('cart_model', 'get_checkout', $_POST['token']));
        }
    }
?>