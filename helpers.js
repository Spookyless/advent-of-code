import fs from "fs/promises";

export const yearRegExp = /^\d*$/;
export const dayNumRegExp = /^(?:[0-1][0-9]|2[0-5])$/;
export const dayRegExp = /^day([0-1][0-9]|2[0-5])\.js$/;

export const checkYearValid = (year) => {
    return year.match(yearRegExp)
}

export const checkDayNumValid = (day) => {
    return day.match(dayNumRegExp)
}

export const checkDayValid = (day) => {
    return day.match(dayRegExp)
}

export const checkResourceExists = async (file) => {
    try {
        await fs.access(file);
    } catch {
        return false;
    }

    return true;
}

export const getAllYears = async (asc = true) => {
    return (await fs.readdir("./src", { withFileTypes: true }))
        .filter(dirent => dirent.isDirectory() && dirent.name.match(/^\d*$/gi) !== null)
        .map(dirent => dirent.name)
        .sort((a, b) => (parseInt(a) > parseInt(b) === asc) ? 1 : -1);
}