import { prisma } from "./lib/prisma.js";

export async function getAllSummaries() {
    return prisma.movie.findMany({
        select: {
            id: true,
            title: true,
            releaseDate: true,
            genre: true,
            price: true,
        }
    });
}

export async function getById(id: number) {
    return prisma.movie.findMany({
        where: { id: id }
    });
}
