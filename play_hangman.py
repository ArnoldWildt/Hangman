import eel
from Hangman import hangman
import words

char_list = []

eel.init('web')

game = hangman(words.easy_words())

difficulty_dict = {
    0: words.easy_words(),
    1: words.medium_words(),
    2: words.hard_words(),
}


@eel.expose
def start_round():
    game.start_round()
    eel.set_target_word(game.render_game())
    eel.update_stats(game.stats())
    eel.set_lifes(game.lifes, game.remaining_lifes())
    eel.clear_list()


@eel.expose
def set_options(difficulty, lifes):
    seleted_difficulty = difficulty_dict.get(int(difficulty.index(1)))

    game.set_words(seleted_difficulty)
    game.lifes = int(lifes)

    start_round()


@eel.expose
def actions_send(action_key):
    upper_action_key = chr(action_key).upper()

    key_response = game.action(action_key)
    eel.update_stats(game.stats())

    eel.set_lifes(game.lifes, game.remaining_lifes())

    if key_response != None:
        eel.add_key(upper_action_key)

    if game.current_game_won:
        eel.show_won()

    if game.current_game_lost:
        eel.show_lost(game.render_game().replace(" ", ""), game.target_word)
        return

    eel.set_target_word(game.render_game())


eel.start('main.html')
