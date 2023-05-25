<?php
    class mail {
        public static function send_email($email) {
            // echo json_encode('hola');
            // exit;

            switch ($email['type']) {
                case 'contact';

                    $email['toEmail'] = 'albertogom.alon@gmail.com';
                    $email['fromEmail'] = 'albertogomezalonso234@gmail.com';
                    $email['inputEmail'] = 'albertogomezalonso234@gmail.com';
                    $email['inputMatter'] = 'Ojo Ojo Ojo , Pero lo que pasa ...';
                    $email['inputMessage'] = "<h2>Email verification.</h2><a href='http://localhost/Ejercicios/Framework_PHP_OO_MVC/index.php?module=contact&op=view'>Click here for verify your email.</a>";
                        break;
                case 'validate';
                    
                    $email['toEmail'] =  $email['toEmail'];
                    $email['fromEmail'] = 'albertogomezalonso234@gmail.com';
                    $email['inputEmail'] = 'albertogomezalonso234@gmail.com';
                    $email['inputMatter'] = 'Pulsa para verificar tu correo';
                    $email['inputMessage'] = "<h2>Verificacion</h2><a href='http://localhost/CARXOT_Framework_PHP_OOP_MVC/login/view/verify/$email[token]'>Click here for verify your email.</a>";
                        break;
                // case 'recover';
                //     $email['fromEmail'] = 'secondchanceonti@gmail.com';
                //     $email['inputEmail'] = 'secondchanceonti@gmail.com';
                //     $email['inputMatter'] = 'Recover password';
                //     $email['inputMessage'] = "<a href='http://localhost/Ejercicios/Framework_PHP_OO_MVC/module/login/recover/$email[token]'>Click here for recover your password.</a>";
                //     break;
            }
            return self::send_mailgun($email);
        }

        public static function send_mailgun($values){

            $mailgun = parse_ini_file(MODEL_PATH . "php.ini");
            $api_key = $mailgun['api_key'];
            $api_url = $mailgun['api_url'];

            $config = array();
            $config['api_key'] = $api_key; 
            $config['api_url'] = $api_url;
        
            $message = array();
            $message['from'] = $values['fromEmail'];
            $message['to'] = $values['toEmail'];
            $message['h:Reply-To'] = $values['inputEmail'];
            $message['subject'] = $values['inputMatter'];
            $message['html'] = $values['inputMessage'];
            
            
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $config['api_url']);
            curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
            curl_setopt($ch, CURLOPT_USERPWD, "api:{$config['api_key']}");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS,$message);
            $result = curl_exec($ch);
            curl_close($ch);
            return $result;
        }
    }