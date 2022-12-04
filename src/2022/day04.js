/**
 * @param {string} input
 */
const prepareInput = (input) => {
    return input.split("\n")
        .map(v => v.split(",")
            .map(v => v.split("-")
                .map(v => parseInt(v))
            )
        )
}

/**
 * @param {string} input
 */
export function base(input) {
    const assignment = prepareInput(input);

    return assignment.map(v => {
        const minStart = Math.min(v[0][0], v[1][0]);
        const maxEnd = Math.max(v[0][1], v[1][1]);

        return (minStart === v[0][0] && maxEnd === v[0][1]) ||
            (minStart === v[1][0] && maxEnd === v[1][1]);
    }).reduce((acc, v) => acc + +v, 0)
}

/**
 * @param {string} input
 */
export function extra(input) {
    const assignment = prepareInput(input);

    return assignment.map(v => {
        return (v[0][0] <= v[1][0] && v[1][0] <= v[0][1]) ||
            (v[0][0] <= v[1][1] && v[1][1] <= v[0][1]) ||
            (v[1][0] <= v[0][0] && v[0][0] <= v[1][1]) ||
            (v[1][0] <= v[0][1] && v[0][1] <= v[1][1])
    }).reduce((acc, v) => acc + +v, 0)
}