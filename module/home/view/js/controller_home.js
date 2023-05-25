function loadBrand() {
    // console.log("dentro de brands");
    ajaxPromise(friendlyURL('?module=home&op=brand_carrusel'),'POST', 'JSON')
    .then(function(data) {
            // console.log(data);
            for (row in data) {
                $('<div></div>').attr('class', "carousel__elements").attr('id', data[row].name_brand).appendTo(".carousel__list").html(
                        "<img src=" + data[row].img_brand + " />" +
                        "</div>" 
                )
            }
            new Glider(document.querySelector('.carousel__list'), {
                slidesToShow: 5,
                slidesToScroll: 5,
                draggable: true,
                // dots: '.dots',
                arrows: {
                prev: '.glider-prev',
                next: '.glider-next'
                }
            });
        }).catch(function() {
            window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Brands HOME";
        });
}

function loadBodywork() {
    // console.log("dentro de bodywork");
    ajaxPromise(friendlyURL('?module=home&op=bodywork'),'POST', 'JSON')
    .then(function(data) {
        // console.log(data);
        for (row in data) {
            $('<div></div>').attr('class', "card").attr({ 'id': data[row].name_bodywork }).appendTo('#containerCategories')
                .html(
                    "<div class='card_image'>" +
                    "<img src=" + data[row].img_bodywork + " />" +
                    "</div>" +
                    "<div class='card_title title-black'>" +
                    "<p>" + data[row].name_bodywork + "</p>" +
                    "</div>"
                )
        }
    }).catch(function() {
        window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
    });
}

function loadCatTypes() {
    // console.log("dentro de type");
    ajaxPromise(friendlyURL('?module=home&op=type') ,'POST', 'JSON')
    .then(function(data) {
        // console.log(data);
        for (row in data) {
            $('<div></div>').attr('class', "card3").attr({ 'id': data[row].name_tmotor }).appendTo('#containerTypecar')
                .html(
                    "<div class='card_image'>" +
                    "<img src=" + data[row].img_tmotor + " />" +
                    "</div>" 
                )
        }
    }).catch(function() {
        window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Types_car HOME";
    });
}

function loadMostVisited() {
    // console.log("dentro de visited");
    ajaxPromise(friendlyURL('?module=home&op=most_visited') ,'POST', 'JSON')
    .then(function(data) {
            // console.log(data);
            for (row in data) {
                $('<div></div>').attr('class', "carousel__elements2").attr('id', data[row].id_car).appendTo(".carousel__list_cars").html(
                        "<img src=" + data[row].img_car + " />" +
                        "</div>" 
                )
            }
            new Glider(document.querySelector('.carousel__list_cars'), {
                slidesToShow: 2,
                slidesToScroll: 2,
                draggable: true,
                // dots: '.dots',
                arrows: {
                prev: '.glider-prev',
                next: '.glider-next'
                }
            });
        })
        .catch(function() {
            window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Brands HOME";
        });
}

function clicks() {

    // MARCAS

    $(document).on("click", '.carousel__elements', function() {
    
        var brand_filter_home = [];
        
        brand_filter_home.push( "name_brand", this.getAttribute('id') );
        localStorage.removeItem('filter_type');
        localStorage.removeItem('filter_bodywork');
        localStorage.removeItem('filter_brand');
        localStorage.removeItem('filter_model');
        localStorage.removeItem('filter');
        // localStorage.removeItem('type_filter_home');
        // localStorage.removeItem('bodywork_filter_home');
        localStorage.removeItem('filter_most_visited');

        localStorage.setItem('brand_filter_home', JSON.stringify(brand_filter_home));

        window.location.href = friendlyURL('?module=shop');
    });

    // CARROCERIA

    $(document).on("click", '.card', function() {

        // console.log("Hola");

        var bodywork_filter_home = [];
        
        bodywork_filter_home.push( "name_bodywork", this.getAttribute('id') );
        localStorage.removeItem('filter_type');
        localStorage.removeItem('filter_bodywork');
        localStorage.removeItem('filter_brand');
        localStorage.removeItem('filter_model');
        localStorage.removeItem('filter');
        // localStorage.removeItem('brand_filter_home');
        // localStorage.removeItem('type_filter_home');
        localStorage.removeItem('filter_most_visited');
        

        localStorage.setItem('bodywork_filter_home', JSON.stringify(bodywork_filter_home));

        window.location.href = friendlyURL('?module=shop');
    });


    // TIPO DE MOTOR

    $(document).on("click", '.card3', function() {

        // console.log("Hola");

        var type_filter_home = [];
        
        type_filter_home.push( "name_tmotor", this.getAttribute('id') );
        localStorage.removeItem('filter_type');
        localStorage.removeItem('filter_bodywork');
        localStorage.removeItem('filter_brand');
        localStorage.removeItem('filter_model');
        localStorage.removeItem('filter');
        // localStorage.removeItem('brand_filter_home');
        // localStorage.removeItem('bodywork_filter_home');
        localStorage.removeItem('filter_most_visited');

        localStorage.setItem('type_filter_home', JSON.stringify(type_filter_home));

        window.location.href = friendlyURL('?module=shop');
    });

    // MAS VISITADOS

    $(document).on("click", '.carousel__elements2', function() {

        var filter_most_visited = [];

        filter_most_visited.push( "id_car", this.getAttribute('id'));
        localStorage.removeItem('filter_type');
        localStorage.removeItem('filter_bodywork');
        localStorage.removeItem('filter_brand');
        localStorage.removeItem('filter_model');
        localStorage.removeItem('filter');
        // localStorage.removeItem('brand_filter_home');
        // localStorage.removeItem('bodywork_filter_home');
        // localStorage.removeItem('type_filter_home');

        localStorage.setItem('filter_most_visited', JSON.stringify(filter_most_visited));
        // console.log (this.getAttribute('id'));

        window.location.href = friendlyURL('?module=shop');
    });
}

function load_more_Books_car() {
    var limit = 3;

    $(document).on("click", '#cargar_libros', function() {
        limit = limit + 3;
        $('.books_car').remove();
        $('#cargar_libros').remove();
        ajaxPromise('https://www.googleapis.com/books/v1/volumes?q=Cars',
                'GET', 'JSON')
            .then(function(data) {

                if (limit === 6) {
                    $('<button class="no-results" id="">No hay mas libros disponibles</button></br>').appendTo('.btn-more-books');
                } else {
                    $('<button class="load_more_button" id="load_more_books">Cargar Mas Libros</button>').appendTo('.btn-more-books');
                }

                for (i = 0; i < limit; i++) {

                    $('<div></div>').attr({ id: 'books_car', class: 'books_car' }).appendTo('.books_content')
                        .html(

                            '<div class="col-md-4 col-sm-4 col-xs-12">' +
                            '<div class="panel panel-danger adjust-border-radius">' +
                            '<div class="title_book panel-heading adjust-border">' +
                            '<h4>' + data.items[i].volumeInfo.title + '</h4>' +
                            '</div>' +
                            '<div class="panel-body">' +
                            '<ul class="plan">' +
                            '<li class="Img_new"><img src=' + data.items[i].volumeInfo.imageLinks.thumbnail + '</li>' +
                            '<li><i id="col-ico" class="fa-solid fa-user-large fa-sm"></i>&nbsp;&nbsp;' + data.items[i].volumeInfo.authors[0] + '</li>' +
                            '<li><i id="col-ico" class="fa-solid fa-calendar-days fa-sm"></i>&nbsp;&nbsp;' + data.items[i].volumeInfo.publishedDate + '</li>' +
                            '</ul>' +
                            '</div>' +
                            '<div class="panel-footer">' +
                            '<a href=' + data.items[i].volumeInfo.infoLink + ' target="_blank" class="btn btn-danger btn-block btn-lg adjust-border-radius">MORE INFO</a>' +
                            '</div>' +
                            '</div>' +
                            '</div>'
                        );
                }

            }).catch(function() {
                // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=News cars HOME";
            });
    })
}

function get_Books_car() {
    limit = 3;
    ajaxPromise('https://www.googleapis.com/books/v1/volumes?q=Cars',
            'GET', 'JSON')
        .then(function(data) {
            data.items.length = limit;
            // $('<h2 class="cat">Books releted</h2>').appendTo('.books_content');
            $('<button class="load_more_button" id="cargar_libros">Cargar Mas Libros</button>').appendTo('.btn-more-books');
            for (i = 0; i < data.items.length; i++) {
                $('<div></div>').attr({ id: 'books_car', class: 'books_car' }).appendTo('.books_content')
                    .html(

                        '<div class="col-md-4 col-sm-4 col-xs-12">' +
                        '<div class="panel panel-danger adjust-border-radius">' +
                        '<div class="title_book panel-heading adjust-border">' +
                        '<h4>' + data.items[i].volumeInfo.title + '</h4>' +
                        '</div>' +
                        '<div class="panel-body">' +
                        '<ul class="plan">' +
                        '<li class="Img_new"><img src="' + data.items[i].volumeInfo.imageLinks.thumbnail + '"</li>' +
                        '<li><i id="col-ico" class="fa-solid fa-user-large fa-sm"></i>&nbsp;&nbsp;' + data.items[i].volumeInfo.authors[0] + '</li>' +
                        '<li><i id="col-ico" class="fa-solid fa-calendar-days fa-sm"></i>&nbsp;&nbsp;' + data.items[i].volumeInfo.publishedDate + '</li>' +
                        '</ul>' +
                        '</div>' +
                        '<div class="panel-footer">' +
                        '<a href=' + data.items[i].volumeInfo.infoLink + ' target="_blank" class="btn btn-danger btn-block btn-lg adjust-border-radius">Mas Informacion</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    );
            }
        }).catch(function() {
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=News cars HOME";
        });
    load_more_Books_car();
}

$(document).ready(function() {
    // console.log("hola");
    loadBrand();
    loadBodywork();
    loadCatTypes();
    loadMostVisited();
    clicks();
    get_Books_car();
});