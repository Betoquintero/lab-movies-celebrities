// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require ("../models/Celebrity")
const Movie = require ("../models/Movies")

// all your routes here

router.get ('/', async (req, res, next) => {
    const movies = await Movie.find({});
    try {
        res.render('movies/movies', {movies})
    } catch (error) {
        next(error)
    }
});


router.get ('/create', async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find({})
        res.render('movies/new-movie', {celebrities})
    } catch (error) {
        next(error)
    }
});

router.post('/create', async (req, res, next) => {
    const {title, genre, plot, cast} = req.body;
        try {
        await Movie.create ({title, genre, plot, cast})
        res.redirect("/movies")
    } catch (error) {      
        next(error)
    }
});

router.get("/:movieid", async (req, res, next)=> {
    const {movieid} = req.params;
    try {
        const movie = await Movie.findById(movieid).populate('cast')
        res.render('movies/movie-details', {movie})
    } catch (error) {
        next(error)        
    }
});

router.post('/delete/:movieid', async (req, res, next ) => {
    const {movieid} = req.params;
    try {
        await Movie.findByIdAndDelete(movieid)
        res.redirect('/movies')
    } catch (error) {
        next(error)        
    }
});

router.get('/:movieid/edit', async (req, res, next) => {
    const {movieid} = req.params
    try {
        const movie = await Movie.findById(movieid).populate("cast")
        const celebrities = await Celebrity.find({})
        res.render("movies/edit-movie", {movie, celebrities})
    } catch (error) {
        next(error)
    }
})

router.post(':/movieid/edit', async (req, res, next) => {
    const {movieid} = req.params;
    const {title, genre, plot, cast} = req.body;
    try {
        await Movie.findByIdAndUpdate(movieid, {genre, plot, cast}, {new:true})
        res.redirect(`/movies/${movieid}`)
    } catch (error) {
        next(error)
    }
})



module.exports = router;