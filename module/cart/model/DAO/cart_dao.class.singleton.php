<?php
    class cart_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_user_cart($db, $user) {

            $sql = "SELECT *
            FROM car c, cart ct , model m , brand b , bodywork bo
            WHERE ct.id_car = c.id_car AND c.model = m.id_model AND m.brand = b.id_brand AND bo.id_bodywork = c.bodywork
            AND ct.id_user = (SELECT u.id_user
                            FROM users u
                            WHERE u.username = '$user')";
            
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function delete_cart($db, $id_car, $user) {

            $sql = "DELETE FROM cart WHERE id_user=(SELECT id_user
            FROM users u
            WHERE u.username='$user') AND id_car='$id_car'";

            $stmt = $db -> ejecutar($sql);
        }

        public function sumar_qty($db, $id, $user) {

            $sql = "UPDATE cart c
            SET c.qty = c.qty + 1 
            WHERE c.id_user = (SELECT u.id_user
                                FROM users u 
                                WHERE u.username = '$user') AND c.id_car = $id";

            $stmt = $db -> ejecutar($sql);
        }

        public function restar_qty($db, $id, $user) {

            $sql = "UPDATE cart c
            SET c.qty = c.qty - 1 
            WHERE c.id_user = (SELECT u.id_user
                                FROM users u 
                                WHERE u.username = '$user') AND c.id_car = $id";

            $stmt = $db -> ejecutar($sql);
        }

        public function select_product($db,$id,$user) {

            $sql = "SELECT *
            FROM cart c
            WHERE c.id_car = $id
            AND c.id_user = (SELECT u.id_user
                            FROM users u
                            WHERE u.username = '$user')";
            
            // return $sql;
            
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        function insert_product($db, $id, $user){

            // return 'Dentro de insert';

            $sql = "INSERT INTO cart (id_user, id_car , qty) VALUES ( (SELECT u.id_user 
                    FROM users u 
                    WHERE u.username = '$user'),'$id', '1')";

            // return $sql;
            $stmt = $db -> ejecutar($sql);
        }

        function update_product($db, $id, $user){
            
            // return 'Dentro de update';

            $sql = "UPDATE cart 
            SET qty = qty+1 
            WHERE id_user = (SELECT u.id_user 
                            FROM users u 
                            WHERE u.username = '$user') AND id_car=$id";
    
            // return $sql;
            $stmt = $db -> ejecutar($sql);
        }

        function checkout($db, $data, $user){

            foreach($data as $fila){
    
                $id_car = $fila["id_car"];
                $cantidad = $fila["qty"];
                $precio = $fila["price"];
                $total_precio = $fila["price"]*$fila["qty"];
    
                $sql = "INSERT INTO pedidos (`id_user`, `id_car`, `cantidad`, `precio`, `precio_total`, `fecha`) 
                VALUES ((SELECT u.id_user FROM users u WHERE u.username = '$user'),$id_car ,$cantidad ,$precio ,$total_precio , NOW());";

                $stmt = $db -> ejecutar($sql);
            }
        }

        function eliminar_cart_user($db, $user){

            $sql = "DELETE FROM cart WHERE id_user = (SELECT u2.id_user 
            FROM users u2 
            WHERE u2.username = '$user')";

            // return $sql;

            $stmt = $db -> ejecutar($sql);
        }
    }
?>