const quotes = [
    "Everything is an experiment until it has a deadline. That gives it a destination, context, and a reason.",
    "Ideas reflect the moment, and so you have to use them. If you store ideas, they wither.",
    "It's not the destination that matters. It's the change of scene.",
    "Cooking is a way of listening to the radio.",
    "Culture is everything you don't have to do.",
    "More and more I find I want to be living in a Big Here and a Long Now.",
    "I believe in singing. I believe in singing together.",
    "Honour thy error as a hidden intention.",
];

function getRandomIndex(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
}

function getRandomQuote(quotes) {
    const randomNumber = getRandomIndex(quotes.length);
    return quotes[randomNumber];
}

function renderQuote(quote) {
    const quoteContainer = document.getElementById("quote");
    quoteContainer.insertAdjacentHTML("beforeend", quote);
}

const inspirationButton = document.getElementById("inspiration-button");
inspirationButton.addEventListener("click", function () {
    const quote = getRandomQuote(quotes);
    renderQuote(quote);
});
