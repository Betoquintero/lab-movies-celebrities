// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require ('../models/Celebrity')

// all your routes here
router.get ('/create', (req, res, next) => {
    try {
        res.render('celebrities/new-celebrity')
    } catch (error) {
        next(error)
    }
});

router.post('/create', async (req, res, next) =>{
    const {name, occupation, catchPhrase} = req.body;
    try {
        await Celebrity.create({name, occupation, catchPhrase})
        res.redirect('/celebrities')
    } catch (error) {
        next(error)        
    }
})

module.exports = router;