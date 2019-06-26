eel.expose(set_target_word);
function set_target_word(label_text) {

    clear_target_word()

    var target_word_element = document.getElementById("target_word")

    for (var i = 0; i < label_text.length; i++) {
        var char_item = document.createElement("span")
        if (label_text[i] == "_") {
            char_item.className = "ui white text"
        }
        else {
            char_item.className = "ui green text"
        }
        char_item.innerHTML = label_text[i]
        target_word_element.appendChild(char_item)
    }

}

eel.expose(add_key);
function add_key(key) {
    var key_item = document.createElement("div");
    key_item.className = "item";

    var font_node = document.createElement("font");
    font_node.color = "white";


    font_node.innerHTML = key;

    key_item.appendChild(font_node)

    document.getElementById("right_al").appendChild(key_item);

    $('body')
        .toast({
            position: 'bottom left',
            class: 'ui message',
            showIcon: false,
            message: 'Key pressed: ' + key
        })
        ;
}

eel.expose(update_stats);
function update_stats(stats) {
    console.log(stats)
    document.getElementById("games_won").innerHTML = stats[0]
    document.getElementById("games_lost").innerHTML = stats[1]
    document.getElementById("right_ans").innerHTML = stats[2]
    document.getElementById("wrong_ans").innerHTML = stats[3]
}

eel.expose(clear_list);
function clear_list() {
    var list_node = document.getElementById("right_al");
    while (list_node.firstChild) {
        list_node.removeChild(list_node.firstChild);
    }

    var misses_item = document.createElement("p");

    var font_node = document.createElement("font");
    font_node.color = "white";
    font_node.size = 5
    font_node.innerHTML = "Misses";

    misses_item.appendChild(font_node)


    list_node.appendChild(misses_item)
}

eel.expose(set_lifes);
function set_lifes(max_lifes, current_lifes) {
    $("#lifes_segment").empty();

    console.log(max_lifes)
    console.log(current_lifes)
    
    var life_dif = max_lifes - current_lifes;

    for (var i = 0; i < current_lifes; i++) {
        $("#lifes_segment").append('<i class="heart icon"></i>')
    }

    for (var i = 0; i < life_dif; i++) {
        $("#lifes_segment").append('<i class="heart outline icon"></i>')
    }
    
}

eel.expose(show_lost);
function show_lost(current_target_word, full_target_word) {
    $('body')
        .toast({
            position: 'bottom left',
            class: 'error',
            showIcon: false,
            message: 'Game Lost!'
        })
        ;

    console.log(full_target_word)
    console.log(current_target_word)

    clear_target_word()

    var target_word_element = document.getElementById("target_word")

    for (var i = 0; i < current_target_word.length; i++) {
        var char_item = document.createElement("span")
        if (current_target_word[i] == "_") {
            char_item.className = "ui red text"
        }
        else {
            char_item.className = "ui green text"
        }
        char_item.innerHTML = full_target_word[i]
        target_word_element.appendChild(char_item)
    }

}


eel.expose(show_won);
function show_won() {
    $('body')
        .toast({
            position: 'bottom left',
            class: 'success',
            showIcon: false,
            message: 'Game Won'
        })
        ;
}

eel.expose(show_note);
function show_note(note_text) {
    $('body')
        .toast({
            position: 'bottom left',
            class: 'ui message',
            showIcon: false,
            message: note_text
        })
        ;
}