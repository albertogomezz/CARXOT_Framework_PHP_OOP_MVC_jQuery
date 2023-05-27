<?php

	class login_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = login_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_login_BLL($args) {

			try {
				$rdo = $this -> dao -> select_user($this -> db, $args[0]);

				if (empty($rdo)) {
					return "error_user";
				}
				else {
					if ($rdo[0]['activate'] == 1){
					// return 'este usuario esta verificado';
						if (password_verify($args[1], $rdo[0]['password'])) {
							$token= create_token($rdo[0]["username"]);
							$_SESSION['username'] = $rdo[0]['username']; //Guardamos el usario 
							$_SESSION['tiempo'] = time(); //Guardamos el tiempo que se logea
							// return $_SESSION['username'];
							return $token;
						}
						else {
							return "error_passwd";
						}
					} 
					else {
						return 'no verificado';
					}
				}
			} catch (Exception $e) {
				echo json_encode("error");
				exit;
			}
		}

		public function get_register_BLL($args) {

			$hashed_pass = password_hash($args[1], PASSWORD_DEFAULT);
            $hashavatar = md5(strtolower(trim($args[2]))); 
			$avatar = "https://robohash.org/$hashavatar";
			$token_email = common::generate_Token_secure(20);

			$rdo = $this -> dao -> select_email($this->db, $args[2]);

			if (!empty($rdo)) {
				return 'error_mail';
            }
			else {
				$rdo2 = $this -> dao -> insert_user($this->db, $args[0], $hashed_pass, $args[2], $avatar, $token_email);
				
				$message = [ 'type' => 'validate',
								'token' => $token_email, 
								'toEmail' =>  $args[2]];

				$email = mail::send_email($message);
			}
		}

		public function get_data_user_BLL($args) {
			// return $args;
			$json = decode_token($args);
			$username = $json['username'];
			// return $username;

			return $this -> dao -> select_data_user($this -> db, $username);
		}

		public function get_logout_BLL() {
			// return $args;
			unset($_SESSION['username']);
			unset($_SESSION['tiempo']);
			session_destroy();
			
			return 'done';
		}

		// VERIFY USER

		public function get_verify_email_BLL($args) {

			// return $args;

			$rdo = $this -> dao -> select_verify_email( $this->db, $args);

			if (!empty($rdo)){
				$this -> dao -> update_verify_email($this -> db, $args);
				return 'actualizado';
			}
			return 'error';
		}

		// ACTIVITY USER

		public function get_activity_BLL() {

			if (!isset($_SESSION["tiempo"])) {
            return "inactivo";
			} 
			
			else {
				if ((time() - $_SESSION["tiempo"]) >= 60) { //1800s=30min
					return "inactivo";
				} else {
					return "activo";
				}
			}
		}

		public function get_controluser_BLL($args) {

			$token_dec = decode_token($args);

			if ($token_dec['exp'] < time()) {
				return "Wrong_User";
			}

			if (isset($_SESSION['username']) && ($_SESSION['username']) == $token_dec['username']) {
				return "Correct_User";
			} else {
				return "Wrong_User";
			}
		}

		public function get_refresh_token_BLL($args) {
			$old_token = decode_token($_POST['token']);
        	$new_token = create_token($old_token['username']);
        	return $new_token;
		}

		public function get_refresh_cookie_BLL() {
			session_regenerate_id();
			return 'refresh';
		}

		// RECOVER PASSWORD
		
		public function get_send_recover_email_BLL($args) {
			// return $args;
			$email_user = $this -> dao -> select_recover_password($this->db, $args);
			// return $email_user;
			$token = common::generate_Token_secure(20);

			if (!empty($email_user)) {
				$this -> dao -> update_recover_password($this->db, $args, $token);

                $message = ['type' => 'recover', 
                            'token' => $token, 
                            'toEmail' => $args];
				// return $message;
				$email = mail::send_email($message);

				if (!empty($email)) {
					return;
				}
            }else{
                return 'error';
            }
		}

		public function get_verify_token_BLL($args) {

			if($this -> dao -> select_verify_email($this->db, $args)){
				return 'verify';
			}
			return 'fail';
		}

		public function get_new_password_BLL($args) {

			$hashed_pass = password_hash($args[1], PASSWORD_DEFAULT, ['cost' => 12]);
			if($this -> dao -> update_new_passwoord($this->db, $args[0], $hashed_pass)){
				return 'done';
			}
			return 'fail';
		}
	}
?>