function login() {

    // console.log("dentro de login");
    if (validate_login() != 0) {

        var usuario = document.getElementById("username_log").value;
        var passw = document.getElementById("passwd_log").value;

        // console.log(data);
        ajaxPromise(friendlyURL('module=login&op=login'), 'POST', 'JSON', {"usuario":usuario, "passw":passw})
            .then(function(result) {

                console.log(result);
                var id_coche = JSON.parse(localStorage.getItem('id_car'));

                if (result == "error_user") {
                    document.getElementById('error_username_log').innerHTML = "El usario no existe,asegurase de que lo a escrito correctamente"
                } else if (result == "error_passwd") {
                    document.getElementById('error_passwd_log').innerHTML = "La contraseña es incorrecta"
                } else {
                    localStorage.setItem("token", result);
                    toastr.success("Loged succesfully");
                    
                    // if (id_coche) {
                        // setTimeout(window.location.href = friendlyURL("?module=shop", 1000));
                    // } else {
                        setTimeout(window.location.href = friendlyURL("?module=shop", 1000));
                    // }
                }
            }).catch(function(textStatus) {
                if (console && console.log) {
                    console.log("La solicitud ha fallado: " + textStatus);
                }
            });
    }
}

function key_login() {
    // console.log("dentro de key login");
    $("#login").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            login();
        }
    });
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

$(document).ready(function() {

    // console.log("dentro de login");
    key_login();
    button_login();
});