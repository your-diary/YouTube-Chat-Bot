# YouTube Chat Bot

## Introduction

Recently we often observe a new type of chat bots on YouTube. They are different from traditional chat bots in that

- Messages they post do **not** contain harmful contents (e.g. URL of spam websites).

- Their icons are normally erotic and their names are usually like "See My Profile" or such.

- At first glance it seems they are not bots. This is because the messages they post are relevant to the contents of the live streams. It is said that this behavior is implemented by collecting recent chats posted by other (real) users and periodically re-posting them.

In this project, we reproduce such a chat bot.

## Caveat

This project was created for the purpose of studying chat bots. Every test is done in our private live streams. **Never use this project as a spam bot.**

## Files

### `main.js`

This script does two things asynchronously:

- To collect chats posted by other users and to store them in the pool `c` every `n` milliseconds.

- To post chats every `m` milliseconds whose contents are created using a randomly chosen element from `c`.

See the figure below for the structure.

![structure_of_main_js](misc/fig_main_js.png)

### `example.js`

This script initializes the pool `c` using pre-collected chats (see `chat_list.js`), randomly chooses one chat from the pool every `n` milliseconds, appends a random emoji (see `emoji_list.js`) to it and finally posts the resultant text as a chat.

Demo:

![demo_of_example_js](misc/demo_example_js.gif)

## Environments

### Supported OSes

This project is cross-platform. Every OS is supported.

### Supported Browsers

The scripts are tested on Firefox and Google Chrome.

## Usage

1. Open any live stream page.

2. Open web console of your browser.

3. Execute a script in it.

<!-- vim: spell -->

