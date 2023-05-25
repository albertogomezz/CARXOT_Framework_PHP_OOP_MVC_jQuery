function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        });
    });
}

/* FRIENDLY URL */
function friendlyURL(url) {
    var link = "";
    url = url.replace("?", "");
    url = url.split("&");
    cont = 0;
    for (var i = 0; i < url.length; i++) {
    	cont++;
        var aux = url[i].split("=");
        if (cont == 2) {
        	link += "/" + aux[1] + "/";	
        }else{
        	link += "/" + aux[1];
        }
    }
    return "http://localhost/CARXOT_Framework_PHP_OOP_MVC" + link;
}

function load_menu() {

    var token = localStorage.getItem('token');

    $('<li></li>').attr({'class' : 'nav_item'}).html(                    
            '<div class="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between" id="templatemo_main_nav">' +
                '<div class="flex-fill">' +
                    '<ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">' +
                        '<div class="nav_list"/>' +
                        '<li class="nav-item">' +
                            '<a class="nav-link" href="' + friendlyURL("?module=home") + '">Home</a>' +
                        '</li>' +
                        '<li class="nav-item">' +
                        '<a class="nav-link" href="' + friendlyURL("?module=shop") + '">Shop</a>' +
                        '</li>' +
                        '<li class="nav-item">' +
                            '<a class="nav-link" href="' + friendlyURL("?module=contact") + '">Contact</a>' +
                        '</li>' +
                        '<li class="nav-item">' +
                            '<a id="boton_login" class="nav-link" href="' + friendlyURL("?module=login") + '">Login</a>' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
            '</div>'
            ).appendTo('.nav_list');

            // console.log(token);

    if (token) {
        ajaxPromise(friendlyURL('?module=login&op=data_user'), 'POST', 'JSON', { 'token': token })
            .then(function(data) {
                // console.log(data[0]);
                if (data[0].type_user == "client") {
                    console.log("Client loged");
                    $('.opc_CRUD').empty();
                    $('.opc_exceptions').empty();
                    $('.buton_login').empty();
                } else {
                    console.log("Admin loged");
                    $('.opc_CRUD').show();
                    $('.opc_exceptions').show();
                }

                //OCULTAR BOTON DE LOGIN
                $('#boton_login').empty();
                
                $('.log-icon').empty();
                $('#user_info').empty();

                $('<img class="img_avatar" src="' + data[0].avatar + '"alt="Robot">').appendTo('.log-icon');

                $('<p></p>').attr({ 'id': 'user_info' }).appendTo('#des_inf_user')
                    .html(
                        '<a>' + data[0].username + '<a/>'
                    )

                $('<p></p>').attr({ 'id': 'user_info' }).appendTo('.boton_logout')
                    .html(
                        '<a type="button" id="logout"><i id="icon-logout" class="fa-solid fa-right-from-bracket"></i>Logout</a>'
                    )

                $('<a id="button_cart" href="' + friendlyURL("?module=cart") + '"><i class="fa-solid fa-cart-shopping fa-2xl carrito"></i></a>').appendTo('.shop_cart')
            }).catch(function() {
                console.log("Error al cargar los datos del user");
            });
    } else {
        console.log("No hay token disponible");
        $('.opc_CRUD').empty();
        $('.opc_exceptions').empty();
        $('#user_info').hide();
        $('.log-icon').empty();
        $('<a href="?module=login&op=view"><i id="col-ico"></i></a>').appendTo('.log-icon');
        $('#button_cart').hide();
    }
}


function click_logout() {
    $(document).on('click', '#logout', function() {
        // localStorage.removeItem('');
        toastr.success("Logout succesfully");
        setTimeout('logout(); ', 1000);
    });
}

function logout() {
    // console.log("dentro de logout");
    ajaxPromise(friendlyURL('?module=login&op=logout'), 'POST', 'JSON')
        .then(function(data) {
            // console.log(data);
            localStorage.removeItem('token');
            window.location.href = friendlyURL("?module=home");
        }).catch(function() {
            console.log('Something has occured');
        });
}

$(document).ready(function() {
    // load_cart();
    // load_content();
    load_menu();
    click_logout();
    // click_shop();
});