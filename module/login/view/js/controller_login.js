function login() {

    // console.log("dentro de login");
    if (validate_login() != 0) {

        var usuario = document.getElementById("username_log").value;
        var passw = document.getElementById("passwd_log").value;

        // console.log(data);
        ajaxPromise(friendlyURL('?module=login&op=login'), 'POST', 'JSON', {"usuario":usuario, "passw":passw})
            .then(function(result) {

                console.log(result);

                if (result == "error_user") {
                    document.getElementById('error_username_log').innerHTML = "El usario no existe,asegurase de que lo a escrito correctamente"
                } else if (result == "error_passwd") {
                    document.getElementById('error_passwd_log').innerHTML = "La contraseña es incorrecta"
                } else if (result == "no verificado"){
                    // console.log("no esta verificado");
                    toastr.warning("Verificación Necesaria");
                }
                else {
                    localStorage.setItem("token", result);
                    toastr.success("Loged succesfully");
                    setTimeout(window.location.href = "?module=shop", 3000);
                }
            }).catch(function(textStatus) {
                if (console && console.log) {
                    console.log("La solicitud ha fallado: " + textStatus);
                }
            });
    }
}

function click_login(){

    $("#login").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            login();
        }
    });
    
    $('#button_login').on('click', function(e) {
        e.preventDefault();
        login();
    }); 

    $('#forget_pass').on('click', function(e) {
        e.preventDefault();
        load_form_recover_password();
    }); 

    // $('#google').on('click', function(e) {
    //     social_login('google');
    // }); 

    // $('#github').on('click', function(e) {
    //     social_login('github');
    // }); 
}

function button_login() {
    $('#login').on('click', function(e) {
        // console.log("dentro de boton de login");
        e.preventDefault();
        login();
    });
}

function validate_login() {
    var error = false;

    if (document.getElementById('username_log').value.length === 0) {
        document.getElementById('error_username_log').innerHTML = "Tienes que escribir el usuario";
        error = true;
    } else {
        if (document.getElementById('username_log').value.length < 4) {
            document.getElementById('error_username_log').innerHTML = "El usuario tiene que tener 4 caracteres como minimo";
            error = true;
        } else {
            document.getElementById('error_username_log').innerHTML = "";
        }
    }

    if (document.getElementById('passwd_log').value.length === 0) {
        document.getElementById('error_passwd_log').innerHTML = "Tienes que escribir la contraseña";
        error = true;
    } else {
        document.getElementById('error_passwd_log').innerHTML = "";
    }

    if (error == true) {
        return 0;
    }
}


//-------------- RECOVER PASS ----------------//


//Cargar formulario para enviar email al correo
function load_form_recover_password(){
    $(".login-wrap").hide();
    $(".forget_html").show();
    $('html, body').animate({scrollTop: $(".forget_html")});
    click_recover_password();
}

//Click en el boton de Send
function click_recover_password(){
    $(".forget_html").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code==13){
        	e.preventDefault();
            send_recover_password();
        }
    });

    $('#button_recover').on('click', function(e) {
        e.preventDefault();
        send_recover_password();
    });
}

//Enviar email
function send_recover_password(){
    if(validate_recover_password() != 0){

        var correo = document.getElementById("email_forg").value;

        ajaxPromise(friendlyURL('?module=login&op=send_recover_email'), 'POST', 'JSON', {"correo":correo})
            .then(function(data) {
                console.log(data);
                    if(data == "error"){		
                        $("#error_email_forg").html("The email doesn't exist");
                    } else{
                        toastr.options.timeOut = 3000;
                        toastr.success("Email sended");
                        setTimeout('window.location.href = friendlyURL("?module=login")', 1000);
                    }
            }).catch(function() {
                console.log('Error: Recover password error');
            });  
    }
}

//Validar formato del correo
function validate_recover_password(){
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var error = false;

    if(document.getElementById('email_forg').value.length === 0){
		document.getElementById('error_email_forg').innerHTML = "Tienes que escribir un correo";
		error = true;
	}else{
        if(!mail_exp.test(document.getElementById('email_forg').value)){
            document.getElementById('error_email_forg').innerHTML = "El formato del mail es invalido"; 
            error = true;
        }else{
            document.getElementById('error_email_forg').innerHTML = "";
        }
    }
	
    if(error == true){
        return 0;
    }
}

//Verificar el token
function load_form_new_password(){
    token_email = localStorage.getItem('token_email');
    localStorage.removeItem('token_email');

    ajaxPromise(friendlyURL('?module=login&op=verify_token'), 'POST', 'JSON', { "token_email": token_email})
        .then(function(data) {
            // console.log(data);
            if(data == "verify"){
                console.log('verified');
                click_new_password(token_email); 
            }else {
                console.log("error");
            }
        })
        .catch(function() {
            console.log("Error: Verify token error");
        }); 
}

//Cuando hace click en el botón de Set Password
function click_new_password(token_email){
    $(".recover_html").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code==13){
        	e.preventDefault();
            send_new_password(token_email);
        }
    });

    $('#button_set_pass').on('click', function(e) {
        e.preventDefault();
        send_new_password(token_email);
    }); 
}

//Valida la nueva contraseña
function validate_new_password(){

    var error = false;

    if(document.getElementById('pass_rec').value.length === 0){
		document.getElementById('error_password_rec').innerHTML = "You have to write a password";
		error = true;
	}else{
        if(document.getElementById('pass_rec').value.length < 8){
            document.getElementById('error_password_rec').innerHTML = "The password must be longer than 8 characters";
            error = true;
        }else{
            document.getElementById('error_password_rec').innerHTML = "";
        }
    }

    if(document.getElementById('pass_rec_2').value != document.getElementById('pass_rec').value){
		document.getElementById('error_password_rec_2').innerHTML = "Passwords don't match";
		error = true;
	}else{
        document.getElementById('error_password_rec_2').innerHTML = "";
    }

    if(error == true){
        return 0;
    }
}

//Cambia la contraseña del usuario
function send_new_password(token_email){
    if(validate_new_password() != 0){

        var passwd = document.getElementById("pass_rec").value;
        // console.log(passwd, token_email);

        ajaxPromise(friendlyURL('?module=login&op=new_password'), 'POST', 'JSON', { "token_email": token_email, "passwd":passwd})
        .then(function(data) {
            // console.log(data);
            if(data == "done"){
                toastr.options.timeOut = 3000;
                toastr.success('New password changed');
                setTimeout('window.location.href = friendlyURL("?module=login")', 1000);
            } else {
                toastr.options.timeOut = 3000;
                toastr.error('Error seting new password');
            }
        })
        .catch(function() {
            console.log("Error: New password error");
        });   
    }
}

$(document).ready(function() {

    click_login();
    button_login();
});