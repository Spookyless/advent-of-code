const re = /.*(.).*\1/;

/**
 * @param {string} input 
 * @param {number} length 
 */
const find = (input, length) => {
    for (let i = length; i <= input.length; i++) {
        const str = input.substring(i - length, i);

        if (str.match(re) === null) {
            return i;
        }
    }

    return -1;
}

/**
 * @param {string} input
 */
export function base(input) {
    return find(input, 4);
}

/**
 * @param {string} input
 */
export function extra(input) {
    return find(input, 14);
}