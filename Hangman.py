import random
import os


class hangman:
    def __init__(self, words, file_path=None):
        self.target_word = ""
        self.lifes = 6
        self.lifes_lost = 0
        self.render_word = ""
        self.chars_entered = []

        self.games_lost = 0
        self.games_won = 0
        self.wrong_answers = 0
        self.right_answers = 0

        self.current_game_won = False
        self.current_game_lost = False

        self.words = words

        if not file_path == None:
            self.load_data(file_path)

        self.alphabet = [chr(97+num) for num in range(26)]


    def choice_word(self):
        self.target_word = random.choice(self.words)
        return self.target_word


    def set_words(self, words):
        self.words = words


    def load_data(self, file_path):
        if not os.path.exists(file_path):
            print("No Words found.")
            return

        with open(file_path, "r") as word_file:
            self.words = [word.replace("\n", "")
                          for word in word_file.readlines()]


    def find_index(self, char):
        return [i for i, ltr in enumerate(self.target_word) if ltr == char]


    def render_game(self):
        return " ".join(self.render_word)


    def stats(self):
        return (self.games_won,
                self.games_lost,
                self.right_answers,
                self.wrong_answers,
                )


    def start_round(self):
        self.choice_word()
        self.chars_entered = []
        self.lifes_lost = 0
        self.current_game_won = False
        self.current_game_lost = False
        len_word = len(self.target_word)

        self.render_word = ["_" for i in range(len_word)]


    def playable(self, input_char):
        if not input_char in self.alphabet:
            return False

        if input_char in self.chars_entered:
            return False

        if self.current_game_won or self.current_game_lost:
            return False

        return True


    def remaining_lifes(self):
        return self.lifes - self.lifes_lost


    def action(self, input_char):
        input_char = chr(int(input_char))

        if not self.playable(input_char):
            return None

        self.chars_entered.append(input_char)

        if not input_char in self.target_word:
            self.lifes_lost += 1
            self.wrong_answers += 1

            if self.remaining_lifes() <= 0:
                self.games_lost += 1
                self.current_game_lost = True

        else:
            for index in self.find_index(input_char):
                self.render_word[index] = input_char

            self.right_answers += 1

            if self.render_word.count("_") <= 0:
                self.games_won += 1
                self.current_game_won = True

        return input_char


if __name__ == "__main__":
    import words

    game = hangman(words.easy_words())
    game.start_round()
    while True:
        game.action(ord(input()))
