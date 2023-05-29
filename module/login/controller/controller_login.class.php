<?php
    class controller_login {
        function view() {
            // echo json_encode("dentro de login");
            common::load_view('top_page_login.html', VIEW_PATH_LOGIN . 'login.html');
        }

        function recover_view() {

            common::load_view('top_page_login.html', VIEW_PATH_LOGIN . 'recover_pass.html');
        }

        function login() {
            // echo json_encode("dentro de all_cars");
            echo json_encode(common::load_model('login_model', 'get_login', [$_POST['usuario'],$_POST['passw']]));
        }

        function register() {
            // echo json_encode("dentro de register");
            echo json_encode(common::load_model('login_model', 'get_register', [$_POST['usuario'], $_POST['passw'], $_POST['email']]));
        }

        function data_user() {
            // echo json_encode($_POST['token']);
            echo json_encode(common::load_model('login_model', 'get_data_user', $_POST['token']));
        }
        
        function logout() {
            echo json_encode(common::load_model('login_model', 'get_logout'));
        }

        // ---------------- VERIFY EMAIL ---------------------

        function verify_email() {
            // echo json_encode($_POST['token_email']);
            echo json_encode(common::load_model('login_model', 'get_verify_email', $_POST['token_email']));
        }

        // ---------------  ACTIVITY USER ----------------------

        function activity() {
            echo json_encode(common::load_model('login_model', 'get_activity'));
        }

        function controluser() {
            echo json_encode(common::load_model('login_model', 'get_controluser' , $_POST['token']));
        }

        function refresh_token() {
            // echo json_encode("dentro de token");
            echo json_encode(common::load_model('login_model', 'get_refresh_token' , $_POST['token']));
        }

        function refresh_cookie() {
            // echo json_encode("dentro de cookies");
            echo json_encode(common::load_model('login_model', 'get_refresh_cookie'));
        }

        // ------------------ RECOVER PASSWD ----------------------

        function send_recover_email() {
            // echo json_encode('dentro de recover email');
            echo json_encode(common::load_model('login_model', 'get_send_recover_email', $_POST['correo']));
        }

        function verify_token() {
            // echo json_encode('dentro de verify token');
            echo json_encode(common::load_model('login_model', 'get_verify_token', $_POST['token_email']));
        }

        function new_password() {
            // echo json_encode('dentro de new password');
            echo json_encode(common::load_model('login_model', 'get_new_password', [$_POST['token_email'],$_POST['passwd']]));
        }

        // ------------------ SOCIAL LOGIN ------------------------

        function social_login() {
            // echo json_encode($_POST['user']);
            echo json_encode(common::load_model('login_model', 'get_social_login', $_POST['user']));
        }

    }
?>