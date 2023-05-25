<?php
    class shop_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_data_all_cars($db, $items, $total_items) {

            $sql = "SELECT * 
			    FROM car c, model m
			    WHERE c.model = m.id_model 
			    ORDER BY c.count DESC
			    LIMIT $total_items, $items;";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_details_car($db, $id_car) {

            $sql = "SELECT c.*, ca.img_cars, bo.*, b.*, m.*, m.*, ty.*
            FROM car c , cars_img ca, bodywork bo , brand b, model m, type_motor ty
            WHERE c.id_car = ca.cod_car AND c.model = m.id_model AND m.brand = b.id_brand AND c.motor = ty.cod_tmotor AND c.bodywork = bo.id_bodywork
            AND id_car = $id_car;";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_filter($db,$filter,$items,$total_items) {

            // return $total_items;

            $sql = " SELECT c.* 
            FROM (SELECT * 
            FROM car c, brand b, model m, bodywork bo, type_motor ty
            WHERE m.brand = b.id_brand
            AND c.model = m.id_model
            AND c.bodywork = bo.id_bodywork
            AND c.motor = ty.cod_tmotor) AS c ";
            
                for ($i=0; $i < count($filter); $i++){
                    if ($i==0){

                        if ($filter[$i][0] == 'order'){
                            $sql.= " ORDER BY " . $filter[$i][1] . " DESC";
                        } 

                        else {
                        $sql.= " WHERE c." . $filter[$i][0] . "= '" . $filter[$i][1] ."'";
                        }
                        
                    }else {

                        if ($filter[$i][0] == 'order'){
                        $sql.= " ORDER BY " . $filter[$i][1] . " DESC";
                        }

                        // MEJORA DEL FILTRO PARA SEARCH  PARA BUSCAR POR CITY
                        elseif ($filter[$i][0] == 'city') {
                            $sql.= " AND c." . $filter[$i][0] . " LIKE '" . $filter[$i][1] ."'";
                        }

                        elseif ($filter[$i][0] != 'city') {
                        $sql.= " AND c." . $filter[$i][0] . "= '" . $filter[$i][1] ."'";
                        }
                    }
                }
            
            $sql.= " LIMIT $total_items, $items";

            // return $sql;
            
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_contador_visitas($db, $id_car) {

            $sql = "UPDATE car c
            SET c.count = c.count + 1
            WHERE c.id_car = '$id_car'";

            // return $sql;
            $stmt = $db -> ejecutar($sql);
            // return $db -> listar($stmt);
        }

        public function select_data_count_all($db) {
            // return 'hola select data bodywork';

            // return $db;
			$sql = "SELECT COUNT(*) AS n_prod 
		    FROM car";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_count_shop($db, $filter) {
            // return 'hola select data bodywork';

            // return $args;
			$sql = " SELECT COUNT(*) AS n_prod
            FROM (SELECT * 
            FROM car c, brand b, model m, bodywork bo, type_motor ty
            WHERE m.brand = b.id_brand
            AND c.model = m.id_model
            AND c.bodywork = bo.id_bodywork
            AND c.motor = ty.cod_tmotor) AS c";
            
            for ($i=0; $i < count($filter); $i++){
                if ($i==0){
                    if ($filter[$i][0] == 'order'){
                        $sql.= " ORDER BY " . $filter[$i][1] . " DESC";
                    } else {
                    $sql.= " WHERE c." . $filter[$i][0] . "= '" . $filter[$i][1] ."'";
                    }
                }else {
                    if ($filter[$i][0] == 'order'){
                    $sql.= " ORDER BY " . $filter[$i][1] . " DESC";
                    } else {
                    $sql.= " AND c." . $filter[$i][0] . "= '" . $filter[$i][1] ."'";
                    }
                }
            }

            // return $sql;
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_count_cars_related($db, $brand, $id_car) {

            $sql = "SELECT COUNT(*) AS n_prod
            FROM car c , model m, brand b 
            WHERE c.model = m.id_model 
            AND m.brand = b.id_brand
            AND c.id_car NOT LIKE '$id_car'
            AND b.name_brand = '$brand'";

            // return $sql;

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_coches_relacionados($db,$brand,$id_car,$items,$total) {

			$sql = "SELECT * 
            FROM car c, model m, brand b 
            WHERE c.model = m.id_model
            AND m.brand = b.id_brand
            AND c.id_car NOT LIKE '$id_car'
            AND b.name_brand = '$brand'
            LIMIT $items, $total";

            // return $sql;

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_likes($db,$id_car,$username) {

            $sql = "SELECT l.id_car FROM likes l
            WHERE l.id_user = (SELECT u.id_user FROM users u WHERE u.username = '$username')
            AND l.id_car = '$id_car'";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_load_likes($db, $username) {

            $sql = "SELECT l.id_car FROM likes l WHERE l.id_user = (SELECT u.id_user FROM users u WHERE u.username = '$username')";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        function like($db, $id_car, $username){

            $sql = "INSERT INTO likes (id_user, id_car) VALUES ((SELECT  u.id_user FROM users u WHERE u.username= '$username') ,'$id_car');";

            $stmt = $db -> ejecutar($sql);
        }
    
        function dislike($db, $id_car, $username){

            $sql = "DELETE FROM likes WHERE id_car='$id_car' AND id_user=(SELECT  u.id_user FROM users u WHERE u.username= '$username')";

            $stmt = $db -> ejecutar($sql);
        }
    }
?>