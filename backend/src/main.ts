import { prisma } from "./lib/prisma.js";
import express from "express";
import path from "path";
import * as controller from "./movies_controller.js";
import seed from "./seed.js";

async function main() {
    seed();

    const app = express();
    const port = 8080;

    app.use(express.urlencoded({ extended: true }));
    app.set("view engine", "ejs");

    app.use(express.static('static'));

    let counter: number = 0;

    app.get('/', (req, res) => {
        res.redirect("/movies")
    });

    app.get('/movies/create', controller.showCreateForm);
    app.post('/movies/create', controller.createMovie);

    app.get('/movies', controller.showMovieList);
    app.get('/movies/:id', controller.showMovieDetails);

    app.get('/movies/:id/edit', controller.showEditForm);
    app.post('/movies/:id/edit', controller.updateMovie);

    app.post('/movies/:id/delete', controller.deleteMovie);

    app.listen(port, () => {
      console.log(`Movies app listening on port ${port}`);
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
