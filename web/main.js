var option_open = false;
var game_started = false;
var difficulty = [0, 0, 0]


$(document).ready(function () {
    clear_list();

    $('.ui.dropdown')
        .dropdown()
        ;

    $("#easy_btn").click(function () {
        difficulty = [1, 0, 0]; 
        $(this).toggleClass('active');
    });

    $("#medium_btn").click(function () {
        difficulty = [0, 1, 0];
        $("#option_btns").siblings().removeClass('active')
        $(this).addClass('active');
    });

    $("#hard_btn").click(function () {
        difficulty = [0, 0, 1];
        $(this).addaddClass('active');
    });

    $("#option_confirm").click(function () {
        var lifes = $("#lifes_input").val();
        eel.set_options(difficulty, lifes);
    })

    $("#option_btn").click(function () {
        show_option()
    });


});



function show_option() {
    $('.ui.modal')
        .modal('show')
        ;
}

function clear_target_word() {
    var target_word_element = document.getElementById("target_word")

    while (target_word_element.firstChild) {
        target_word_element.removeChild(target_word_element.firstChild);
    }
}

$(document).on("keypress", function (e) {
    if (!option_open && game_started) {
        eel.actions_send(e.which)
        console.log(e.which)
    }
});

function start_round() {
    eel.start_round()
    game_started = true
    document.getElementById("play_btn").innerHTML = "New Word"
    document.getElementById("play_btn").className = "ui grey button"
}