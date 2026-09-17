"use strict";

const cardsContainer = document.querySelector('#cards');
const addCardButton = document.querySelector('#add-card-button');
const templateCard = document.querySelector('#card-1');

const MAX_CARDS = 3;
let cardCount = 1;

const isValidNumber = function(value) {
    return value !== "" && !Number.isNaN(+value);
};

/* A tile shows "?" until a value exists. Non-finite results (division by zero) get the warning style. */
const setCell = function(cell, value) {
    cell.querySelector('.value').textContent = value === null ? '?' : value;
    cell.classList.toggle('is-empty', value === null);
    cell.classList.toggle('is-warning', typeof value === 'number' && !Number.isFinite(value));
};

/* Inputs are passed as typed so the echo tiles repeat them verbatim; results are the raw computed numbers. */
const render = function(card) {
    const inputA = card.querySelector('.input-a');
    const inputB = card.querySelector('.input-b');
    const hasBothValues = isValidNumber(inputA.value) && isValidNumber(inputB.value);
    const result = hasBothValues ? calculate(inputA.value, inputB.value) : null;
    const valueOf = key => (result === null ? null : result[key]);

    card.querySelectorAll('.value-a').forEach(cell => setCell(cell, valueOf('a')));
    card.querySelectorAll('.value-b').forEach(cell => setCell(cell, valueOf('b')));

    setCell(card.querySelector('.percentage-result'), valueOf('percentage'));
    setCell(card.querySelector('.percent-result'), valueOf('percent'));
    setCell(card.querySelector('.delta-result'), valueOf('delta'));
};

const setupCard = function(card) {
    const inputA = card.querySelector('.input-a');
    const inputB = card.querySelector('.input-b');

    [inputA, inputB].forEach(input => {
        input.addEventListener('input', () => render(card));
    });

    card.querySelector('.swap-button').addEventListener('click', () => {
        [inputA.value, inputB.value] = [inputB.value, inputA.value];
        render(card);
    });

    render(card);
};

/* Rewrites every "card-1-*" id in a cloned card to the new index. */
const renumberCard = function(card, index) {
    card.id = `card-${index}`;

    card.querySelectorAll('[id]').forEach(element => {
        element.id = element.id.replace(/^card-\d+/, `card-${index}`);
    });
};

const addCard = function() {
    cardCount += 1;

    const card = templateCard.cloneNode(true);
    renumberCard(card, cardCount);
    card.querySelectorAll('input').forEach(input => input.value = '');

    setupCard(card);

    cardsContainer.append(card);
    card.querySelector('.input-a').focus();

    if (cardCount >= MAX_CARDS) {
        addCardButton.remove();
    }
};

setupCard(templateCard);
addCardButton.addEventListener('click', addCard);
