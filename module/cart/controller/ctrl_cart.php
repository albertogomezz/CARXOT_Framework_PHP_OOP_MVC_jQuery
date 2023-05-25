<?php
        $path = $_SERVER['DOCUMENT_ROOT'] . "/CARXOT_Framework_PHP_OOP_MVC/";
        include ($path . "module/cart/model/DAOcart.php");
        include($path . "/model/middleware_auth.php");

        switch($_GET['op']){
            case 'view';
                include("module/cart/view/cart.html");
                break;
                    
            case 'insert_cart';  

                $id_car = $_POST['id_car'];
                $token = $_POST['token'];

                try{
                    $json = decode_token($token);
                    $dao = new DAOCart();
                    $rdo = $dao->select_product($id_car,$json['username']);

                }catch (Exception $e){
                    echo json_encode("error");
                    exit;
                }
                $dinfo = array();
                foreach ($rdo as $row) {
                    array_push($dinfo, $row);
                }

                if(!$dinfo){
                    $dao = new DAOCart();
                    $rdo = $dao->insert_product($id_car,$json['username']);
                    echo json_encode("insert");
                    exit;

                }else{
                    $dao = new DAOCart();
                    $rdo = $dao->update_product($id_car,$json['username']);
                    echo json_encode("update");
                    exit;
                }
                break; 
        
            case 'delete_cart';    

                $id_car = $_POST['id_car'];
                $token = $_POST['token'];

                // echo json_encode($id_car);
                // exit;

                try{

                    $json = decode_token($token);

                    // echo json_encode($json['username']);
                    // exit;

                    $dao = new DAOCart();
                    $rdo = $dao->delete_cart($id_car,$json['username']);
                }catch (Exception $e){
                    echo json_encode("error");
                    exit;
                }
                if(!$rdo){
                    echo json_encode("error");
                    exit;
                }else{
                    echo json_encode("delete");
                    exit;
                }
                break;         

            case 'load_cart';   
                
                $token = $_POST['token'];

                try{

                    $json = decode_token($token);
                    // echo json_encode($json['username']);
                    // exit;

                    $dao = new DAOCart();
                    $rdo = $dao->select_user_cart($json['username']);
                    
                }catch (Exception $e){
                    echo json_encode("error");
                    exit;
                }
                if(!$rdo){
                    echo json_encode("error");
                    exit;
                }else{
                    $dinfo = array();
                    foreach ($rdo as $row) {
                        array_push($dinfo, $row);
                    }
                    echo json_encode($dinfo);
                }
                break; 

            case 'sumar_qty';  

                $id_car = $_POST['id_car'];
                $token = $_POST['token'];

                try{
                    $json = decode_token($token);
                    $dao = new DAOCart();
                    $rdo = $dao->sumar_qty($id_car,$json['username']);
                    
                }catch (Exception $e){
                    echo json_encode("error");
                    exit;
                }
                if(!$rdo){
                    echo json_encode("error");
                    exit;
                }else{
                    echo json_encode("update");
                    exit;
                }
                break;
            
            case 'restar_qty';  

                $id_car = $_POST['id_car'];
                $token = $_POST['token'];

                try{
                    $json = decode_token($token);
                    $dao = new DAOCart();
                    $rdo = $dao->restar_qty($id_car,$json['username']);

                }catch (Exception $e){
                    echo json_encode("error");
                    exit;
                }
                if(!$rdo){
                    echo json_encode("error");
                    exit;
                }else{
                    echo json_encode("update");
                    exit;
                }
                break;

            case 'checkout';    

            $token = $_POST['token']; 

            try{
                $json = decode_token($token);
                $dao = new DAOCart();
                $rdo = $dao->select_user_cart($json['username']);

            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $dinfo = array();
                foreach ($rdo as $row) {
                    array_push($dinfo, $row);
                }

                $dao = new DAOCart();
                $res = $dao->checkout($dinfo, $json['username']);
                
                $resultado = $dao->eliminar_cart_user($json['username']);

                echo json_encode("checkout realizado");
                exit;
            }
                break; 
                    
            default;
                include("view/inc/error404.php");
                break;
                
        }
    
?>
