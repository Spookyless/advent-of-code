import express from "express";
import { engine } from "express-handlebars";
import fs from "fs/promises";
import { checkDayNumValid, checkDayValid, checkResourceExists, checkYearValid, getAllYears, dayNumRegExp, dayRegExp, yearRegExp } from "./helpers.js";

const PORT = 3000;

const app = express();

app.engine("handlebars", engine({
    helpers: {
        'ifEquals': (arg1, arg2, options) => {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        }
    }
}));
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.json());

app.get("/", async (req, res) => {
    const yearsDesc = await getAllYears(false);

    res.render("home", { years: yearsDesc });
});

app.get("/:year/", async (req, res) => {
    const year = req.params.year;

    if (checkYearValid(year) === false) {
        return res.status(404).send("Not a valid year");
    }

    const requestedYear = `./src/${year}`;

    if ((await checkResourceExists(requestedYear)) === false) {
        return res.status(404).send(`Directory '${year}' does not exist`);
    }

    const days = (await fs.readdir(requestedYear, { withFileTypes: true }))
        .filter(dirent => dirent.isFile() && checkDayValid(dirent.name))
        // @ts-ignore
        .map(dirent => dayRegExp.exec(dirent.name)[1]);

    const yearsDesc = await getAllYears(false);

    return res.render("year", { days, years: yearsDesc, year: year });
});

app.get("/:year/:day", async (req, res) => {
    const year = req.params.year;
    const day = req.params.day;

    if (checkYearValid(year) === false) {
        return res.status(404).send("Not a valid year");
    }

    if (checkDayNumValid(day) === false) {
        return res.status(404).send("Not a valid day");
    }

    const requestedDay = `./src/${year}/day${day}.js`;

    if ((await checkResourceExists(requestedDay)) === false) {
        return res.status(404).send(`File 'day${day}.js' does not exist`);
    }

    const yearsDesc = await getAllYears(false);

    return res.render("day", { day: day, years: yearsDesc, year: year });
});

app.post("/:year/:day", async (req, res) => {
    const year = req.params.year;
    const day = req.params.day;

    const input = req.body.input || "";

    if (checkYearValid(year) === false) {
        return res.status(404).send("Not a valid year");
    }

    if (checkDayValid(day) === false) {
        return res.status(404).send("Not a valid day");
    }

    const requestedDay = `./src/${year}/day${day}.js`;

    if ((await checkResourceExists(requestedDay)) === false) {
        return res.status(404).send(`File 'day${day}.js' does not exist`);
    }

    const cacheBustingModulePath = `${requestedDay}?update=${Date.now()}`;

    const data = await import(cacheBustingModulePath);
    const resultBase = data.base(input);
    const resultExtra = data.extra(input);

    return res.json({ base: resultBase, extra: resultExtra });
});

app.get("*", (req, res) => {
    return res.status(404).send("Not found");
});

app.listen(3000, () => console.log(`App listening on port ${PORT}`));