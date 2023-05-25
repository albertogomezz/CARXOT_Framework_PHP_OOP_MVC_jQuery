<?php
    class home_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = home_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_brand() {
            return $this -> bll -> get_brand_BLL();
        }

        public function get_category() {
            return $this -> bll -> get_category_BLL();
        }

        public function get_type() {
            // return 'hola car type';
            return $this -> bll -> get_type_BLL();
        }

        public function get_most_visited() {
            // return 'hola car most visited';
            return $this -> bll -> get_most_visited_BLL();
        }

    }
?>