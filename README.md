# Advent of Code: The Journey

Repository created to document my journey through Advent of Code and provide an environment for writing and testing the solutions in our beloved ✨JavaScript✨

## What is Advent of Code?

[Advent of Code](https://adventofcode.com/) is an annual event in which participants are tasked with solving programming Christmas-themed problems. Each day you're given a new puzzle to solve in two difficulty modes - base and extra, harder version, if you manage to complete the first one.

Think of it as an advent calendar, but instead of sweets, you get a problem to solve!

## Project structure

The project consists of two main parts:
- actual solutions to the problems, available in `/src` directory
- server used as a wrapper for displaying and evaluating solutions (`server.js`, `helpers.js` and `/views` directory)

Server is in no means necessary for code to run properly, although it makes executing it easier.

## Solution structure

In order to be properly displayed and evaluated, solutions must be placed in correctly named directories, given an appropriate name and export two named functions.

### Location and filename

- Solutions must be located in `/src/<year>/` directory, where \<year\> is any valid whole number (e.g. `2022`, `12345`, but not `202q1`)
- Solutions must be named according to the following pattern: `dayXX.js`, where   `XX` is any valid whole number from `01` to `25`, inclusive (mind the leading 0's)

### Exported functions

Solutions must export two named function, `base` and `extra`, both of which take one argument, puzzle input, as `string`, and return an answer, as any of the `primitives`.

Minimal example of the solution file:
```JavaScript
export function base(input) {
    return "42";
}

export function extra(input) {
    return "24";
}
```

## License

Both solutions and server-wrapper are available under [MIT license](./LICENSE).