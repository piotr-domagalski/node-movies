import { prisma } from "./lib/prisma.js";

export default async function seed() {
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

