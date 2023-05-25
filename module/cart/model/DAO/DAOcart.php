<?php

$path = $_SERVER['DOCUMENT_ROOT'] . '/CARXOT_Framework_PHP_OOP_MVC/';
include($path . "model/connect.php");

class DAOCart{

    function select_product($id, $user){
        
        $sql = "SELECT *
        FROM cart c
        WHERE c.id_car = $id
        AND c.id_user = (SELECT u.id_user
                        FROM users u
                        WHERE u.username = '$user')";
        
        // echo json_encode($sql);
        // exit;

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);

        connect::close($conexion);

        // echo json_encode($res);
        // exit;

        return $res;
    }

    function insert_product($id, $user){

        $sql = "INSERT INTO cart (id_user, id_car , qty) VALUES ( (SELECT u.id_user 
                FROM users u 
                WHERE u.username = '$user'),'$id', '1');";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        return $res;
    }

    function update_product($id, $user){
        $sql = "UPDATE cart 
        SET qty = qty+1 
        WHERE id_user = (SELECT u.id_user 
                        FROM users u 
                        WHERE u.username = '$user') AND id_car=$id " ;

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        return $res;
    }

    function select_user_cart($user){

        $sql = "SELECT *
        FROM car c, cart ct , model m , brand b , bodywork bo
        WHERE ct.id_car = c.id_car AND c.model = m.id_model AND m.brand = b.id_brand AND bo.id_bodywork = c.bodywork
        AND ct.id_user = (SELECT u.id_user
                        FROM users u
                        WHERE u.username = '$user')";
                        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        return $res;

    }

    function sumar_qty($id, $user){

        $sql = "UPDATE cart c
        SET c.qty = c.qty + 1 
        WHERE c.id_user = (SELECT u.id_user
                            FROM users u 
                            WHERE u.username = '$user') AND c.id_car = $id";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        return $res;
    }
    
    function restar_qty($id, $user){

        $sql = "UPDATE cart c
        SET c.qty = c.qty -1 
        WHERE c.id_user = (SELECT u.id_user
                            FROM users u 
                            WHERE u.username = '$user') AND c.id_car = $id";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        return $res;
    }

    function delete_cart($id_car, $user){

        $sql = "DELETE FROM cart WHERE id_user=(SELECT id_user
        FROM users u
        WHERE u.username='$user') AND id_car='$id_car'";

        // echo json_encode($sql);
        // exit;

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        return $res;
    }

    function checkout($data, $user){

        foreach($data as $fila){

            $id_car = $fila["id_car"];
            $cantidad = $fila["qty"];
            $precio = $fila["price"];
            $total_precio = $fila["price"]*$fila["qty"];

            $sql = "INSERT INTO pedidos (`id_user`, `id_car`, `cantidad`, `precio`, `precio_total`, `fecha`) 
            VALUES ((SELECT u.id_user FROM users u WHERE u.username = '$user'),$id_car ,$cantidad ,$precio ,$total_precio , NOW());";
            
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion); 
        }
        return $res;
    }

    function eliminar_cart_user($user){
        
        // echo json_encode($user);
        // exit;
        
        $sql = "DELETE FROM cart WHERE id_user = (SELECT u2.id_user 
        FROM users u2 
        WHERE u2.username = '$user')";

        // echo json_encode($sql);
        // exit;

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

    }
}

?>