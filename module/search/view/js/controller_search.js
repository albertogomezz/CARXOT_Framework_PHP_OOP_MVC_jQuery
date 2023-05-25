
function load_brands() {

    // console.log("Hola laod brands");

        ajaxPromise(friendlyURL('?module=search&op=search_brand'), 'POST', 'JSON')
        .then(function (data) {

            // console.log(data);
            $('<option>Brand</option>').attr('selected', true).attr('disabled', true).appendTo('.search_brand')
            for (row in data) {
                $('<option value="' + data[row].name_brand + '">' + data[row].name_brand + '</option>').appendTo('.search_brand')
            }
            
        }).catch(function () {
            window.location.href = "index.php?modules=exception&op=503&error=fail_load_brands&type=503";
        });
}

function load_model(brand) {

    // console.log(brand);

    $('.search_model').empty();

    if (brand == undefined) {
        ajaxPromise(friendlyURL('?module=search&op=search_model_null'), 'POST', 'JSON')
            .then(function (data) {
                // console.log(data);
                $('<option>Model</option>').attr('selected', true).attr('disabled', true).appendTo('.search_model')
                for (row in data) {
                    $('<option value="' + data[row].name_model + '">' + data[row].name_model + '</option>').appendTo('.search_model')
                }
            }).catch(function () {
                window.location.href = "index.php?modules=exception&op=503&error=fail_load_model&type=503";
            });
    }
    else {
        ajaxPromise(friendlyURL('?module=search&op=search_model'), 'POST', 'JSON', {brand})
            .then(function (data) {
                // console.log(data);
                for (row in data) {
                    $('<option value="' + data[row].name_model + '">' + data[row].name_model + '</option>').appendTo('.search_model')
                }
            }).catch(function () {
                window.location.href = "index.php?modules=exception&op=503&error=fail_loas_model_2&type=503";
            });
    }
}

function launch_search() {
    // console.log("dentro de launch_search");
    load_brands();
    load_model();

    $(document).on('change', '.search_brand', function () {
        let brand = this.value;
        if (brand === 0) {
            load_model();
        } else {
            load_model(brand);
        }
    });
}

function autocomplete() {

    $("#autocom").on("keyup", function () {

        let sdata = { city: $(this).val() };
            // console.log(sdata);
        if (($('.search_brand').val() != 0)) {
            sdata.brand = $('.search_brand').val();
            if (($('.search_brand').val() != 0) && ($('.search_model').val() != 0)) {
                sdata.model = $('.search_model').val();
            }
        }

        if (($('.search_brand').val() == undefined) && ($('.search_model').val() != 0)) {
            sdata.model = $('.search_model').val();
        }
        
        ajaxPromise(friendlyURL('?module=search&op=autocomplete'), 'POST', 'JSON', {sdata})
            .then(function (data) {

                // console.log(data);
                $('#searchAuto').empty();
                $('#searchAuto').fadeIn(10000000);
                for (row in data) {
                    $('<div></div>').appendTo('#search_auto').html(data[row].city).attr({ 'class': 'searchElement', 'id': data[row].city });
                }
                $(document).on('click', '.searchElement', function () {
                    $('#autocom').val(this.getAttribute('id'));
                    $('#search_auto').fadeOut(1000);
                });
                $(document).on('click scroll', function (event) {
                    if (event.target.id !== 'autocom') {
                        $('#search_auto').fadeOut(1000);
                    }
                });
            }).catch(function () {
                $('#search_auto').fadeOut(500);
            });
    });
}

// function button_search() {
    
//     $('#search-btn').on('click', function () {
//         var filters_search = [];

//         if ($('.search_brand').val() != undefined) {
//             filters_search.push( "name_brand", $('.search_brand').val() );

//             if ($('.search_model').val() != undefined) {
//                 filters_search.push( "name_model",$('.search_model').val() );
//             }
//             if ($('#autocom').val() != undefined) {
//                 filters_search.push( "city",$('#autocom').val() );
//             }
//         } else if ($('.search_brand').val() == undefined) {
//             if ($('.search_model').val() != undefined) {
//                 filters_search.push( "name_model",$('.search_model').val() );
//             }

//             if ($('#autocom').val() != undefined) {
//                 filters_search.push( "city",$('#autocom').val() );
//             }
//         }

//         localStorage.removeItem('filters_search');

//         if (filters_search.length != 0) {
//             localStorage.setItem('filters_search', JSON.stringify(filters_search));
//         }
//         window.location.href = '?module=shop&op=view';
//     });
// }

function button_search1 () {
    
    $('#search-btn').on('click', function () {
        var filters_search = [];

        if ($('.search_brand').val() != 0 && $('.search_brand').val() != null ) {
            filters_search.push(["name_brand", $('.search_brand').val()]);

            if ($('.search_model').val() != 0 && $('.search_model').val() != null) {
                filters_search.push(["name_model",$('.search_model').val()]);
            }
            if ($('#autocom').val() != undefined) {
                filters_search.push(["city",$('#autocom').val()]);
            }
        } else if ($('.search_brand').val() == undefined) {
            if ($('.search_model').val() != 0 && $('.search_model').val() != null) {
                filters_search.push(["name_model",$('.search_model').val()]);
            }

            if ($('#autocom').val() != undefined) {
                filters_search.push(["city",$('#autocom').val()]);
            }
        }

        localStorage.removeItem('filters_search');

        if (filters_search.length != 0) {
            localStorage.setItem('filters_search', JSON.stringify(filters_search));
        }
        window.location.href = '?module=shop&op=view';
    });
}

$(document).ready(function () {

    // console.log("Hola search");

    launch_search();
    autocomplete();
    button_search1();
});