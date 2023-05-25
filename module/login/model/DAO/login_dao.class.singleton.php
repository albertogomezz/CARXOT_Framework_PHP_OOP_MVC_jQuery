<?php
    class login_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_email($db, $email) {

			$sql = "SELECT email FROM users WHERE email='$email'";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function insert_user($db, $username, $pass, $email, $avatar, $token_email) {

            $sql = "INSERT INTO users (`username`, `password`, `email`, `type_user`, `avatar`,`token_email`,`activate`) 
            VALUES ('$username','$pass','$email','client','$avatar','$token_email','0') ";

            $stmt = $db -> ejecutar($sql);
        }

        function select_user($db, $username){

			$sql = "SELECT * FROM `users` WHERE username='$username'";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);

        }

        function select_data_user($db, $username){
			$sql = "SELECT * FROM users WHERE username='$username'";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        // VERIFY EMAIL

        public function select_verify_email($db, $token_email){

			$sql = "SELECT token_email FROM users WHERE token_email = '$token_email'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        } 

        public function update_verify_email($db, $token_email){

            $sql = "UPDATE users SET activate = 1, token_email= '' WHERE token_email = '$token_email'";

            $stmt = $db->ejecutar($sql);
        }
    }
?>