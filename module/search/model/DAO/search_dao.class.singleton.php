<?php
    class search_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_data_search_brand($db) {
            // return 'select_data_search_brand';

            $sql= "SELECT * FROM brand;";
            // return $sql;
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_search_model_null($db) {
            // return 'hola select data search model null';

            $sql= "SELECT * FROM model";
            
            // return $sql;
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_search_model($db,$brand) {
			// return 'hola select data type';

			$sql= "SELECT *
            FROM car c, model m, brand b
            WHERE m.id_model = c.model 
            AND  m.brand = b.id_brand
            AND b.name_brand = '$brand'";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_only_city($db, $city) {
            // return $city;

            $sql="SELECT *
            FROM car c , model m
            WHERE c.model = m.id_model
            AND c.city LIKE '$city%'";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_city_model($db, $city, $model) {
            // return $city;
            $sql= "SELECT *
            FROM car c , model m
            WHERE c.model = m.id_model
            AND m.name_model = '$model' 
            AND c.city LIKE '$city%'";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_brand_model($db, $model) {
            // return $city;
            $sql= "SELECT *
            FROM car c , model m
            WHERE c.model = m.id_model
            AND m.name_model = '$model'"; 
            
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_all($db,$city,$model,$brand) {
            // return $city;

            $sql="SELECT *
            FROM car c , model m
            WHERE c.model = m.id_model
            AND m.name_model = '$model'
            AND c.city LIKE '$city%'"; 

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

    }
?>