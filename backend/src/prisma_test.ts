import { prisma } from "./lib/prisma.js";

async function main() {
  const movie = await prisma.movie.create({
    data: {
        title: "AAA",
        releaseDate: new Date("2069-04-20"),
        genre: "Action",
        price: "13.37",
    }
  });
  console.log("Created movie:", movie);

  const allMovies = await prisma.movie.findMany({});
  console.log("All movies:", JSON.stringify(allMovies, null, 2));
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
