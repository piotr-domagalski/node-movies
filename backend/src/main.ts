import {createServer, IncomingMessage, ServerResponse} from "http";
import { prisma } from "./lib/prisma.js";
import express from "express";
import path from "path";

async function db_init() {
    console.log("seeding db...");
    const allMovies1 = await prisma.movie.findMany({});

    if (allMovies1.length != 0) {
        console.log("table movies not empty, refusing");
        return;
    }

    const movie1 = await prisma.movie.create({
        data: {
            title: "AAA",
            releaseDate: new Date("2069-04-20"),
            genre: "Action",
            price: "13.37",
        }
    });
    console.log("Created movie:", movie1);

    const movie2 = await prisma.movie.create({
        data: {
            title: "BBB",
            releaseDate: new Date("1234-12-12"),
            genre: "Drama",
            price: "28.008",
        }
    });
    console.log("Created movie:", movie2);

    const allMovies2 = await prisma.movie.findMany({});
    console.log("All movies:", JSON.stringify(allMovies2, null, 2));
}

async function main() {
    db_init()

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

    app.get('/movies', async (req, res) => {
        const movies = await prisma.movie.findMany({
            //select: { id: true, title: true }
        });
        res.render("list", {movies: movies} );
    })

    app.get('/movies/:id', async (req, res) => {
        const movieDetails = await prisma.movie.findMany({
            where: { id: Number(req.params.id) }
        })
        res.send(JSON.stringify(movieDetails, null, 2))
    })

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
