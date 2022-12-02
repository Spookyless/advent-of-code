/**
 * @param {string} input
 */
const calculateCaloriesSum = (input) => {
    const elves = input.split("\n\n");
    const caloriesSum = elves.map(
        s => s.split("\n")
            .map(s => parseInt(s))
            .reduce((acc, v) => acc + v, 0)
    );

    return caloriesSum;
}

/**
 * @param {string} input
 */
export function base(input) {
    const caloriesSum = calculateCaloriesSum(input);

    return Math.max(...caloriesSum);
}

/**
 * @param {string} input
 */
export function extra(input) {
    const caloriesSum = calculateCaloriesSum(input);

    let most = [-1, -1, -1];

    caloriesSum.forEach(c => {
        if (c > most[2]) {
            most = [...most, c].sort((a, b) => b - a).splice(0, 3);
        }
    })

    return most.reduce((acc, v) => acc + v);
}