// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies/create", (req, res) => {
  Celebrity.find({}).then((celebrities) => {
    res.render("movies/new-movie", { celebrities });
  });
});

router.get("/movies", (req, res) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => console.log(err));
});

router.post("/movies/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;
  console.log(req.body);
  Movie.create({ title, genre, plot, cast })
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => console.log(err));
});

router.get("/movies/:movieId", (req, res) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .populate("cast")
    .then((foundMovie) => {
      res.render("movies/movie-details", { movie: foundMovie });
    })
    .catch((err) => console.log(err));
});

router.post("/movies/:movieId/delete", (req, res) => {
  const { movieId } = req.params;
  Movie.findByIdAndRemove(movieId)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => console.log(err));
});

router.get("/movies/:movieId/edit", (req, res) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((foundMovie) => {
      Celebrity.find({})
        .then((celebrities) => {
          res.render("movies/edit-movie", { movie: foundMovie, celebrities });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.post("/movies/:movieId/edit", (req, res) => {
  const { movieId } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast })
    .then(() => {
      res.redirect(`/movies/${movieId}`);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
