/**
 * @param {string} input
 */
const prepareInput = (input) => {
    return input.split("\n");
}

/**
 * @param {string} c
 */
const priority = (c) => {
    const charCode = c.charCodeAt(0);

    if (charCode >= 97) {
        return charCode - 96;
    }

    return charCode - 38;
}

/**
 * @param {string} input
 */
export function base(input) {
    const rucksacks = prepareInput(input);

    return rucksacks
        .map(v => {
            const len = v.length;
            const s1 = v.slice(0, len / 2);
            const s2 = v.slice(len / 2);

            for (const c of s1) {
                if (s2.includes(c)) {
                    return priority(c);
                }
            }

            return 0;
        })
        .reduce((acc, v) => acc + v);
}

/**
 * @param {string} input
 */
export function extra(input) {
    const rucksacks = prepareInput(input);

    /**
     * @type {string[][]}
     */
    const groupedRucksacks = [[]];

    rucksacks.forEach(r => {
        const lastSack = groupedRucksacks[groupedRucksacks.length - 1];
        if (lastSack.length < 3) {
            lastSack.push(r);
        } else {
            groupedRucksacks.push([r]);
        }
    });

    // Sort groups so the shortest string is on top
    groupedRucksacks.map(v => v.sort((a, b) => a.length - b.length));

    return groupedRucksacks
        .map(v => {
            const [s1, s2, s3] = v;

            for (const c of s1) {
                if (s2.includes(c) && s3.includes(c)) {
                    return priority(c);
                }
            }

            return 0;
        })
        .reduce((acc, v) => acc + v);
}