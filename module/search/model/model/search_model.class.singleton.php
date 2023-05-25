<?php
    class search_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = search_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_search_brand() {
            // return 'get_search_brand';
            return $this -> bll -> get_search_brand_BLL();
        }

        public function get_search_model_null() {
            // return "get search model null";
            return $this -> bll -> get_search_model_null_BLL();
        }

        public function get_search_model($args) {
            // return $args;
            return $this -> bll -> get_search_model_BLL($args);
        }

        public function get_autocomplete($args) {
            // return $args;
            return $this -> bll -> get_autocomplete_BLL($args);
        }
    }
?>