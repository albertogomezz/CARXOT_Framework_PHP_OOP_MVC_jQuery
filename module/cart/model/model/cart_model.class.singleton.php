<?php
    class cart_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = cart_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_load_cart($args) {
            return $this -> bll -> get_load_cart_BLL($args);
        }

        public function get_delete_cart($args) {
            // return $args;
            return $this -> bll -> get_delete_cart_BLL($args);
        }

        public function get_sumar_qty($args) {
            // return 'hola car type';
            return $this -> bll -> get_sumar_qty_BLL($args);
        }

        public function get_restar_qty($args) {
            // return 'hola car type';
            return $this -> bll -> get_restar_qty_BLL($args);
        }

        public function get_insert_cart($args) {
            // return 'hola car type';
            return $this -> bll -> get_insert_cart_BLL($args);
        }

        public function get_checkout($args) {
            // return $args;
            return $this -> bll -> get_checkout_BLL($args);
        }
    }
?>