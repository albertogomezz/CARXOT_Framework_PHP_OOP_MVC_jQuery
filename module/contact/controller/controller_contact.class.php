<?php

	class controller_contact {
		
		function view(){
			// echo "hola";
			common::load_view('top_page_contact.html', VIEW_PATH_CONTACT . 'contact_list.html');
		}
		
		function send_contact_us(){
			
			// var nombre = $_POST['name'];

			// echo json_encode($_POST['name']);
			// exit;
			
			$message = ['type' => 'contact',
						'inputName1' => $_POST['name'], 
						'fromEmail1' => $_POST['email'], 
						'inputMatter1' => $_POST['matter'], 
						'inputMessage1' => $_POST['message']];

			// echo json_encode($message);
			// exit;

			$email = mail::send_email($message);

			if (!empty($email)) {
				return 'Done!';
			} else {
				return 'Error';
			}
		}
	}
?>