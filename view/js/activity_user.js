function control_activity() {
    var token = localStorage.getItem('token');
    if (token) {
        ajaxPromise('?module=login&op=activity', 'POST', 'JSON')
            .then(function(response) {
				console.log(response);
                if (response == "inactivo") {
                    console.log("usuario INACTIVO");
                    logout_auto();
                } else {
                    console.log("usuario ACTIVO")
                }
            });
    } else {
        console.log("No hay usario logeado");
    }
}

function protecturl() {
    var token = localStorage.getItem('token');
    ajaxPromise('?module=login&op=controluser', 'POST', 'JSON', { 'token': token })
        .then(function(data) {
            // console.log(data);
            if (data == "Correct_User") {
                console.log("CORRECTO-->El usario coincide con la session");
            } else if (data == "Wrong_User") {
                console.log("INCORRCTO--> Estan intentando acceder a una cuenta");
                logout_auto();
            }
        }).catch(function() { 
            console.log("ANONYMOUS_user");
        });
}

function refresh_token() {
    var token = localStorage.getItem('token');
    if (token) {
        ajaxPromise('?module=login&op=refresh_token', 'POST', 'JSON', { 'token': token })
            .then(function(data_token) {
                console.log("Refresh token correctly");
                localStorage.setItem("token", data_token);
            });
    }
}

function refresh_cookie() {
    ajaxPromise('?module=login&op=refresh_cookie', 'POST', 'JSON')
        .then(function(response) {
            console.log("Refresh cookie correctly");
        });
}

function logout_auto() {
    ajaxPromise('?module=login&op=logout', 'POST', 'JSON')
    .then(function(data) {
        localStorage.removeItem('token');
    	toastr.warning("Se ha cerrado la cuenta por seguridad!!");
    }).catch(function() {
        console.log('Something has occured');
    });
    setTimeout('window.location.href = "?module=home";', 2000);
}

$(document).ready(function() {
    control_activity();
    protecturl();
    setInterval(function() { refresh_token() }, 600000);
    setInterval(function() { refresh_cookie() }, 600000);
});