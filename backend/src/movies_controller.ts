import * as repo from "./movies_repository.js";
import express from "express";

export async function movies(req: express.Request, res: express.Response) {
    const movies = await repo.getAllSummaries()
    res.render("list", {movies: movies} );
}

export async function movieDetails(req: express.Request, res: express.Response) {
    const movieDetails = await repo.getById(Number(req.params.id));
    res.send(JSON.stringify(movieDetails, null, 2))
}

export async function movieEdit(req: express.Request, res: express.Response) {
    res.send("movieEdit() unimplemented")
}

export async function movieDelete(req: express.Request, res: express.Response) {
    res.send("movieDelete() unimplemented")
}

export async function movieCreate(req: express.Request, res: express.Response) {
    res.send("movieCreate() unimplemented")
}
