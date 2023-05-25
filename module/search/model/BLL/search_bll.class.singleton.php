<?php
	class search_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = search_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_search_brand_BLL() {
			return $this -> dao -> select_data_search_brand($this -> db);
		}

		public function get_search_model_null_BLL() {
			return $this -> dao -> select_data_search_model_null($this -> db);
		}

		public function get_search_model_BLL($args) {
			return $this -> dao -> select_data_search_model($this -> db, $args);
		}

		public function get_autocomplete_BLL($args) {

			// CREAR LA FILTRACIO PER A CADA CONSULTA DEPENENT DELS VALORS PER ELS QUE FILTREN

				if (empty($args['brand']) && empty($args['model'])){
					return $this -> dao -> select_only_city($this -> db, $args['city']);
				}
				else if (empty($args['brand']) && !empty($args['model']) && !empty($args['city'])) {
					return $this -> dao -> select_city_model($this -> db, $args['city'],$args['model']);
				}
				else if (!empty($args['brand']) && !empty($args['model']) && empty($args['city'])) {
					return $this -> dao -> select_brand_model($this -> db, $args['model'], $args['brand']);
				}
				else if (!empty($args['brand']) && !empty($args['model']) && !empty($args['city'])) {
					return $this -> dao -> select_all($this -> db, $args['city'], $args['model'], $args['brand']);
				}
		}
	}
?>