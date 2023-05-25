<?php
    class shop_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = shop_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_all_cars($args) {
            // return $args;
            return $this -> bll -> get_all_cars_BLL($args);
        }

        public function get_details_car($args) {
            // return $args;
            return $this -> bll -> get_details_car_BLL($args);
        }

        public function get_filter($args) {
            // return $args;
            return $this -> bll -> get_filter_BLL($args);
        }

        public function get_filters_search() {
            // return 'hola car most visited';
            return $this -> bll -> get_filters_search_BLL();
        }

        public function get_contador_visitas($args) {
            // return 'hola car most visited';
            return $this -> bll -> get_contador_visitas_BLL($args);
        }

        public function get_count_all() {
            // return 'hola car most visited';
            return $this -> bll -> get_count_all_BLL();
        }

        public function get_count_home() {
            // return 'hola car most visited';
            return $this -> bll -> get_count_home_BLL();
        }

        public function get_count_shop($args) {
            // return $args;
            return $this -> bll -> get_count_shop_BLL($args);
        }

        public function get_count_cars_related($args) {
            // return $args;
            return $this -> bll -> get_count_cars_related_BLL($args);
        }

        public function get_coches_relacionados($args) {
            // return $args;
            return $this -> bll -> get_coches_relacionados_BLL($args);
        }

        public function get_control_likes($args) {
            // return $args;
            return $this -> bll -> get_control_likes_BLL($args);
        }

        public function get_load_likes_user($args) {
            // return 'hola car most visited';
            return $this -> bll -> get_load_likes_user_BLL($args);
        }
    }
?>