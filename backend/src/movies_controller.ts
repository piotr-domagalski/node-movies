import * as repo from "./movies_repository.js";
import express from "express";

function toDateInputValue(date: Date) {
    return date.toISOString().split("T")[0]
}

export async function showMovieList(req: express.Request, res: express.Response) {
    console.log("showMovieList()")
    const movies = await repo.getAllSummaries()
    res.render("list", {
        movies: movies.map( movie => ({
            ...movie,
            releaseDate: toDateInputValue(movie.releaseDate)
        }))
    })
}


export async function showMovieDetails(req: express.Request, res: express.Response) {
    console.log("showMovieDetails()")
    const movieDetails = await repo.getById(Number(req.params.id))
    res.send(JSON.stringify(movieDetails, null, 2))
}

export async function showEditForm(req: express.Request, res: express.Response) {
    console.log("showEditForm()")
    const id: number = Number(req.params.id)
    const movieDetails = await repo.getById(id)
    console.log(movieDetails)
    if (movieDetails == undefined) {
        res.send(`Invalid movie ${id}`)
        return
    } else {
        res.render("edit", {
            title: "Edit Movie",
            action: req.path,
            submitPrompt: "Save",
            movie: {
                ...movieDetails,
                releaseDate: toDateInputValue(movieDetails.releaseDate)
            }
        })
    }
}

export async function updateMovie(req: express.Request, res: express.Response) {
    console.log("updateMovie()")
    const id: number = Number(req.params.id)
    console.log(req.body)
    const update = await repo.updateMovie(id, req.body.title, new Date(req.body.releaseDate), req.body.genre, req.body.price)
    console.log(update)
    res.redirect("/movies")
}

export async function deleteMovie(req: express.Request, res: express.Response) {
    console.log("deleteMovie()")
    const id: number = Number(req.params.id)
    await repo.deleteById(id)
    res.redirect("/movies")
}

export async function showCreateForm(req: express.Request, res: express.Response) {
    console.log("showCreateForm()")
    res.render("edit", {
        title: "Create Movie",
        action: req.path,
        submitPrompt: "Create",
        movie: null
    })
}

export async function createMovie(req: express.Request, res: express.Response) {
    console.log("createMovie()")
    console.log(req.body)
    const create = await repo.createMovie(req.body.title, new Date(req.body.releaseDate), req.body.genre, req.body.price)
    console.log(create)
    res.redirect("/movies")
}

