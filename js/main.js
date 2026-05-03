"use strict";

const cards = {
    card1: {
        inputA: document.querySelector('#card-1-a'),
        inputB: document.querySelector('#card-1-b'),
        swapButton: document.querySelector('#card-1-swap-button'),

        percentageA: document.querySelector('#card-1-percentage-value-a'),
        percentageB: document.querySelector('#card-1-percentage-value-b'),
        percentageResult: document.querySelector('#card-1-percentage-result'),

        percentA: document.querySelector('#card-1-percent-value-a'),
        percentB: document.querySelector('#card-1-percent-value-b'),
        percentResult: document.querySelector('#card-1-percent-result'),

        deltaA: document.querySelector('#card-1-delta-value-a'),
        deltaB: document.querySelector('#card-1-delta-value-b'),
        deltaResult: document.querySelector('#card-1-delta-result'),
    },
    card2: {
        inputA: document.querySelector('#card-2-a'),
        inputB: document.querySelector('#card-2-b'),
        swapButton: document.querySelector('#card-2-swap-button'),

        percentageA: document.querySelector('#card-2-percentage-value-a'),
        percentageB: document.querySelector('#card-2-percentage-value-b'),
        percentageResult: document.querySelector('#card-2-percentage-result'),

        percentA: document.querySelector('#card-2-percent-value-a'),
        percentB: document.querySelector('#card-2-percent-value-b'),
        percentResult: document.querySelector('#card-2-percent-result'),

        deltaA: document.querySelector('#card-2-delta-value-a'),
        deltaB: document.querySelector('#card-2-delta-value-b'),
        deltaResult: document.querySelector('#card-2-delta-result'),
    },
    card3: {
        inputA: document.querySelector('#card-3-a'),
        inputB: document.querySelector('#card-3-b'),
        swapButton: document.querySelector('#card-3-swap-button'),

        percentageA: document.querySelector('#card-3-percentage-value-a'),
        percentageB: document.querySelector('#card-3-percentage-value-b'),
        percentageResult: document.querySelector('#card-3-percentage-result'),

        percentA: document.querySelector('#card-3-percent-value-a'),
        percentB: document.querySelector('#card-3-percent-value-b'),
        percentResult: document.querySelector('#card-3-percent-result'),

        deltaA: document.querySelector('#card-3-delta-value-a'),
        deltaB: document.querySelector('#card-3-delta-value-b'),
        deltaResult: document.querySelector('#card-3-delta-result'),
    },
};

const setHtmlContent = function(card, result) {
    [card.percentageA, card.percentA, card.deltaA].forEach(el => el.textContent = result.a);
    [card.percentageB, card.percentB, card.deltaB].forEach(el => el.textContent = result.b)

    card.percentageResult.textContent = result.percentage;
    card.percentResult.textContent = result.percent;
    card.deltaResult.textContent = result.delta;
}

const resetHtmlContent = function(card) {
    [
        card.percentageA, card.percentageB, card.percentageResult,
        card.percentA, card.percentB, card.percentResult,
        card.deltaA, card.deltaB, card.deltaResult
    ].forEach(el => el.textContent = '?');
}

const isValidNumber = function(value) {
    return value !== "" && !Number.isNaN(+value);
}

const handleInputChange = function(card) {
    if (isValidNumber(card.inputA.value) && isValidNumber(card.inputB.value)) {
        setHtmlContent(card, calculate(card.inputA.value, card.inputB.value));
    } else {
        resetHtmlContent(card);
    }
};

Object.values(cards).forEach(card => {
    [card.inputA, card.inputB].forEach(input => {
        input.addEventListener('input', () => {
            handleInputChange(card);
        });
    });

    card.swapButton.addEventListener('click', () => {
        [card.inputA.value, card.inputB.value] = [card.inputB.value, card.inputA.value];

        handleInputChange(card);
    });
});

const revealNextCardRow = document.querySelector('#reveal-next-card-row');
revealNextCardRow.addEventListener('click', () => {
    document.querySelector('.card[hidden]').removeAttribute('hidden');
    if (!document.querySelector('.card[hidden]')) {
        revealNextCardRow.remove();
    }
});
