<?php
    class home_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_data_brand($db) {
            // return 'hola select data brand';

			$sql= "SELECT * FROM `brand` ORDER BY name_brand ASC LIMIT 30";

            // return $sql;
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_category($db) {
            // return 'hola select data bodywork';

            // return $db;
			$sql= "SELECT * FROM bodywork";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_type($db) {
			// return 'hola select data type';

			$sql= "SELECT *FROM type_motor ORDER BY cod_tmotor DESC";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_most_visited($db) {
			// return 'hola select data most visited';

            $sql = "SELECT * FROM car ORDER BY count DESC LIMIT 4";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }
    }
?>