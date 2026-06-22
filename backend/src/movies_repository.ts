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
    const movies = await prisma.movie.findMany({
        where: { id: id }
    });
    if (movies.length === 1) {
        return movies[0]
    }
    else if (movies.length > 1) {
        throw new Error(`Multiple movies with id ${id} found`)
    } else {
        return undefined;
    }
}

export async function deleteById(id: number) {
    return await prisma.movie.delete({
        where: { id: id }
    });
}

export async function updateMovie(id: number, title: string, releaseDate: Date, genre: string, price: number) {
    return await prisma.movie.update({
        where: { id: id },
        data: { title, releaseDate, genre, price },
    });
}

export async function createMovie(title: string, releaseDate: Date, genre: string, price: number) {
    return await prisma.movie.create({
        data: { title, releaseDate, genre, price },
    });
}


