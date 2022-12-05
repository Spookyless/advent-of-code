/**
 * @param {string} input
 */
const prepareInput = (input) => {
    const drawingRegExp = /(?:\[(.)\]|\ ([1-9])\ )/g;

    const [drawing, steps] = input.split("\n\n");

    const d = drawing.split("\n")
        .map(v => v.replace(/.(.)..?/g, "$1"))
        .reduce((/** @type {string[][]} */ acc, v) => {
            for (let i = 0; i < v.length; i++) {
                if (acc[i] === undefined) {
                    acc[i] = [];
                }

                acc[i].unshift(v[i]);
            }

            return acc;
        }, [])
        .map(v => v.join("")
            .trim()
            .substring(1));

    const s = steps.split("\n")
        .map(v => v.match(/move (\d+) from (\d+) to (\d+)/)
            .splice(1, 3)
            .map(v => parseInt(v)));

    return { drawing: d, steps: s };
}

/**
 * @param {string[]} drawing 
 * @param {number} n 
 * @param {number} from 
 * @param {number} to 
 */
const move = (drawing, n, from, to, multi = false) => {
    from = from - 1;
    to = to - 1;

    const len = drawing[from].length;
    const s = drawing[from].slice(len - n);
    drawing[from] = drawing[from].slice(0, len - n);
    drawing[to] = drawing[to] + (multi ? s : s.split("").reverse().join(""));
}

/**
 * @param {string} input
 */
export function base(input) {
    const data = prepareInput(input);

    for (const step of data.steps) {
        move(data.drawing, ...step);
    }

    return data.drawing.map(v => v[v.length - 1]).join("");
}

/**
 * @param {string} input
 */
export function extra(input) {
    const data = prepareInput(input);

    for (const step of data.steps) {
        move(data.drawing, ...step, true);
    }

    return data.drawing.map(v => v[v.length - 1]).join("");
}