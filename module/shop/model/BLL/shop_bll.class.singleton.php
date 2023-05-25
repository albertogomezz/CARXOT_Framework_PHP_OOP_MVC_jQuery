<?php
	class shop_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = shop_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_all_cars_BLL($args) {
			// return $args[1];
			return $this -> dao -> select_data_all_cars($this -> db, $args[0], $args[1]);
		}

		public function get_details_car_BLL($args) {
			return $this -> dao -> select_data_details_car($this -> db, $args);
		}

		public function get_filter_BLL($args) {
			// return $args;
			return $this -> dao -> select_data_filter($this -> db, $args[0],$args[1],$args[2]);
		}

		public function get_filters_search_BLL() {
			return $this -> dao -> select_data_filters_search($this -> db);
		}

		public function get_contador_visitas_BLL($args) {
			// return $args;
			return $this -> dao -> select_data_contador_visitas($this -> db, $args);
		}

		public function get_count_all_BLL() {
			return $this -> dao -> select_data_count_all($this -> db);
		}

		public function get_count_home_BLL() {
			return $this -> dao -> select_data_count_home($this -> db);
		}

		public function get_count_shop_BLL($args) {
			// return $args;
			return $this -> dao -> select_data_count_shop($this -> db, $args);
		}

		public function get_count_cars_related_BLL($args) {
			return $this -> dao -> select_data_count_cars_related($this -> db, $args[0], $args[1]);
		}

		public function get_coches_relacionados_BLL($args) {
			return $this -> dao -> select_data_coches_relacionados($this -> db, $args[0],$args[1],$args[2],$args[3]);
		}

		public function get_control_likes_BLL($args) {
			// return $args;
			$token = $args[1];
        	$id_car = $args[0];

			try {
				$json = decode_token($token);
				$rdo = $this -> dao -> select_likes($this -> db, $id_car, $json['username']);
				// return $rdo;
			} catch (Exception $e) {
				echo json_encode("error");
				exit;
			}
			if (empty($rdo)) {
				$rdo_like = $this -> dao -> like($this -> db, $id_car, $json['username']);
				return "0";	
			} else {
				$rdo_dislike = $this -> dao -> dislike($this -> db, $id_car, $json['username']);
				return "1";
			}
		}

		public function get_load_likes_user_BLL($args) {
			// return $args['username'];
            $json = decode_token($args);

            return $this -> dao -> select_load_likes($this -> db, $json['username']);
			// return $this -> dao -> select_data_load_likes_user($this -> db);
		}
	}
?>