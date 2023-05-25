<?php
	class cart_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = cart_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_load_cart_BLL($args) {
			// return $args;
            $json = decode_token($args);
			
			return $this -> dao -> select_user_cart($this -> db, $json['username']);
		}

		public function get_delete_cart_BLL($args) {
			$token = $args[1];
			$id_car = $args[0];

			$json = decode_token($token);

			// return $json['username'];
			return $this -> dao -> delete_cart($this -> db, $id_car, $json['username']);
		}

		public function get_sumar_qty_BLL($args) {
			$token = $args[1];
			$id_car = $args[0];

			$json = decode_token($token);
				// return 'hola car type BLL';
			return $this -> dao -> sumar_qty($this -> db, $id_car, $json['username']);
		}

		public function get_restar_qty_BLL($args) {
			$token = $args[1];
			$id_car = $args[0];

			$json = decode_token($token);
				// return 'hola car type BLL';
			return $this -> dao -> restar_qty($this -> db, $id_car, $json['username']);
		}

		public function get_insert_cart_BLL($args) {
			$token = $args[1];
			$id_car = $args[0];

			try{
				$json = decode_token($token);
				$rdo = $this -> dao ->select_product($this -> db, $id_car,$json['username']);

				// return $rdo;

			}catch (Exception $e){
				echo json_encode("error");
				exit;
			}

			if(empty($rdo)){

				$this -> dao -> insert_product($this -> db, $id_car,$json['username']);
				return "insert";

			}else{

				$this -> dao -> update_product($this -> db, $id_car,$json['username']);
				return "update";
			}
		}

		public function get_checkout_BLL($args) {

			$json = decode_token($args);

			// return $json['username'];

			try{

                $rdo = $this -> dao ->select_user_cart($this -> db, $json['username']);
				
				// return $rdo;

            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }

            if(empty($rdo)){
                return 'error';
            }else{

				$dinfo = array();
                foreach ($rdo as $row) {
                    array_push($dinfo, $row);
                }

                $this -> dao -> checkout($this -> db, $dinfo, $json['username']);
                $this -> dao -> eliminar_cart_user($this -> db, $json['username']);
            }
		}
	}
?>