<?php

    require_once('autoload.php');

    ob_start();
    
    if (isset($_SESSION["tiempo"])) {  
        $_SESSION["tiempo"] = time();
    }
    
    session_start();

    class router {
        private $uriModule;
        private $uriFunction;
        private $nameModule;
        static $_instance;
        
        public static function getInstance() {  /// Crea el constructor si no exixte
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }
    
        function __construct() {   
            if(isset($_GET['module'])){
                $this -> uriModule = $_GET['module'];
            }else{
                $this -> uriModule = 'home';
            }
            if(isset($_GET['op'])){
                $this -> uriFunction = ($_GET['op'] === "") ? 'view' : $_GET['op'];
            }else{
                $this -> uriFunction = 'view';
            }
        }
    
        function routingStart() {
            try {
                call_user_func(array($this -> loadModule(), $this -> loadFunction()));
            }catch(Exception $e) {
                // common::load_error();
                echo "error_rotuer";
            }
        }
        
        private function loadModule() {
            if (file_exists('resource/modules.xml')) {
                $modules = simplexml_load_file('resource/modules.xml');
                foreach ($modules as $row) {
                    if (in_array($this -> uriModule, (Array) $row -> uri)) {
                        $path = 'module/' . $row -> name . '/controller/controller_' . (String) $row -> name . '.class.php';
                        if (file_exists($path)) {
                            require_once($path);
                            $controllerName = 'controller_' . (String) $row -> name;
                            $this -> nameModule = (String) $row -> name;
                            return new $controllerName;
                        }
                    } 
                } 
            } 
            throw new Exception('Not Module found.');
            // $path = 'module/contact/controller/controller_contact.class.php';
            // require_once($path);
            // $controllerName = 'controller_contact' ;
            // return new $controllerName;
        }
        
        private function loadFunction() {
            $path = 'module/' . $this -> nameModule . '/resources/function.xml'; 
            if (file_exists($path)) {
                $functions = simplexml_load_file($path);
                foreach ($functions as $row) {
                    if (in_array($this -> uriFunction, (Array) $row -> uri)) {
                        return (String) $row -> name;
                    }
                }
            }
            throw new Exception('Not Function found.');
            // return "view";
        }
    }
    
    router::getInstance() -> routingStart();