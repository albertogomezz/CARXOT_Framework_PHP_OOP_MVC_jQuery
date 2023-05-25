function register() {
    if (validate_register() != 0) {

        var usuario = document.getElementById("username_reg").value;
        var passw = document.getElementById("passwd1_reg").value;
        var email = document.getElementById("email_reg").value;

        ajaxPromise(friendlyURL('?module=login&op=register'), 'POST', 'JSON', {'usuario':usuario, 'passw':passw ,'email':email} )
            .then(function(result) {
                // console.log(data);
                if (result == "error_mail") {
                    document.getElementById('error_email_reg').innerHTML = "El email ya esta en uso, asegurate de no tener ya una cuenta"
                } 
                else {
                    toastr.success("Email de verificación enviado");
                    // window.location.href = friendlyURL("?module=login");
                }
            }).catch(function(textStatus) {
                if (console && console.log) {
                    console.log("La solicitud ha fallado: " + textStatus);
                }
            });
    }
}

function key_register() {
    $("#register").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            register();
        }
    });
}

function button_register() {
    $('#register').on('click', function(e) {
        e.preventDefault();
        register();
    });
}

function validate_register() {
    var username_exp = /^(?=.{4,}$)(?=.*[a-zA-Z0-9]).*$/;
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var pssswd_exp = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    var error = false;

    if (document.getElementById('username_reg').value.length === 0) {
        document.getElementById('error_username_reg').innerHTML = "Tienes que escribir el usuario";
        error = true;
    } else {
        if (document.getElementById('username_reg').value.length < 4) {
            document.getElementById('error_username_reg').innerHTML = "El username tiene que tener 5 caracteres como minimo";
            error = true;
        } else {
            if (!username_exp.test(document.getElementById('username_reg').value)) {
                document.getElementById('error_username_reg').innerHTML = "No se pueden poner caracteres especiales";
                error = true;
            } else {
                document.getElementById('error_username_reg').innerHTML = "";
            }
        }
    }

    if (document.getElementById('email_reg').value.length === 0) {
        document.getElementById('error_email_reg').innerHTML = "Tienes que escribir un correo";
        error = true;
    } else {
        if (!mail_exp.test(document.getElementById('email_reg').value)) {
            document.getElementById('error_email_reg').innerHTML = "El formato del mail es invalido";
            error = true;
        } else {
            document.getElementById('error_email_reg').innerHTML = "";
        }
    }

    if (document.getElementById('passwd1_reg').value.length === 0) {
        document.getElementById('error_passwd1_reg').innerHTML = "Tienes que escribir la contraseña";
        error = true;
    } else {
        if (document.getElementById('passwd1_reg').value.length < 8) {
            document.getElementById('error_passwd1_reg').innerHTML = "La password tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            if (!pssswd_exp.test(document.getElementById('passwd1_reg').value)) {
                document.getElementById('error_passwd1_reg').innerHTML = "Debe de contener minimo 8 caracteres, mayusculas, minusculas y simbolos especiales";
                error = true;
            } else {
                document.getElementById('error_passwd1_reg').innerHTML = "";
            }
        }
    }

    if (document.getElementById('passwd2_reg').value.length === 0) {
        document.getElementById('error_passwd2_reg').innerHTML = "Tienes que repetir la contraseña";
        error = true;
    } else {
        if (document.getElementById('passwd2_reg').value.length < 8) {
            document.getElementById('error_passwd2_reg').innerHTML = "La password tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            if (document.getElementById('passwd2_reg').value === document.getElementById('passwd1_reg').value) {
                document.getElementById('error_passwd2_reg').innerHTML = "";
            } else {
                document.getElementById('error_passwd2_reg').innerHTML = "La password's no coinciden";
                error = true;
            }
        }
    }

    if (error == true) {
        return 0;
    }
}

// ------------------- LOAD CONTENT ------------------------ //

function load_content() {

    let path = window.location.pathname.split('/');

    // console.log(path[5]);    

    // if(path[5] === 'recover'){  
    //     window.location.href = friendlyURL("?module=login&op=recover_view");
    //     localStorage.setItem("token_email", path[6]);
    // }
    if (path[4] === 'verify') {
        // console.log("dentro de verify");
        ajaxPromise(friendlyURL('?module=login&op=verify_email'), 'POST', 'JSON', { "token_email": path[5]})
        .then(function(data) {
            // console.log(data);
            if (data === 'actualizado'){
                toastr.success("Correo Verificado");
            }
        })
        .catch(function() {
            console.log('Error: verify email error');
        });
    }
    // else if (path[4] === 'view') {
    //     $(".login-wrap").show();
    //     $(".forget_html").hide();
    // }else if (path[4] === 'recover_view') {
    //     load_form_new_password();
    // }
}

$(document).ready(function() {
    
    // console.log("dentro de register");
    load_content();
    key_register();
    button_register();
});