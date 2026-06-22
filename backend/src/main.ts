import { prisma } from "./lib/prisma.js";
import express from "express";
import path from "path";
import * as controller from "./movies_controller.js";
import db_init from "./db_init.js";

async function main() {
    db_init();

    const app = express();
    const port = 8080;

    app.set("view engine", "ejs");

    let counter: number = 0;

    app.get('/', (req, res) => {
        counter++;
        console.log(`got a request. counter=${counter}`)
        // res.writeHead(200, {'Content-Type': 'text/plain'});
        res.send(`Hello World!\nThis was the ${counter}th request I got.`);
    });

    app.get('/movies', controller.movies);
    app.get('/movies/:id', controller.movieDetails);
    app.get('/movies/:id/edit', controller.movieEdit);
    app.get('/movies/:id/delete', controller.movieDelete);
    app.get('/movies/create', controller.movieCreate);

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
