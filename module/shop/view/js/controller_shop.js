
function ajaxForSearch(url,filter,items,total_items) {
    ajaxPromise(friendlyURL(url), 'POST', 'JSON', { 'filter': filter, 'items': items, 'total_items': total_items})
        .then(function(data) {

            // console.log(data);

            $('#content_shop_cars').empty();
            $('.date_car' && '.date_img').empty();

                for (row in data) {
                    $('<div></div>').attr('class', "").attr({ 'id': data[row].id_car }).appendTo('#content_shop_cars')
                        .html(
                            "<div class='container mt-5 mb-5'>" +
                                "<div class='d-flex justify-content-center row'>" +
                                    "<div class='col-md-10'>" +
                                        "<div class='row p-2 bg-white border rounded mt-2'>" +
                                            "<div class='col-md-3 mt-1'><img class='img-fluid img-responsive rounded product-imagen' src=" + data[row].img_car + "></div>" +
                                            "<div class='col-md-6 mt-1'>" +
                                                "<h5>" + data[row].num_plate +  "</h5>" +
                                                "<div class='d-flex flex-row'>" +
                                                    "<div class='ratings mr-2'><i class='fa fa-star'></i><i class='fa fa-star'></i><i class='fa fa-star'></i><i class='fa fa-star'></i></div><span>110</span>" +
                                                "</div>" +
                                                "<div class='mt-1 mb-1 spec-1'><span> " + 'modelo: ' + data[row].name_model + "</span></div>" +
                                                "<a class='like_heart' id='" + data[row].id_car + "'><i id= " + data[row].id_car + " class='fa-solid fa-heart fa-lg'></i></a>" +
                                            "</div>" +
                                            "<div class='align-items-center align-content-center col-md-3 border-left mt-1'>" +
                                                "<div class=d-flex flex-row align-items-center'>" +
                                                    "<h4 class='mr-1'>" + data[row].price + '€' + "</h4>" +
                                                "</div>" +
                                                "<div class='d-flex flex-column mt-4'><button class='btn btn-primary btn-sm add_to_card fa-solid fa-cart-shopping fa-2xl add_cart' id='" + data[row].id_car + "'type='button'></button></div>" +
                                                "<div class='d-flex flex-column mt-4'><button class='btn btn-primary btn-sm more_info_list' id='" + data[row].id_car + "'type='button'>Detalles</button></div>" +
                                            "</div>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>" +
                            "</div>"
                        )
                    }
                mapBox_all(data);
                // load_likes_user(); 
        }).catch(function() {
            $("#content_shop_cars").empty();
            $('<div></div>').appendTo('#content_shop_cars').html('<h1>No hay coches con estos filtros</h1>');
        });
}

function loadListCars( items=3, total_items=0 ) {

    var filters_search = JSON.parse(localStorage.getItem('filters_search'));

    var filter_most_visited = JSON.parse(localStorage.getItem('filter_most_visited'));

    var filter = JSON.parse(localStorage.getItem('filter'));

    var filters_home = JSON.parse(localStorage.getItem('type_filter_home')) || JSON.parse(localStorage.getItem('brand_filter_home')) || JSON.parse(localStorage.getItem('bodywork_filter_home'));

    var id_coche = JSON.parse(localStorage.getItem('id_car'));

    if (filter_most_visited) {
        loadDetails(filter_most_visited[1]);
        localStorage.removeItem('filter_most_visited');

    } else if (filters_search){
        // console.log("dentro de search");
        // var filter = filters_search;
        ajaxForSearch("?module=shop&op=filter", filters_search, items, total_items);

    } else if (filters_home){
        // console.log("dentro de js de shop del salto de home");
        var filter = filters_home;
        ajaxForSearch("?module=shop&op=filter", [filter],items,total_items);

    } else if (id_coche) {
        loadDetails(id_coche);

    } else if (filter) {
        ajaxForSearch("?module=shop&op=filter", filter,items,total_items);

    } else {
        ajaxForSearch("?module=shop&op=all_cars",undefined,items,total_items);
    }
}

    // DETALLES //

function clicks() {
    $(document).on("click", ".more_info_list", function() {
        var id_car = this.getAttribute('id');
        // console.log(id_car);
        // mas_visitados(id_car)
        loadDetails(id_car);
        coches_relacionados(id_car); 
    });

    $(document).on("click", ".numero_paginas", function() {
        var num = this.getAttribute('id');
        total_prod = 3 * (num - 1);
        loadListCars(3, total_prod);
    });

    $(document).on("click", ".like_heart", function() {
        var id_car = this.getAttribute('id');
        click_like(id_car);
    });

    $(document).on("click", ".add_cart", function() {
        var id_car = this.getAttribute('id');
        // console.log(id_car);
        add_cart(id_car);
    });
}

function loadDetails(id_car) {
    ajaxPromise(friendlyURL('?module=shop&op=details_car') , 'POST', 'JSON' , { 'id_car': id_car})
    .then(function(data) {
        
        // MEJORA DE COCHES RELACIONADOS , LE PASO TAMBIEN LA ID DEL PROPIO COCHE PARA NO MOSTRARLO EN LOS COCHES RELACIONADOS DE ÉL MISMO
        more_cars_related(data[0].name_brand, data[0].id_car);
        
        // MEJORA SUMAR VISITAS DANDO IGUAL DESDE DONDE VENGA EL USUARIO
        mas_visitados(data[0].id_car);
        
        $('.div_search').empty();
        $('#div_search').empty();

        $('#numero_paginas').hide();
        $('#numero_paginas').empty();
        $('.filters').empty();
        $('#content_shop_cars').empty();
        $('.date_img_dentro').empty();
        $('.date_car_dentro').empty();

        
        for (row in data) {
            $('<div></div>').attr({ 'id': data[0].id_car, class: 'date_img_dentro' }).appendTo('.date_img')
                .html(
                    "<div class='content-img-details'>" +
                    "<img src= '" + data[row].img_cars + "'" + "</img>" +
                    "</div>"
                )
        }
        
        $('<div></div>').attr({ 'id': data[0].id_car, class: 'date_car_dentro' }).appendTo('.date_car')
            .html(
                "<div class='list_product_details'>" +
                "<div class='product-info_details'>" +
                "<div class='product-content_details'>" +
                "<h1><b>" + data[0].num_plate + "</b></h1>" +
                "<hr class=hr-shop>" +

                "<table id='table-shop'> <tr>" +
                "<td>" + data[0].count + " Visitas" + "</td>" +
                "<td> <i id='col-ico' class='fa-solid fa-road fa-2xl'></i> &nbsp;" + data[0].Km + "KM" + "</td>" +
                "<td> <i id='col-ico' class='fa-solid fa-car fa-2xl'></i> &nbsp;" + data[0].name_bodywork + "</td>" +
                "<td> <i id='col-ico' class='fa-solid fa-door-open fa-2xl'></i> &nbsp;" + data[0].num_doors + "</td>  </tr>" +
                "<td> <i id='col-ico' class='fa-solid fa-gas-pump fa-2xl'></i> &nbsp;" + data[0].name_tmotor + "</td>" +
                "<td> <i id='col-ico' class='fa-solid fa-calendar-days fa-2xl'></i> &nbsp;" + data[0].matriculation_date + "</td>  </tr>" +
                "<td> <i id='col-ico' class='fa-solid fa-palette fa-2xl'></i> &nbsp;" + data[0].color + "</td>" +
                "<td> <i class='fa-solid fa-location-dot fa-2xl'></i> &nbsp;" + data[0].city + "</td> </tr>" +
                "</table>" +

                "<div class='buttons_details'>" +
                "<span class='button' id='price_details'>" + data[0].price + "€" + "</span>" + "<br>" +
                "<a class='like_heart' id='" + data[0].id_car + "'><i id=" + data[0].id_car + " class='fa-solid fa-heart fa-lg'></i></a>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div class='col-md-7'>" +
                    "<div class='glider-contain2'>" +
                        "<div class= + date_img + >" +
                        "</div>" +
                        "<button aria-label='Previous' class='glider-prev'>«</button>" +
                        "<button aria-label='Next' class='glider-next'>»</button>" +
                        "<div role='tablist' class='dots'></div>" +
                    "</div>" +
                "</div>"
            )

        new Glider(document.querySelector('.date_img'), {
                slidesToShow: 1,
                slidesToScroll: 1,
                draggable: true,
                dots: '.dots',
                arrows: {
                prev: '.glider-prev',
                next: '.glider-next'
            }
        });

        id_coche = JSON.parse(localStorage.getItem('id_car'));

        // console.log(id_coche);
        if (id_coche) {    
            click_like(id_coche);
            // console.log(id_coche);
            // location.reload();
        }
        load_likes_user();  
        localStorage.removeItem('id_car');

    }).catch(function() {
        // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Load_Details SHOP";
    });
}

    // FILTROS //

function filter_button() {

    //Filtro type_motor
    $(function () {
        $('.filter_type').change(function () {
            localStorage.setItem('filter_type', this.value);
        });
        if (localStorage.getItem('filter_type')) {
            $('.filter_type').val(localStorage.getItem('filter_type'));
        }
    });

    //Filtro bodywork
    $(function () {
        $('.filter_bodywork').change(function () {
            localStorage.setItem('filter_bodywork', this.value);
        });
        if (localStorage.getItem('filter_bodywork')) {
            $('.filter_bodywork').val(localStorage.getItem('filter_bodywork'));
        }
    });

    //Filtro brand
    $(function () {
        $('.filter_brand').change(function () {
            localStorage.setItem('filter_brand', this.value);
        });
        if (localStorage.getItem('filter_brand')) {
            $('.filter_brand').val(localStorage.getItem('filter_brand'));
        }
    });

    //Filtro orden
    $(function() {
        $('.order_filter').change(function() {
            localStorage.setItem('order_filter', this.value);
        });
        if (localStorage.getItem('order_filter')) {
            $('.order_filter').val(localStorage.getItem('order_filter'));
        }
    });

    $(document).on('click', '.filter_button', function () {
        var filter = [];

        if (localStorage.getItem('filter_type')) {
            filter.push(['name_tmotor', localStorage.getItem('filter_type')])
            localStorage.removeItem('filter_type');
        }
        if (localStorage.getItem('filter_bodywork')) {
            filter.push(['name_bodywork', localStorage.getItem('filter_bodywork')])
            localStorage.removeItem('filter_bodywork');
        }
        if (localStorage.getItem('filter_brand')) {
            filter.push(['name_brand', localStorage.getItem('filter_brand')])
            localStorage.removeItem('filter_brand');
        }
        if (localStorage.getItem('order_filter')) {
            filter.push(['order', localStorage.getItem('order_filter')])
            // localStorage.removeItem('order_filter');
        }

        localStorage.setItem('filter',JSON.stringify(filter));

        // if (filter) {
            // console.log(filter);
            // ajaxForSearch("?module=shop&op=filter",filter);
            location.reload();
        // }

        // else {
        //     ajaxForSearch("?module=shop&op=all_cars",undefined,items,total_items);
        // }

        // highlight(filter);
    });
}

function print_filters() {
    $('<div class="div-filters"></div>').appendTo('.filters')
        .html(
            '<div class="summary"' +
            '<label for="filter_type">Tipo de motor : </label>' + ' ' +
            '<select class="filter_type">' +
            '<option value="">Todos los tipos</option>' +
            '<option value="electrico">Electrico</option>' +
            '<option value="hibrido">Hibrido</option>' +
            '<option value="diesel">Diesel</option>' +
            '<option value="gasolina">Gasolina</option>' +
            '</select>' + ' ' + ' ' +
            '<label for="filter_bodywork">Tipo de carroceria : </label>' + ' ' +
            '<select class="filter_bodywork">' +
            '<option value="">Todos los tipos</option>' +
            '<option value="berlina">Berlina</option>' +
            '<option value="familiar">Familiar</option>' +
            '<option value="coupe">Coupe</option>' +
            '<option value="monovolumen">Monovolumen</option>' +
            '<option value="suv">SUV</option>' +
            '<option value="cabrio">Cabrio</option>' +
            '<option value="pickup">PickUp</option>' +
            '</select>' + ' ' + ' ' +
            '<label for="filter_brand">Marca : </label>' + ' ' +
            '<select class="filter_brand">' +
            '<option value="">Todas las marcas</option>' +
            '<option value="audi">Audi</option>' +
            '<option value="bmw">BMW</option>' +
            '<option value="citroen">Citroen</option>' +
            '<option value="ford">Ford</option>' +
            '<option value="mercedes">Mercedes</option>' +
            '<option value="peugeot">Peugeot</option>' +
            '<option value="toyota">Toyota</option>' +
            '</select>' + ' ' + ' ' +
            '<label for="order_filter">Ordenar por: </label>' + ' ' +
            '<select class="order_filter">' +
            '<option value="">Nada</option>' +
            '<option value="price">Mas caros</option>' +
            '<option value="Km">Mas kilómetros</option>' +
            '</select>' +
            '<div id="overlay">' +
            '<div class= "cv-spinner" >' +
            '<span class="spinner"></span>' +
            '</div>' +
            '<button class="filter_button button_spinner" id="Button_filter">Filter</button>' +
            '<button class="filter_remove" id="filter_remove">Remove</button>' +
            '</div>'
            )
}

function remove_filters(){

    $(document).on('click', '.filter_remove', function () {
        localStorage.removeItem('filter_type');
        localStorage.removeItem('filter_bodywork');
        localStorage.removeItem('filter_brand');
        localStorage.removeItem('filter_model');
        localStorage.removeItem('filter');
        localStorage.removeItem('brand_filter_home');
        localStorage.removeItem('bodywork_filter_home');
        localStorage.removeItem('type_filter_home');
        localStorage.removeItem('filters_search');
        location.reload();
    })
}

    // MAPA
    
function mapBox(data) {

    // console.log(data);

    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';

    const mapa = new mapboxgl.Map({
        container: 'mapa',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [data.lon, data.lat], // starting position [lng, lat]
        zoom: 13 // starting zoom
    });

    const markerOntinyent = new mapboxgl.Marker()
    const minPopup = new mapboxgl.Popup()
    minPopup.setHTML(
        '<h4>' + data[0].brand_name + '</h4><p>Modelo: ' + data[0].name_model + '</p>' +
        '<p>Precio: ' + data[0].price + '€</p>')
    markerOntinyent.setPopup(minPopup)
        .setLngLat([data.lon, data.lat])
        .addTo(mapa);
}

function mapBox_all(data) {

    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-0.6051959012048119,38.82075751889131], // starting position [lng, lat]
        zoom: 13 // starting zoom
    });

    for (row in data) {
        const marker = new mapboxgl.Marker()
        const minPopup = new mapboxgl.Popup()
        minPopup.setHTML(
            // console.log(data) +
            '<img class="fotos" src=" ' + data[row].img_car + '"/>' +
            '<p style="text-align:center;">Modelo: <b>' + data[row].name_model + '</b></p>' +
            '<p style="text-align:center;">Precio: <b>' + data[row].price + '€</b></p>' +
            "<div class='d-flex flex-column mt-4'><button class='btn btn-primary btn-sm more_info_list' id='" + data[row].id_car + "type='button'>Detalles</button></div>")
        marker.setPopup(minPopup)
            .setLngLat([data[row].lon, data[row].lat])
            .addTo(map);
    }
}

function mas_visitados(id_car){

    // console.log(id_car);

    ajaxPromise(friendlyURL('?module=shop&op=contador_visitas') , 'POST', 'JSON' , { 'id_car': id_car})
    .then(function(data) {
            
        // console.log(data);

        }).catch(function () {
        window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Load_Details SHOP";
    });
}

function coches_relacionados(items, brand, id , total_items) {

    ajaxPromise(friendlyURL('?module=shop&op=coches_relacionados'), 'POST', 'JSON', { 'brand_name': brand, 'id_car': id , 'items': items , 'total_items': total_items})
        .then(function(data) {

            // console.log(data);
            $('.btn-more-books').empty();

            if (items === total_items-1) {

                $('<button class="no-results" id="">No hay mas coches disponibles</button></br>').appendTo('.btn-more-books');
            } else {
                $('<button class="load_more_button" id="load_more_button">Cargar Mas Coches</button>').appendTo('.btn-more-books');
            }

            for (i = 0; i < 1; i++) {
                
                $('<div></div>').attr({ 'id': data[i].id_car, 'class': 'more_info_list' }).appendTo('.car_content')
                            .html(
                                "<li class='portfolio-item'>" +
                                "<div class='item-main'>" +
                                "<div class='portfolio-image'>" +
                                "<img src = " + data[i].img_car + " alt='imagen car' </img> " +
                                "</div>" +
                                "<h5>" + data[i].id_brand + "  " + data[i].name_model + "</h5>" +
                                "</div>" +
                                "</li>"
                            )
            }
        }).catch(function() {
            // console.log("ERROR DE COCHES SELECCIONADOS");
        });
}

function more_cars_related(name_brand, id_car) {

    ajaxPromise(friendlyURL('?module=shop&op=count_cars_related'), 'POST', 'JSON', { 'brand_name': name_brand , 'id_car' : id_car})
        .then(function(data) {

            // console.log(data);
            var items = 0;
            var total_items = data[0].n_prod;
            // // console.log(total_items);
            coches_relacionados(0, name_brand, id_car, total_items);

            $(document).on("click", '.load_more_button', function() {
                items = items + 1;
                // console.log(items);
                $('.more_car__button').empty();
                coches_relacionados(items, name_brand, id_car ,total_items);
            });
        }).catch(function() {
            // console.log('ERROR DE MORE CARS');yy
        });
}

// (MEJORA) PAGINACION MANUAL  <----
function pagination() {

    var filters_home = JSON.parse(localStorage.getItem('type_filter_home')) || JSON.parse(localStorage.getItem('brand_filter_home')) || JSON.parse(localStorage.getItem('bodywork_filter_home'));

    var filters_shop = JSON.parse(localStorage.getItem('filter'));

    if (filters_home) {
        var url = "?module=shop&op=count_home";
        var filter = filters_home; 

    } else if (filters_shop) {
        var url = "?module=shop&op=count_shop";
        var filter = filters_shop; 

    } else {
        var url = "?module=shop&op=count_all";
        var filter = undefined;
    }

    ajaxPromise(friendlyURL(url), 'POST', 'JSON' , {'filter': filter})
        .then(function(data) {
            
            var total_prod = data[0].n_prod;

            if (total_prod >= 3) {
                total_pages = Math.ceil(total_prod / 3)
            } else {
                total_pages = 1;
            }

            for (i = 0; i < total_pages; i++) {
                
                $('<div></div>').attr({ 'id': i}).appendTo('#numero_paginas')
                            .html(
                                "<div><button class='numero_paginas' id='" + ( i + 1) + "'type='button'>" + ( i + 1) + "</button></div>"
                                )
            }
        })
}

function click_like(id_car) {

    var token = localStorage.getItem('token');

    if (token) {

        ajaxPromise(friendlyURL("?module=shop&op=control_likes"), 'POST', 'JSON', { 'id_car': id_car, 'token': token })
            .then(function(data) {
                console.log(data);

                $("#" + id_car + ".fa-heart").toggleClass('like_red');
            }).catch(function() {
                window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function click_like SHOP";
            });

    } else {

        var id_coche = [];
        id_coche.push(id_car);
        localStorage.setItem('id_car', id_car);

        toastr.warning("Debes de iniciar session");
        //PREGUNTAR COM POSAR TIMEOUT EN friendlyURL
        setTimeout("location.href = '?module=login'", 1000);
    }
}

function load_likes_user() {
    var token = localStorage.getItem('token');

    if (token) {
        // console.log("dentro de load like");
        ajaxPromise(friendlyURL("?module=shop&op=load_likes_user"), 'POST', 'JSON', {'token': token})
            .then(function(data) {

                // console.log(data);

                for (row in data) {
                    $("#" + data[row].id_car + ".fa-heart").toggleClass('like_red');
                }
            }).catch(function() {
                window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function load_like_user SHOP";
            });
    }
}

function add_cart(id_car){

    var token = localStorage.getItem('token');

    if(token){
        // console.log("dentro de add con token");
        ajaxPromise(friendlyURL("?module=cart&op=insert_cart"), 'POST', 'JSON', { 'id_car': id_car, 'token': token })
        .then(function(data) { 

            console.log(data);
            
            toastr.success("Coche añadido a la cesta");

        }).catch(function() {
            window.location.href = 'index.php?page=error333'
        });  
    }else{
        toastr.warning("Debes de iniciar session");
        setTimeout(window.location.href = friendlyURL("?module=login", 1000));
    }
}

$(document).ready(function() {
    // console.log("dentro de shop");
    loadListCars();
    clicks();
    print_filters();
    filter_button();
    remove_filters();
    pagination();
});