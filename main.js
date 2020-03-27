(function() {
    "use strict";

    let chat_history = [];

    /* Chat Viewer */
    //This function gets and prints all sorts of chat messages (i.e. normal chat, super chat and membership registration) every `refresh_rate` milliseconds.
    //It at the same time pushes all the chat messages to `chat_history`.
    //If your purpose is just this pushing process, pass `true` as the second argument.
    function chat_viewer(refresh_rate /* ms */ = 1000, is_silent_mode = false) {

        const chat_frame = document.querySelector('#chatframe');
        const chat_window = chat_frame.contentWindow;

        let last_id = "";

        function print_comment() {

            const chat_list = chat_window.document.querySelectorAll(`
                #items.yt-live-chat-item-list-renderer yt-live-chat-text-message-renderer,
                #items.yt-live-chat-item-list-renderer yt-live-chat-paid-message-renderer,
                #items.yt-live-chat-item-list-renderer yt-live-chat-membership-item-renderer
                                                                    `); //normal chat, super chat, membership registration

            let i;

            if (last_id == "") {
                i = -1;
            } else {
                for (i = chat_list.length - 1; i >= 0; --i) {
                    if (chat_list[i].id == last_id) {
                        break;
                    }
                }
            }

            last_id = chat_list[chat_list.length - 1].id;

            if (!is_silent_mode) {
                console.log("----------------------------------------");
            }

            for (++i; i < chat_list.length; ++i) {
                const chat_item = chat_list[i].childNodes[1].childNodes;
                const chat_type = chat_list[i].tagName;
                let timestamp;
                let author;
                let message;
                let output_string;
                if (chat_type == 'YT-LIVE-CHAT-TEXT-MESSAGE-RENDERER') { //normal chat
                    timestamp = chat_item[0].innerText;
                    author = chat_item[1].innerText;
                    message = chat_item[3].innerText;
                    output_string = `${timestamp} [${author}] ${message}`;
                } else if (chat_type == 'YT-LIVE-CHAT-PAID-MESSAGE-RENDERER') { //super chat
                    timestamp = chat_item[1].childNodes[8].childNodes[3].innerText;
                    author = chat_item[1].childNodes[8].childNodes[1].childNodes[1].innerText;
                    const amount = chat_item[1].childNodes[8].childNodes[1].childNodes[3].innerText;
                    message = chat_item[3].innerText;
                    output_string = `${timestamp} [${author}] (${amount}) ${message}`;
                } else if (chat_type == 'YT-LIVE-CHAT-MEMBERSHIP-ITEM-RENDERER') { //membership registration
                    timestamp = chat_item[1].childNodes[8].childNodes[3].innerText;
                    author = chat_item[1].childNodes[8].childNodes[1].childNodes[1].innerText;
                    message = chat_item[1].childNodes[8].childNodes[1].childNodes[3].innerText;
                    output_string = `${timestamp} [${author}] (New Member) ${message}`;
                }
                chat_history.push(message);
                if (!is_silent_mode) {
                    console.log(output_string);
                }
            }

        }

        const timer_id = window.setInterval(print_comment, refresh_rate);
        return timer_id;

    }

    /* Chat Bot */
    //This function posts the first argument `message` as a chat.
    function post_chat(message = `bot test ${Math.random()}`) {

        const chat_frame = document.querySelector('#chatframe');
        const chat_window = chat_frame.contentWindow;

        const message_box = chat_window.document.querySelector('#input.yt-live-chat-text-input-field-renderer');
        message_box.focus();
        message_box.innerText = message;

        message_box.dispatchEvent(new Event('input'));

        const send_button = chat_window.document.querySelector('#send-button #button.yt-button-renderer');
        send_button.click();

    }

    //Generates a random integer in the range [min, max).
    function int_rand(min, max) {
        return Math.floor((max - min) * Math.random() + min);
    }

    function sec_to_millisec(sec) {
        return sec * 1000;
    }

    //This function picks one element from `array`'s last `array_length` elements, appends `prefix` to it and passes the result to `post_chat` every `refresh_rate` milliseconds.
    function parrot_fashion(array, array_length, refresh_rate /* ms */, prefix = "") {

        function f() {

            let min = array.length - array_length;
            const max = array.length;
            if (min < 0) {
                min = 0;
            }

            const message = array[int_rand(min, max)] + prefix;

            post_chat(message);

        }

        const timer_id = window.setInterval(f, refresh_rate);
        return timer_id;

    }

    const timer_id = chat_viewer(sec_to_millisec(1));

    const timer_id_2 = parrot_fashion(chat_history, 15, sec_to_millisec(10));

    //At least on Firefox, operations rapidly get slower as outputs of console is accumulated.
    //To avoid this problem, we call `console.clear()` regularly.
    //(By the way, we don't know why the problem occurs. As you know, one doesn't experience such a problem in a shell (terminal).)
    function clear_console() {
        console.clear();
        console.log("TimerID:", timer_id, timer_id_2, timer_id_3);
    }

    const timer_id_3 = window.setInterval(clear_console, sec_to_millisec(10));

})();

