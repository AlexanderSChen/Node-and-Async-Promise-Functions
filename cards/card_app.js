$(function() {
    url = "http://deckofcardsapi.com"

    // 1.
    async function drawCard() {
        let card = await $.getJSON(`${url}/api/deck/new/draw/?count=1`);
        console.log(`${card.cards[0].value.toLowerCase()} of ${card.cards[0].suit.toLowerCase()}`);
    }
    drawCard();

    // 2.
    async function drawTwoCards() {
        let firstCard = await $.getJSON(`${url}/api/deck/new/draw`);
        let deck_id = firstCard.deck_id;
        let secondCard = await $.getJSON(`${url}/api/deck/${deck_id}/draw/`);
        [firstCard, secondCard].forEach(card => {
            let {suit, value} = card.cards[0];
            console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
        });
    }
    drawTwoCards();

    // 3.
    async function setup() {
        let $btn = $('button');
        let $cardArea = $('#card-area');

        let deckData = await $.getJSON(`${url}/api/deck/new/shuffle`);
        $btn.show().on('click', async function () {
            let cardData = await $.getJSON(`${url}/api/deck/${deckData.deck_id}/draw/`);
            let cardSrc = cardData.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            $cardArea.append(
                $('<img>', {
                    src: cardSrc,
                    css: {
                        transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                    }
                })
            );
            if (cardData.remaining === 0) $btn.remove();
        });
    }
    setup();
});

