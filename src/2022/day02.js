/**
 * @param {string} input
 */
const prepareInput = (input) => {
    return input.split("\n").map(v => v.split(" "));
}

/**
 * @param {string} opponent 
 * @param {string} response 
 */
const scoreRound = (opponent, response) => {
    // Weird one-liner that converts result values (0/1/2) into scores (3/0/6)
    const resultToScore = (/** @type {number} */ result) => (3 - 3 * result + 9) % 9;

    const opMove = opponent.charCodeAt(0) - 64; // A = 65 - 64 = 1, B = 2, C = 3
    const myMove = response.charCodeAt(0) - 87; // X = 88 - 87 = 1, Y = 2, Z = 3

    const roundResult = (opMove - myMove + 3) % 3; // From my perspective: 0 = draw, 1 = lose, 2 = win

    return myMove + (resultToScore(roundResult));
}

/**
 * @param {string} input
 */
export function base(input) {
    const guide = prepareInput(input);

    return guide.reduce((acc, v) => acc + scoreRound(v[0], v[1]), 0);
}

/**
 * @param {string} input
 */
export function extra(input) {
    const resultToValue = (/** @type {number} */ result) => (1 - 1 * result + 1) % 3;

    const guide = prepareInput(input);

    return guide.reduce((acc, v) => {
        const opMove = v[0].charCodeAt(0) - 64; // A = 65 - 64 = 1, B = 2, C = 3
        const desiredResult = v[1].charCodeAt(0) - 87; // X = 88 - 87 = 1, Y = 2, Z = 3

        let myChoice = (opMove - resultToValue(desiredResult) + 3) % 3;
        if (myChoice === 0) { myChoice = 3; }

        const roundScore = scoreRound(String.fromCharCode(64 + opMove), String.fromCharCode(87 + myChoice));

        return acc + roundScore;
    }, 0);
}