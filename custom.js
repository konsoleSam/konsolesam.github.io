function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

class Typewriter {
    constructor(element, messages) {
        this.element = element;
        this.messages = messages;
        this.loop = 0;
        this.message = messages[0];
        this.delete = true;
        this.tick();
    }

    tick() {
        let i = this.loop % this.messages.length;
        if (i == 0 && this.message == "") {
            this.messages = shuffle(this.messages);
        }
        let message = this.messages[i];
        let that = this;
        let delta = 200 - Math.random() * 100;

        if (this.delete) {
            this.message = message.substring(0, this.message.length - 1);
            delta /= 2
            if (this.message == "") {
                this.delete = false;
                this.loop++;
                delta = 500;
            }
        } else {
            this.message = message.substring(0, this.message.length + 1);
            if (this.message == message) {
                delta = 2000;
                this.delete = true;
            }
        }

        this.element.innerHTML = this.message + "<br>";

        setTimeout(function () {
            that.tick();
        }, delta);
    }
}

window.onload = function () {
    let elements = document.getElementsByClassName('typewriter');
    for (let i = 0; i < elements.length; i++) {
        let messages = elements[i].getAttribute('messages');
        if (messages) {
            new Typewriter(elements[i], JSON.parse(messages));
        }
    }
};